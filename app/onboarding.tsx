import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated, KeyboardAvoidingView, Platform, Pressable,
  ScrollView, StyleSheet, Text, TextInput, View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { useGame } from "@/context/GameContext";
import { IconShield, IconBook, IconAward, IconZap, BadgeIcon } from "@/components/ui/SvgIcons";

const STEPS = [
  {
    title: "Welcome, Detective.",
    sub: "The ancient world's greatest mysteries have gone cold. The evidence has been buried for millennia. But you're here now.",
    body: "Bible Detective is an investigative game where you solve real biblical mysteries — grounded strictly in Scripture. No creative license. No myths. Just the text, the evidence, and your judgment.",
    funny: "Think of yourself as a first-century CSI. Except instead of a lab, you have a scroll.",
  },
  {
    title: "How Cases Work",
    sub: "Every case is a real biblical event, reimagined as a detective investigation.",
    body: "You'll examine evidence boards, interview witnesses, reconstruct timelines, analyze suspects, and deliver a final verdict. All answers come directly from the biblical text — so paying attention matters.",
    funny: "Wrong answers are recorded. The ancient witnesses are judging you.",
  },
  {
    title: "Rank Up. Earn Badges.",
    sub: "As you solve cases, you earn XP, level up through 7 detective ranks, and collect unique badges.",
    body: "Ranks unlock new game modes. Badges reward specific achievements. Every solved case makes the next one harder — this is not a participation trophy situation.",
    funny: "Rookie Detective is the bottom rung. Master Sleuth is the top. Where you land is on you.",
  },
  {
    title: "The Modes",
    sub: "Story Mode is just the beginning.",
    body: "Daily Mystery gives you a new case every day for streak XP. Time Attack puts the clock against you. Survival Mode gives you one chance — one wrong answer and it's over.\n\nFunny how that mirrors real detective work.",
    funny: "Survival Mode: because consequences are educational.",
  },
];

function FeatureRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <View style={fr.row}>
      <View style={fr.icon}>{icon}</View>
      <Text style={fr.label}>{label}</Text>
    </View>
  );
}
const fr = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 6 },
  icon: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  label: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.text, flex: 1, lineHeight: 21 },
});

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useGame();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const heroScale = useRef(new Animated.Value(0.8)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const isLastStep = step === STEPS.length;

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(30);
    heroScale.setValue(0.85);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 60, friction: 10 }),
      Animated.spring(heroScale, { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
    ]).start();
    Animated.timing(progressAnim, {
      toValue: isLastStep ? 1 : (step + 1) / (STEPS.length + 1),
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [step]);

  const handleNext = () => {
    if (isLastStep) {
      const trimmed = name.trim();
      if (!trimmed) { setNameError("Every detective needs a name."); return; }
      if (trimmed.length < 2) { setNameError("At least 2 characters. You can do this."); return; }
      completeOnboarding(trimmed);
      router.replace("/(tabs)");
    } else {
      setStep(s => s + 1);
    }
  };

  const data = isLastStep ? null : STEPS[step];

  return (
    <View style={styles.root}>
      <LinearGradient colors={["#060810", "#0A0D1A", "#0D1020"]} style={StyleSheet.absoluteFill} />

      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <View style={styles.progressTrack}>
          <Animated.View
            style={[styles.progressFill, {
              width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }),
            }]}
          />
        </View>
        <Text style={styles.stepCounter}>{step + 1} of {STEPS.length + 1}</Text>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <Animated.View style={[styles.heroWrap, { transform: [{ scale: heroScale }] }]}>
              <LinearGradient colors={["rgba(212,150,42,0.22)", "rgba(196,125,26,0.06)"]} style={styles.heroBg}>
                <BadgeIcon id="truth_seeker" size={52} color={colors.gold} rimColor={colors.goldBorder} />
              </LinearGradient>
            </Animated.View>

            <View style={styles.wordmarkRow}>
              <Text style={styles.word1}>BIBLE</Text>
              <Text style={styles.word2}>DETECTIVE</Text>
              <View style={styles.wordUnderline} />
            </View>

            {!isLastStep && data && (
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{data.title}</Text>
                <Text style={styles.stepSub}>{data.sub}</Text>
                <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.bodyCard}>
                  <View style={[styles.bodyCardBorder, { borderColor: colors.border }]} />
                  <Text style={styles.bodyText}>{data.body}</Text>
                </LinearGradient>
                <LinearGradient colors={["rgba(212,150,42,0.1)", "rgba(212,150,42,0.04)"]} style={styles.funnyBox}>
                  <View style={[styles.funnyBorder, { borderColor: colors.goldBorder }]} />
                  <View style={[styles.funnyAccent, { backgroundColor: colors.gold }]} />
                  <Text style={styles.funnyText}>{data.funny}</Text>
                </LinearGradient>
              </View>
            )}

            {isLastStep && (
              <View style={styles.nameStep}>
                <Text style={styles.stepTitle}>What's Your Name, Detective?</Text>
                <Text style={styles.stepSub}>Choose wisely. It appears on your badge. Witnesses remember names.</Text>

                <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.nameCard}>
                  <View style={[styles.nameCardBorder, { borderColor: colors.goldBorder }]} />
                  <Text style={styles.nameLabel}>DETECTIVE NAME</Text>
                  <TextInput
                    style={styles.nameInput}
                    value={name}
                    onChangeText={(t) => { setName(t); setNameError(""); }}
                    placeholder="Enter your name..."
                    placeholderTextColor={colors.textFaint}
                    maxLength={20}
                    autoFocus
                    selectionColor={colors.gold}
                    returnKeyType="done"
                    onSubmitEditing={handleNext}
                  />
                  {nameError ? <Text style={styles.nameError}>{nameError}</Text> : null}
                </LinearGradient>

                <View style={styles.perksWrap}>
                  <Text style={styles.perksTitle}>You're about to get access to:</Text>
                  <FeatureRow
                    icon={<IconBook size={22} color={colors.gold} />}
                    label="6 fully written biblical investigation cases"
                  />
                  <FeatureRow
                    icon={<IconAward size={22} color={colors.purple} />}
                    label="12 unique achievement badges to earn"
                  />
                  <FeatureRow
                    icon={<IconZap size={22} color={colors.blue} />}
                    label="7 detective ranks, from Rookie to Master Sleuth"
                  />
                  <FeatureRow
                    icon={<IconShield size={22} color={colors.green} />}
                    label="4 game modes including Time Attack and Survival"
                  />
                </View>
              </View>
            )}

            <Pressable onPress={handleNext} style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1, marginTop: 24 })}>
              <LinearGradient colors={[colors.goldLight, colors.gold]} style={styles.nextBtn}>
                <Text style={styles.nextBtnText}>{isLastStep ? "Begin Investigation" : "Continue"}</Text>
              </LinearGradient>
            </Pressable>

            {step > 0 && (
              <Pressable onPress={() => setStep(s => s - 1)} style={styles.backBtn}>
                <Text style={styles.backBtnText}>Back</Text>
              </Pressable>
            )}

            <View style={styles.dotsRow}>
              {Array.from({ length: STEPS.length + 1 }).map((_, i) => (
                <View key={i} style={[styles.dot, { backgroundColor: i <= step ? colors.gold : colors.surface3, width: i === step ? 20 : 6 }]} />
              ))}
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  topBar: { paddingHorizontal: 20, paddingBottom: 12, gap: 8 },
  progressTrack: { height: 3, backgroundColor: colors.surface3, borderRadius: 2, overflow: "hidden" },
  progressFill: { height: 3, backgroundColor: colors.gold, borderRadius: 2 },
  stepCounter: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textFaint, textAlign: "right" },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 8 },
  heroWrap: { alignItems: "center", marginBottom: 24 },
  heroBg: { width: 100, height: 100, borderRadius: 50, alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: colors.goldBorder },
  wordmarkRow: { alignItems: "center", marginBottom: 28 },
  word1: { fontFamily: "Inter_700Bold", fontSize: 13, color: colors.gold, letterSpacing: 6 },
  word2: { fontFamily: "Inter_700Bold", fontSize: 30, color: colors.text, letterSpacing: 5, marginTop: -2 },
  wordUnderline: { width: 80, height: 2, backgroundColor: colors.gold, borderRadius: 1, marginTop: 6 },
  stepContent: { gap: 14 },
  stepTitle: { fontFamily: "Inter_700Bold", fontSize: 24, color: colors.text, lineHeight: 32 },
  stepSub: { fontFamily: "Inter_400Regular", fontSize: 15, color: colors.textMuted, lineHeight: 24 },
  bodyCard: { borderRadius: colors.radius.lg, padding: 18, position: "relative", overflow: "hidden" },
  bodyCardBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.lg },
  bodyText: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.text, lineHeight: 23 },
  funnyBox: { flexDirection: "row", borderRadius: colors.radius.md, overflow: "hidden", position: "relative" },
  funnyBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.md },
  funnyAccent: { width: 3 },
  funnyText: { flex: 1, padding: 14, fontFamily: "Inter_400Regular", fontSize: 13, color: colors.parchment, lineHeight: 21, fontStyle: "italic" },
  nameStep: { gap: 16 },
  nameCard: { borderRadius: colors.radius.lg, padding: 20, gap: 10, position: "relative", overflow: "hidden" },
  nameCardBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1.5, borderRadius: colors.radius.lg },
  nameLabel: { fontFamily: "Inter_600SemiBold", fontSize: 9, color: colors.gold, letterSpacing: 2 },
  nameInput: { fontFamily: "Inter_700Bold", fontSize: 22, color: colors.text, borderBottomWidth: 1.5, borderBottomColor: colors.goldBorder, paddingVertical: 8, minHeight: 40 },
  nameError: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.red },
  perksWrap: { gap: 4 },
  perksTitle: { fontFamily: "Inter_600SemiBold", fontSize: 12, color: colors.textMuted, letterSpacing: 0.5, marginBottom: 8 },
  nextBtn: { borderRadius: colors.radius.full, paddingVertical: 16, alignItems: "center" },
  nextBtnText: { fontFamily: "Inter_700Bold", fontSize: 16, color: "#000", letterSpacing: 0.5 },
  backBtn: { alignItems: "center", paddingVertical: 12, marginTop: 4 },
  backBtnText: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.textMuted },
  dotsRow: { flexDirection: "row", justifyContent: "center", gap: 6, marginTop: 24 },
  dot: { height: 6, borderRadius: 3, backgroundColor: colors.surface3 },
});
