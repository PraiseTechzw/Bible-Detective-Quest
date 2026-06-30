import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { CASES } from "@/data/cases";
import { useGame } from "@/context/GameContext";
import colors from "@/constants/colors";
import StepHeader, { GameStep } from "@/components/game/StepHeader";
import EvidenceBoard from "@/components/game/EvidenceBoard";
import WitnessInterview from "@/components/game/WitnessInterview";
import TimelinePuzzle from "@/components/game/TimelinePuzzle";
import SuspectBoard from "@/components/game/SuspectBoard";
import VerdictScreen from "@/components/game/VerdictScreen";
import RevealScreen from "@/components/game/RevealScreen";
import IntroScreen from "@/components/game/IntroScreen";
import LevelUpModal from "@/components/game/LevelUpModal";
import { IconClock, IconHeart, IconWarning } from "@/components/ui/SvgIcons";
import type { GameMode } from "@/context/GameContext";

const TIME_ATTACK_SECONDS = 180;
const WRONG_PENALTY_SECONDS = 30;

function TimeAttackBar({ secondsLeft, total }: { secondsLeft: number; total: number }) {
  const pct = Math.max(0, Math.min(1, secondsLeft / total));
  const barColor = pct > 0.5 ? colors.green : pct > 0.25 ? colors.amber : colors.red;
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  return (
    <View style={taStyles.wrap}>
      <LinearGradient colors={[colors.surface2, colors.surface1]} style={taStyles.bar}>
        <View style={[taStyles.fill, { width: `${pct * 100}%` as any, backgroundColor: barColor }]} />
      </LinearGradient>
      <View style={taStyles.row}>
        <IconClock size={14} color={barColor} />
        <Text style={[taStyles.time, { color: barColor }]}>{mins}:{secs.toString().padStart(2, "0")}</Text>
        <Text style={taStyles.label}>Time Attack</Text>
      </View>
    </View>
  );
}
const taStyles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, paddingBottom: 8 },
  bar: { height: 6, borderRadius: 3, overflow: "hidden", marginBottom: 5 },
  fill: { height: 6, borderRadius: 3 },
  row: { flexDirection: "row", alignItems: "center", gap: 6 },
  time: { fontFamily: "Inter_700Bold", fontSize: 14 },
  label: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: colors.textMuted, marginLeft: "auto" as any },
});

function SurvivalHearts({ lives }: { lives: number }) {
  return (
    <View style={svStyles.wrap}>
      {Array.from({ length: 3 }).map((_, i) => (
        <View key={i} style={[svStyles.heart, { opacity: i < lives ? 1 : 0.2 }]}>
          <IconHeart size={18} color={colors.red} />
        </View>
      ))}
      <Text style={svStyles.label}>Survival Mode</Text>
    </View>
  );
}
const svStyles = StyleSheet.create({
  wrap: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 16, paddingBottom: 8 },
  heart: {},
  label: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: colors.textMuted, marginLeft: "auto" as any },
});

function GameOverScreen({ mode, onRetry, onExit }: { mode: GameMode; onRetry: () => void; onExit: () => void }) {
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 55, friction: 8 }),
      Animated.timing(opacityAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);
  const isTimeout = mode === "timeAttack";
  return (
    <View style={goStyles.root}>
      <LinearGradient colors={["#1A0808", "#0D0404", colors.bg]} style={StyleSheet.absoluteFill} />
      <Animated.View style={[goStyles.card, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}>
        <LinearGradient colors={["rgba(232,64,64,0.2)", "rgba(232,64,64,0.05)"]} style={goStyles.iconBg}>
          <IconWarning size={44} color={colors.red} />
        </LinearGradient>
        <Text style={goStyles.title}>{isTimeout ? "Time's Up!" : "Case Closed — By Mistake"}</Text>
        <Text style={goStyles.sub}>
          {isTimeout
            ? "The clock ran out. Even Solomon needed more than three minutes. Try again."
            : "One wrong answer in Survival Mode. The ancient tribunal is disappointed. So are we. A little."}
        </Text>
        <View style={goStyles.btnRow}>
          <Animated.View style={{ flex: 1 }}>
            <Text onPress={onRetry} style={goStyles.retryBtn}>Try Again</Text>
          </Animated.View>
          <Animated.View style={{ flex: 1 }}>
            <Text onPress={onExit} style={goStyles.exitBtn}>Exit</Text>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
}
const goStyles = StyleSheet.create({
  root: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32 },
  card: { alignItems: "center", gap: 18, width: "100%" },
  iconBg: { width: 100, height: 100, borderRadius: 50, alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "rgba(232,64,64,0.4)" },
  title: { fontFamily: "Inter_700Bold", fontSize: 26, color: colors.red, textAlign: "center" },
  sub: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.textMuted, textAlign: "center", lineHeight: 22 },
  btnRow: { flexDirection: "row", gap: 12, width: "100%", marginTop: 8 },
  retryBtn: { fontFamily: "Inter_700Bold", fontSize: 15, color: "#000", backgroundColor: colors.red, borderRadius: 14, textAlign: "center", paddingVertical: 14 },
  exitBtn: { fontFamily: "Inter_700Bold", fontSize: 15, color: colors.textMuted, backgroundColor: colors.surface2, borderRadius: 14, textAlign: "center", paddingVertical: 14, borderWidth: 1, borderColor: colors.border },
});

