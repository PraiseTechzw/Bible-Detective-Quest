import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export type GameMode = "story" | "timeAttack" | "survival" | "daily";

interface GameState {
  playerName: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  solvedCases: string[];
  badges: string[];
  totalRankProgress: number;
  streak: number;
  lastPlayedDate: string | null;
  totalXPEarned: number;
  casesAttempted: number;
  gamesPlayed: number;
  timeAttackBestTimes: Record<string, number>;
  survivalHighScore: number;
  onboardingComplete: boolean;
  pendingLevelUp: number | null;
}

interface GameContextValue extends GameState {
  completeCase: (caseId: string, rewards: { xp: number; coins: number; badge: string; rankProgress: number }) => void;
  isCaseSolved: (caseId: string) => boolean;
  isCaseLocked: (caseId: string, index: number) => boolean;
  recordPlay: () => void;
  recordTimeAttackBest: (caseId: string, timeMs: number) => void;
  recordSurvivalScore: (score: number) => void;
  completeOnboarding: (name: string) => void;
  clearPendingLevelUp: () => void;
}

const STORAGE_KEY = "@bible_detective_game_state_v3";

const defaultState: GameState = {
  playerName: "Detective",
  level: 1,
  xp: 0,
  xpToNextLevel: 300,
  coins: 0,
  solvedCases: [],
  badges: [],
  totalRankProgress: 0,
  streak: 0,
  lastPlayedDate: null,
  totalXPEarned: 0,
  casesAttempted: 0,
  gamesPlayed: 0,
  timeAttackBestTimes: {},
  survivalHighScore: 0,
  onboardingComplete: false,
  pendingLevelUp: null,
};

const GameContext = createContext<GameContextValue | null>(null);

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function updateStreak(prev: GameState): { streak: number; lastPlayedDate: string } {
  const today = todayStr();
  if (prev.lastPlayedDate === today) {
    return { streak: prev.streak, lastPlayedDate: today };
  }
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().slice(0, 10);
  const streak = prev.lastPlayedDate === yStr ? prev.streak + 1 : 1;
  return { streak, lastPlayedDate: today };
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(defaultState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const saved = JSON.parse(raw) as GameState;
          setState({ ...defaultState, ...saved });
        } catch {}
      }
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, loaded]);

  const recordPlay = useCallback(() => {
    setState((prev) => {
      const s = updateStreak(prev);
      return {
        ...prev,
        ...s,
        gamesPlayed: prev.gamesPlayed + 1,
      };
    });
  }, []);

  const completeCase = useCallback(
    (caseId: string, rewards: { xp: number; coins: number; badge: string; rankProgress: number }) => {
      setState((prev) => {
        if (prev.solvedCases.includes(caseId)) return prev;
        const newXP = prev.xp + rewards.xp;
        const newCoins = prev.coins + rewards.coins;
        const newBadges = prev.badges.includes(rewards.badge)
          ? prev.badges
          : [...prev.badges, rewards.badge];
        const newSolved = [...prev.solvedCases, caseId];
        const newRankProgress = prev.totalRankProgress + rewards.rankProgress;
        const streakData = updateStreak(prev);

        let level = prev.level;
        let xp = newXP;
        let xpToNextLevel = prev.xpToNextLevel;
        let didLevelUp = false;
        while (xp >= xpToNextLevel) {
          xp -= xpToNextLevel;
          level += 1;
          xpToNextLevel = Math.floor(xpToNextLevel * 1.5);
          didLevelUp = true;
        }

        return {
          ...prev,
          level,
          xp,
          xpToNextLevel,
          coins: newCoins,
          badges: newBadges,
          solvedCases: newSolved,
          totalRankProgress: newRankProgress,
          totalXPEarned: prev.totalXPEarned + rewards.xp,
          casesAttempted: prev.casesAttempted + 1,
          pendingLevelUp: didLevelUp ? level : prev.pendingLevelUp,
          ...streakData,
        };
      });
    },
    []
  );

  const recordTimeAttackBest = useCallback((caseId: string, timeMs: number) => {
    setState((prev) => {
      const existing = prev.timeAttackBestTimes[caseId];
      if (existing && existing <= timeMs) return prev;
      return {
        ...prev,
        timeAttackBestTimes: { ...prev.timeAttackBestTimes, [caseId]: timeMs },
      };
    });
  }, []);

  const recordSurvivalScore = useCallback((score: number) => {
    setState((prev) => ({
      ...prev,
      survivalHighScore: Math.max(prev.survivalHighScore, score),
    }));
  }, []);

  const completeOnboarding = useCallback((name: string) => {
    setState((prev) => ({
      ...prev,
      playerName: name,
      onboardingComplete: true,
    }));
  }, []);

  const clearPendingLevelUp = useCallback(() => {
    setState((prev) => ({ ...prev, pendingLevelUp: null }));
  }, []);

  const isCaseSolved = useCallback(
    (caseId: string) => state.solvedCases.includes(caseId),
    [state.solvedCases]
  );

  const isCaseLocked = useCallback(
    (caseId: string, index: number) => {
      if (index === 0) return false;
      const cases = require("@/data/cases").CASES as { id: string }[];
      return !state.solvedCases.includes(cases[index - 1]?.id ?? "");
    },
    [state.solvedCases]
  );

  if (!loaded) return null;

  return (
    <GameContext.Provider value={{
      ...state,
      completeCase,
      isCaseSolved,
      isCaseLocked,
      recordPlay,
      recordTimeAttackBest,
      recordSurvivalScore,
      completeOnboarding,
      clearPendingLevelUp,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
