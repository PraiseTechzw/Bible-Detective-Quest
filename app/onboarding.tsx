import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown, useReducedMotion } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { useGame } from "@/context/GameContext";
import {
  IconArrowLeft,
  IconArrowRight,
  IconAward,
  IconBookOpen,
  IconCalendar,
  IconClock,
  IconFolder,
  IconShield,
  IconUser,
  IconZap,
} from "@/components/ui/SvgIcons";

type OnboardingIcon = React.ComponentType<{ size?: number; color?: string }>;

const STEPS = [
  {
    eyebrow: "WELCOME, DETECTIVE",
    title: "Follow the evidence.",
    sub: "The truth is in the details. Your investigation starts here.",
    body: "Solve real biblical mysteries, grounded in Scripture. Read the evidence, weigh the accounts, and reach your own verdict.",
    note: "The text is the source. Your judgment closes the case.",
    icon: IconBookOpen,
    accent: colors.gold,
  },
  {
    eyebrow: "THE CASE FILE",
    title: "Every detail matters.",
    sub: "Each case turns a biblical event into an investigation.",
    body: "Review evidence, hear witness accounts, reconstruct the timeline, and examine the people involved before delivering your verdict.",
    note: "Look closely. Small clues can change the whole case.",
    icon: IconFolder,
    accent: colors.blue,
  },
  {
    eyebrow: "YOUR PROGRESS",
    title: "Build your reputation.",
    sub: "Every solved case moves you closer to Master Sleuth.",
    body: "Earn XP, advance through seven detective ranks, and collect badges for the way you investigate.",
    note: "New ranks unlock more ways to play.",
    icon: IconAward,
    accent: colors.purple,
  },
  {
    eyebrow: "CHOOSE YOUR MODE",
    title: "The investigation is yours.",
    sub: "Start with Story Mode, then take on a new kind of challenge.",
    body: "Return for a Daily Mystery, race the clock in Time Attack, or test your instincts in Survival Mode.",
    note: "In Survival, one wrong answer ends the run.",
    icon: IconShield,
    accent: colors.green,
  },
] as const satisfies readonly {
  eyebrow: string;
  title: string;
  sub: string;
  body: string;
  note: string;
  icon: OnboardingIcon;
  accent: string;
}[];

const TOTAL_STEPS = STEPS.length + 1;

function FeatureRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <View style={styles.featureRow}>
      <View style={styles.featureIcon}>{icon}</View>
      <Text style={styles.featureLabel}>{label}</Text>
    </View>
  );
}

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useGame();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const scrollRef = useRef<ScrollView>(null);
  const reducedMotion = useReducedMotion();

  const isLastStep = step === STEPS.length;
  const currentStep = isLastStep ? null : STEPS[step];
  const StepIcon = currentStep?.icon ?? IconUser;

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [step]);

  const handleNext = () => {
    if (isLastStep) {
      const trimmed = name.trim();
      if (!trimmed) {
        setNameError("Every detective needs a name.");
        return;
      }
      if (trimmed.length < 2) {
        setNameError("Use at least 2 characters.");
        return;
      }
      completeOnboarding(trimmed);
      router.replace("/(tabs)");
      return;
    }

    setStep((current) => current + 1);
  };

  const handleBack = () => {
    setNameError("");
    setStep((current) => Math.max(0, current - 1));
  };

  const skipIntro = () => {
    setNameError("");
    setStep(STEPS.length);
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#060810", "#0A0D1A", "#0D1020"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
        <View style={styles.topRow}>
          <View style={styles.brandLockup}>
            <View style={styles.brandIcon}>
              <IconBookOpen size={24} color={colors.gold} />
            </View>
            <View>
              <Text style={styles.brandName}>BIBLE DETECTIVE</Text>
              <Text style={styles.brandCaption}>YOUR FIELD GUIDE</Text>
            </View>
          </View>
          {!isLastStep && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Skip introduction and enter your name"
              hitSlop={8}
              onPress={skipIntro}
              style={({ pressed }) => [styles.skipButton, pressed && styles.pressed]}
            >
              <Text style={styles.skipText}>SKIP INTRO</Text>
              <IconArrowRight size={17} color={colors.textMuted} />
            </Pressable>
          )}
        </View>

        <View
          accessibilityRole="progressbar"
          accessibilityLabel="Onboarding progress"
          accessibilityValue={{ min: 1, max: TOTAL_STEPS, now: step + 1 }}
          style={styles.progressGroup}
        >
          <View style={styles.progressMeta}>
            <Text style={styles.progressLabel}>YOUR BRIEFING</Text>
            <Text style={styles.progressCount}>
              {String(step + 1).padStart(2, "0")} / {String(TOTAL_STEPS).padStart(2, "0")}
            </Text>
          </View>
          <View style={styles.progressTrack}>
            {Array.from({ length: TOTAL_STEPS }, (_, index) => (
              <View
                key={index}
                style={[
                  styles.progressSegment,
                  index <= step && styles.progressSegmentActive,
                  index === step && styles.progressSegmentCurrent,
                ]}
              />
            ))}
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.contentArea}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: 24 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            key={step}
            entering={
              reducedMotion
                ? FadeIn.duration(140)
                : FadeInDown.duration(240)
            }
            style={styles.step}
          >
            <View style={styles.hero}>
              <LinearGradient
                colors={
                  currentStep
                    ? [`${currentStep.accent}30`, `${currentStep.accent}08`]
                    : colors.goldGradientSubtle
                }
                style={[
                  styles.heroIconWrap,
                  {
                    borderColor: currentStep
                      ? `${currentStep.accent}70`
                      : colors.goldBorder,
                  },
                ]}
              >
                <StepIcon
                  size={68}
                  color={currentStep?.accent ?? colors.gold}
                />
              </LinearGradient>
              <Text style={styles.heroCaption}>
                {currentStep?.eyebrow ?? "MAKE IT OFFICIAL"}
              </Text>
            </View>

            {!isLastStep && currentStep ? (
              <View style={styles.copy}>
                <Text style={styles.stepTitle}>{currentStep.title}</Text>
                <Text style={styles.stepSub}>{currentStep.sub}</Text>

                <LinearGradient
                  colors={[colors.surface2, colors.surface1]}
                  style={styles.caseNote}
                >
                  <View style={styles.caseNoteHeader}>
                    <IconBookOpen size={21} color={currentStep.accent} />
                    <Text style={styles.caseNoteLabel}>IN YOUR FILE</Text>
                  </View>
                  <Text style={styles.caseNoteBody}>{currentStep.body}</Text>
                  <View style={styles.noteDivider} />
                  <Text style={styles.caseNoteTip}>{currentStep.note}</Text>
                </LinearGradient>
              </View>
            ) : (
              <View style={styles.nameStep}>
                <View style={styles.copy}>
                  <Text style={styles.stepTitle}>What should we call you?</Text>
                  <Text style={styles.stepSub}>
                    Choose a detective name for your badge. You can change it later.
                  </Text>
                </View>

                <View style={styles.nameCard}>
                  <Text style={styles.nameLabel}>DETECTIVE NAME</Text>
                  <TextInput
                    accessibilityLabel="Detective name"
                    accessibilityHint="Enter at least two characters"
                    autoCapitalize="words"
                    autoCorrect={false}
                    autoComplete="name"
                    maxLength={20}
                    onChangeText={(value) => {
                      setName(value);
                      setNameError("");
                    }}
                    onSubmitEditing={handleNext}
                    placeholder="Enter your name"
                    placeholderTextColor={colors.textFaint}
                    returnKeyType="done"
                    selectionColor={colors.gold}
                    style={styles.nameInput}
                    value={name}
                  />
                  {nameError ? (
                    <Text
                      accessibilityLiveRegion="polite"
                      style={styles.nameError}
                    >
                      {nameError}
                    </Text>
                  ) : null}
                </View>

                <View style={styles.perks}>
                  <Text style={styles.perksTitle}>YOUR FIRST CASE FILE INCLUDES</Text>
                  <FeatureRow
                    icon={<IconBookOpen size={23} color={colors.gold} />}
                    label="6 Scripture-based cases"
                  />
                  <FeatureRow
                    icon={<IconAward size={23} color={colors.purple} />}
                    label="12 achievement badges"
                  />
                  <FeatureRow
                    icon={<IconZap size={23} color={colors.blue} />}
                    label="7 detective ranks"
                  />
                  <FeatureRow
                    icon={<IconClock size={23} color={colors.green} />}
                    label="4 ways to investigate"
                  />
                  <View style={styles.modeHint}>
                    <IconCalendar size={18} color={colors.gold} />
                    <Text style={styles.modeHintText}>
                      Includes a new Daily Mystery every day.
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </Animated.View>
        </ScrollView>

        <View
          style={[
            styles.footer,
            { paddingBottom: Math.max(insets.bottom, 16) },
          ]}
        >
          <View style={styles.footerActions}>
            {step > 0 && (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Go to previous step"
                onPress={handleBack}
                style={({ pressed }) => [
                  styles.backButton,
                  pressed && styles.pressed,
                ]}
              >
                <IconArrowLeft size={18} color={colors.textMuted} />
                <Text style={styles.backText}>Back</Text>
              </Pressable>
            )}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={isLastStep ? "Begin investigation" : "Continue"}
              onPress={handleNext}
              style={({ pressed }) => [
                styles.nextButton,
                step === 0 && styles.nextButtonFull,
                pressed && styles.nextButtonPressed,
              ]}
            >
              <LinearGradient
                colors={colors.goldGradient}
                style={styles.nextButtonGradient}
              >
                <Text style={styles.nextButtonText}>
                  {isLastStep ? "Begin Investigation" : "Continue"}
                </Text>
                <IconArrowRight size={20} color="#101018" />
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  topBar: { paddingHorizontal: 22, paddingBottom: 16, gap: 20 },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  brandLockup: { flexDirection: "row", alignItems: "center", gap: 10 },
  brandIcon: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: colors.radius.md,
    backgroundColor: colors.goldGlow,
    borderWidth: 1,
    borderColor: colors.goldBorder,
  },
  brandName: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: colors.text,
    letterSpacing: 1.4,
  },
  brandCaption: {
    fontFamily: "Inter_500Medium",
    fontSize: 9,
    color: colors.textMuted,
    letterSpacing: 1.8,
    marginTop: 3,
  },
  skipButton: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 4,
  },
  skipText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: colors.textMuted,
    letterSpacing: 0.8,
  },
  progressGroup: { gap: 9 },
  progressMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: colors.textFaint,
    letterSpacing: 1.5,
  },
  progressCount: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: colors.gold,
    fontVariant: ["tabular-nums"],
    letterSpacing: 1,
  },
  progressTrack: { flexDirection: "row", gap: 5 },
  progressSegment: {
    flex: 1,
    height: 3,
    borderRadius: colors.radius.full,
    backgroundColor: colors.surface3,
  },
  progressSegmentActive: { backgroundColor: colors.goldDim },
  progressSegmentCurrent: { backgroundColor: colors.goldLight },
  contentArea: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 12 },
  step: { flexGrow: 1, gap: 24 },
  hero: { alignItems: "center", gap: 12 },
  heroIconWrap: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: colors.radius.xl,
    borderWidth: 1,
    overflow: "hidden",
  },
  heroCaption: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: colors.gold,
    letterSpacing: 2,
    textAlign: "center",
  },
  copy: { gap: 9 },
  stepTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 29,
    lineHeight: 36,
    color: colors.text,
    letterSpacing: -0.5,
  },
  stepSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: colors.textMuted,
    lineHeight: 23,
  },
  caseNote: {
    borderRadius: colors.radius.lg,
    borderCurve: "continuous",
    padding: 18,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  caseNoteHeader: { flexDirection: "row", alignItems: "center", gap: 9 },
  caseNoteLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: colors.textMuted,
    letterSpacing: 1.5,
  },
  caseNoteBody: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: colors.text,
  },
  noteDivider: { height: 1, backgroundColor: colors.border },
  caseNoteTip: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    lineHeight: 18,
    color: colors.parchment,
  },
  nameStep: { gap: 20 },
  nameCard: {
    backgroundColor: colors.surface1,
    borderRadius: colors.radius.lg,
    borderCurve: "continuous",
    padding: 18,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.goldBorder,
  },
  nameLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: colors.gold,
    letterSpacing: 1.6,
  },
  nameInput: {
    minHeight: 48,
    fontFamily: "Inter_600SemiBold",
    fontSize: 19,
    color: colors.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderBright,
    paddingVertical: 8,
  },
  nameError: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    lineHeight: 18,
    color: colors.red,
  },
  perks: { gap: 8 },
  perksTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: colors.textMuted,
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  featureRow: { minHeight: 36, flexDirection: "row", alignItems: "center", gap: 10 },
  featureIcon: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  featureLabel: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
    color: colors.text,
  },
  modeHint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  modeHintText: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    lineHeight: 16,
    color: colors.textMuted,
  },
  footer: {
    paddingTop: 12,
    paddingHorizontal: 22,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.bg,
  },
  footerActions: { flexDirection: "row", alignItems: "center", gap: 10 },
  backButton: {
    minWidth: 88,
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: colors.radius.full,
    borderWidth: 1,
    borderColor: colors.borderBright,
  },
  backText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: colors.textMuted,
  },
  nextButton: { flex: 1, overflow: "hidden", borderRadius: colors.radius.full },
  nextButtonFull: { flex: 1 },
  nextButtonPressed: { opacity: 0.88 },
  nextButtonGradient: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 18,
  },
  nextButtonText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#101018",
    letterSpacing: 0.2,
  },
  pressed: { opacity: 0.72 },
});