export default function CaseScreen() {
  const { id, mode: modeParam } = useLocalSearchParams<{ id: string; mode?: string }>();
  const caseData = CASES.find((c) => c.id === id);
  const { completeCase, isCaseSolved, pendingLevelUp, clearPendingLevelUp, level, recordTimeAttackBest } = useGame();

  const gameMode: GameMode = (modeParam as GameMode) ?? "story";

  const [step, setStep] = useState<GameStep>("intro");
  const [timeLeft, setTimeLeft] = useState(TIME_ATTACK_SECONDS);
  const [survivalLives, setSurvivalLives] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const [caseStartTime] = useState(Date.now());

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);

  useEffect(() => {
    if (pendingLevelUp && pendingLevelUp !== level) {
      setShowLevelUp(true);
    }
  }, [pendingLevelUp]);

  useEffect(() => {
    if (gameMode !== "timeAttack") return;
    if (step === "reveal" || isGameOver) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setIsGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameMode, step, isGameOver]);

  if (!caseData) {
    router.back();
    return null;
  }

  const penalizeTime = () => {
    if (gameMode === "timeAttack") {
      setTimeLeft(t => Math.max(0, t - WRONG_PENALTY_SECONDS));
    }
    if (gameMode === "survival") {
      setSurvivalLives(l => {
        const newLives = l - 1;
        if (newLives <= 0) setIsGameOver(true);
        return newLives;
      });
    }
  };

  const handleReveal = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isCaseSolved(caseData.id)) {
      const elapsed = Math.max(0, TIME_ATTACK_SECONDS - timeLeft) * 1000;
      completeCase(caseData.id, caseData.rewards);
      if (gameMode === "timeAttack") {
        recordTimeAttackBest(caseData.id, elapsed);
      }
    }
    setStep("reveal");
  };

  const handleFinish = () => {
    router.back();
  };

  const handleRetry = () => {
    setStep("intro");
    setTimeLeft(TIME_ATTACK_SECONDS);
    setSurvivalLives(3);
    setIsGameOver(false);
  };

  if (isGameOver) {
    return <GameOverScreen mode={gameMode} onRetry={handleRetry} onExit={handleFinish} />;
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      {step !== "reveal" && (
        <StepHeader step={step} caseTitle={caseData.title} caseNumber={caseData.caseNumber} />
      )}

      {step !== "reveal" && gameMode === "timeAttack" && (
        <TimeAttackBar secondsLeft={timeLeft} total={TIME_ATTACK_SECONDS} />
      )}
      {step !== "reveal" && gameMode === "survival" && (
        <SurvivalHearts lives={survivalLives} />
      )}

      <View style={styles.body}>
        {step === "intro" && (
          <IntroScreen caseData={caseData} onContinue={() => setStep("evidence")} />
        )}
        {step === "evidence" && (
          <EvidenceBoard
            evidence={caseData.evidence}
            onContinue={() => setStep("witnesses")}
            caseTitle={caseData.title}
          />
        )}
        {step === "witnesses" && (
          <WitnessInterview
            witnesses={caseData.witnesses}
            onContinue={() => setStep("timeline")}
            mode={gameMode}
            onPenalize={penalizeTime}
          />
        )}
        {step === "timeline" && (
          <TimelinePuzzle
            events={caseData.timeline}
            onContinue={() => setStep("suspects")}
            mode={gameMode}
            onPenalize={penalizeTime}
          />
        )}
        {step === "suspects" && (
          <SuspectBoard
            suspects={caseData.suspectProfiles}
            suspectNames={caseData.suspects}
            onContinue={() => setStep("verdict")}
          />
        )}
        {step === "verdict" && (
          <VerdictScreen
            suspects={caseData.suspects}
            correctSuspect={caseData.correctSuspect}
            onCorrect={handleReveal}
            onWrong={() => {
              penalizeTime();
              if (gameMode !== "survival" || survivalLives > 1) handleReveal();
            }}
            mode={gameMode}
          />
        )}
        {step === "reveal" && (
          <RevealScreen caseData={caseData} onFinish={handleFinish} />
        )}
      </View>

      <LevelUpModal
        visible={showLevelUp}
        level={pendingLevelUp ?? level}
        onDismiss={() => {
          setShowLevelUp(false);
          clearPendingLevelUp();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { flex: 1 },
});
