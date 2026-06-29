import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

interface GameState {
  playerName: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  solvedCases: string[];
  badges: string[];
  totalRankProgress: number;
}

interface GameContextValue extends GameState {
  completeCase: (caseId: string, rewards: { xp: number; coins: number; badge: string; rankProgress: number }) => void;
  isCaseSolved: (caseId: string) => boolean;
  isCaseLocked: (caseId: string, index: number) => boolean;
}

const STORAGE_KEY = "@bible_detective_game_state";

const defaultState: GameState = {
  playerName: "Detective",
  level: 1,
  xp: 0,
  xpToNextLevel: 300,
  coins: 0,
  solvedCases: [],
  badges: [],
  totalRankProgress: 0,
};

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(defaultState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const saved = JSON.parse(raw) as GameState;
          setState(saved);
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

        let level = prev.level;
        let xp = newXP;
        let xpToNextLevel = prev.xpToNextLevel;
        while (xp >= xpToNextLevel) {
          xp -= xpToNextLevel;
          level += 1;
          xpToNextLevel = Math.floor(xpToNextLevel * 1.5);
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
        };
      });
    },
    []
  );

  const isCaseSolved = useCallback(
    (caseId: string) => state.solvedCases.includes(caseId),
    [state.solvedCases]
  );

  const isCaseLocked = useCallback(
    (caseId: string, index: number) => {
      if (index === 0) return false;
      return !state.solvedCases.includes(String(index).padStart(3, "0"));
    },
    [state.solvedCases]
  );

  if (!loaded) return null;

  return (
    <GameContext.Provider value={{ ...state, completeCase, isCaseSolved, isCaseLocked }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
