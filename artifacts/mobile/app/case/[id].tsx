import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
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

export default function CaseScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const caseData = CASES.find((c) => c.id === id);
  const { completeCase, isCaseSolved } = useGame();
  const [step, setStep] = useState<GameStep>("intro");
  if (!caseData) {
    router.back();
    return null;
  }

  const handleReveal = () => {
    if (!isCaseSolved(caseData.id)) {
      completeCase(caseData.id, caseData.rewards);
    }
    setStep("reveal");
  };

  const handleFinish = () => {
    router.back();
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      {step !== "reveal" && (
        <StepHeader step={step} caseTitle={caseData.title} caseNumber={caseData.caseNumber} />
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
          <WitnessInterview witnesses={caseData.witnesses} onContinue={() => setStep("timeline")} />
        )}
        {step === "timeline" && (
          <TimelinePuzzle events={caseData.timeline} onContinue={() => setStep("suspects")} />
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
            onWrong={handleReveal}
          />
        )}
        {step === "reveal" && (
          <RevealScreen caseData={caseData} onFinish={handleFinish} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { flex: 1 },
});
