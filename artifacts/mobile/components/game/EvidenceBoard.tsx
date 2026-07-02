import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import colors from "@/constants/colors";
import GoldButton from "@/components/ui/GoldButton";
import type { Evidence } from "@/data/cases";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  evidence: Evidence[];
  onContinue: () => void;
  caseTitle: string;
}

type IconRef =
  | { set: "feather"; name: keyof typeof Feather.glyphMap }
  | { set: "mdi"; name: keyof typeof MaterialCommunityIcons.glyphMap };

// Feather's set is small (~287 icons), but the case data already authors its
// `icon` field using Feather's own naming convention (e.g. "scissors", "anchor",
// "home", "dollar-sign") — so the correct, literal icon is almost always just
// Feather itself. We only special-case the handful of concepts Feather has no
// glyph for at all (there is no "fire" in Feather, for instance), pulling from
// MaterialCommunityIcons — a much larger set — for those specific overrides.
const MDI_OVERRIDES: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  fire: "fire",
  fire2: "fire",
  snake: "snake",
  dove: "bird",
  wheat: "barley",
  crown: "crown",
  sword: "sword",
  cross: "cross",
  church: "church",
  scale: "scale-balance",
  blood: "blood-bag",
  coin: "hand-coin",
  prison: "handcuffs",
  staff: "magic-staff",
  tomb: "grave-stone",
  bread: "bread-slice",
  vine: "fruit-grapes",
  fish: "fish",
  sheep: "sheep",
  lamb: "sheep",
  well: "water-well",
  ark: "sail-boat",
  bowl: "bowl",
  trumpet: "trumpet",
  lamp: "floor-lamp",
  oil: "oil",
  tree: "tree",
  fruit: "food-apple-outline",
  seed: "seed",
};

function resolveIcon(iconKey: string): IconRef {
  const mdiName = MDI_OVERRIDES[iconKey];
  if (mdiName) return { set: "mdi", name: mdiName };
  if (iconKey in Feather.glyphMap) {
    return { set: "feather", name: iconKey as keyof typeof Feather.glyphMap };
  }
  return { set: "feather", name: "circle" };
}

function ItemIcon({ iconKey, size, color }: { iconKey: string; size: number; color: string }) {
  const ref = resolveIcon(iconKey);
  if (ref.set === "mdi") {
    return <MaterialCommunityIcons name={ref.name} size={size} color={color} />;
  }
  return <Feather name={ref.name} size={size} color={color} />;
}

function exhibitLabel(i: number) {
  return i < 26 ? String.fromCharCode(65 + i) : `${i + 1}`;
}

/* ------------------------------ progress bar ------------------------------ */

function AnimatedProgressBar({ ratio, complete }: { ratio: number; complete: boolean }) {
  const widthAnim = useRef(new Animated.Value(ratio)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: ratio,
      duration: 420,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [ratio, widthAnim]);

  return (
    <View style={styles.progressBar}>
      <Animated.View
        style={{
          width: widthAnim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }),
          height: "100%",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <LinearGradient
          colors={complete ? [colors.gold, colors.goldLight ?? colors.gold] : [colors.blue, "#6A9EFF"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>
    </View>
  );
}

/* -------------------------------- card ------------------------------------ */

function EvidenceCard({
  item,
  index,
  isOpen,
  isViewed,
  onToggle,
  entranceAnim,
}: {
  item: Evidence;
  index: number;
  isOpen: boolean;
  isViewed: boolean;
  onToggle: () => void;
  entranceAnim: Animated.Value;
}) {
  const chevronAnim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;
  const checkPop = useRef(new Animated.Value(isViewed ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(chevronAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [isOpen, chevronAnim]);

  useEffect(() => {
    if (isViewed) {
      Animated.spring(checkPop, { toValue: 1, useNativeDriver: true, friction: 5, tension: 160 }).start();
    }
  }, [isViewed, checkPop]);

  const rotate = chevronAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] });

  return (
    <Animated.View
      style={{
        opacity: entranceAnim,
        transform: [{ translateY: entranceAnim.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }],
        marginBottom: 10,
      }}
    >
      <Pressable onPress={onToggle} style={({ pressed }) => ({ opacity: pressed ? 0.88 : 1 })}>
        <LinearGradient
          colors={isOpen ? ["#182038", "#101828"] : [colors.surface2, colors.surface1]}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={[styles.cardBorder, { borderColor: isOpen ? colors.goldBorder : colors.border }]} />
          <View style={[styles.exhibitTag, { borderColor: isOpen ? colors.goldBorder : colors.border }]}>
            <Text style={[styles.exhibitTagText, { color: isOpen ? colors.gold : colors.textFaint }]}>
              EX. {exhibitLabel(index)}
            </Text>
          </View>

          <View style={styles.cardTop}>
            <LinearGradient
              colors={
                isOpen
                  ? ["rgba(212,150,42,0.25)", "rgba(196,125,26,0.1)"]
                  : ["rgba(74,126,232,0.12)", "rgba(74,126,232,0.04)"]
              }
              style={styles.iconBg}
            >
              <ItemIcon iconKey={item.icon} size={18} color={isOpen ? colors.gold : colors.blue} />
            </LinearGradient>

            <View style={styles.cardTitleWrap}>
              <Text style={[styles.cardTitle, { color: isViewed ? colors.text : colors.parchment }]}>
                {item.title}
              </Text>
              {!isOpen && <Text style={styles.tapHint}>Tap to examine</Text>}
            </View>

            <View style={styles.cardRight}>
              {isViewed && (
                <Animated.View style={{ transform: [{ scale: checkPop }] }}>
                  <Feather name="check-circle" size={13} color={colors.green} />
                </Animated.View>
              )}
              <Animated.View style={{ transform: [{ rotate }] }}>
                <Feather name="chevron-down" size={16} color={colors.textMuted} />
              </Animated.View>
            </View>
          </View>

          {isOpen && (
            <View style={styles.expanded}>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <Text style={styles.description}>{item.description}</Text>
              <LinearGradient colors={["rgba(212,150,42,0.12)", "rgba(212,150,42,0.05)"]} style={styles.lessonBox}>
                <View style={[styles.lessonBoxBorder, { borderColor: colors.goldBorder }]} />
                <Feather name="book-open" size={13} color={colors.gold} style={{ marginTop: 1 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.lessonLabel}>TAKEAWAY</Text>
                  <Text style={styles.lessonText}>{item.lesson}</Text>
                </View>
              </LinearGradient>
            </View>
          )}
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

/* ------------------------------ main screen -------------------------------- */

export default function EvidenceBoard({ evidence, onContinue, caseTitle }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [viewed, setViewed] = useState<Set<string>>(new Set());
  const entranceAnims = useRef(evidence.map(() => new Animated.Value(0))).current;
  const ctaGlow = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.stagger(
      70,
      entranceAnims.map((v) =>
        Animated.timing(v, {
          toValue: 1,
          duration: 380,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ),
    ).start();
  }, [entranceAnims]);

  const allViewed = viewed.size >= evidence.length;

  useEffect(() => {
    if (!allViewed) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(ctaGlow, { toValue: 0.9, duration: 1400, useNativeDriver: true }),
        Animated.timing(ctaGlow, { toValue: 0.4, duration: 1400, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [allViewed, ctaGlow]);

  const toggle = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.create(220, "easeInEaseOut", "opacity"));
    setViewed((p) => new Set([...p, id]));
    setExpanded((p) => (p === id ? null : id));
  };

  const ratio = evidence.length > 0 ? viewed.size / evidence.length : 0;

  return (
    <View style={styles.root}>
      {/* Sub header */}
      <LinearGradient colors={["#0F1628", colors.bg]} style={styles.subHeader}>
        <View style={styles.subHeaderRow}>
          <View style={[styles.subHeaderAccent, { backgroundColor: colors.blue }]} />
          <View style={{ flex: 1 }}>
            <Text style={styles.subHeaderTitle}>Evidence Board</Text>
            <Text style={styles.subHeaderCase} numberOfLines={1}>{caseTitle}</Text>
          </View>
          <View style={[styles.progressChip, allViewed && styles.progressChipDone]}>
            {allViewed && <Feather name="check" size={11} color="#000" style={{ marginRight: 3 }} />}
            <Text style={[styles.progressText, allViewed && styles.progressTextDone]}>
              {viewed.size}/{evidence.length}
            </Text>
          </View>
        </View>
        <Text style={styles.subHeaderHint}>
          {allViewed ? "All exhibits examined — case ready to proceed" : "Tap each item to examine it"}
        </Text>
        <AnimatedProgressBar ratio={ratio} complete={allViewed} />
      </LinearGradient>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {evidence.map((item, index) => (
          <EvidenceCard
            key={item.id}
            item={item}
            index={index}
            isOpen={expanded === item.id}
            isViewed={viewed.has(item.id)}
            onToggle={() => toggle(item.id)}
            entranceAnim={entranceAnims[index]}
          />
        ))}
        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Footer */}
      <LinearGradient colors={["rgba(7,10,19,0)", "rgba(7,10,19,0.97)", colors.bg]} style={styles.footer}>
        {!allViewed && (
          <View style={styles.footerHintRow}>
            <Feather name="lock" size={11} color={colors.textMuted} />
            <Text style={styles.footerHint}>
              Examine all {evidence.length} items to continue
            </Text>
          </View>
        )}
        <View style={styles.ctaWrap}>
          {allViewed && <Animated.View style={[styles.ctaGlow, { opacity: ctaGlow }]} pointerEvents="none" />}
          <GoldButton
            label="Proceed to Witnesses"
            onPress={allViewed ? onContinue : () => {}}
            icon="arrow-right"
            disabled={!allViewed}
            size="lg"
            style={styles.btn}
          />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  subHeader: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
  },
  subHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  subHeaderAccent: { width: 3, height: 30, borderRadius: 2 },
  subHeaderTitle: { fontFamily: "Inter_700Bold", fontSize: 18, color: colors.text },
  subHeaderCase: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textFaint, marginTop: 1 },
  progressChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface3,
    borderRadius: colors.radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressChipDone: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  progressText: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: colors.textMuted },
  progressTextDone: { color: "#000" },
  subHeaderHint: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, marginBottom: 8 },
  progressBar: {
    height: 4,
    backgroundColor: colors.surface3,
    borderRadius: 2,
    overflow: "hidden",
  },
  scroll: { flex: 1, paddingHorizontal: 16 },
  card: {
    borderRadius: colors.radius.lg,
    padding: 14,
    position: "relative",
    overflow: "hidden",
  },
  cardBorder: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    borderWidth: 1,
    borderRadius: colors.radius.lg,
  },
  exhibitTag: {
    position: "absolute",
    top: 10,
    right: 10,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  exhibitTagText: {
    fontFamily: "Inter_700Bold",
    fontSize: 8.5,
    letterSpacing: 0.5,
  },
  cardTop: { flexDirection: "row", alignItems: "center", gap: 12, paddingRight: 46 },
  iconBg: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitleWrap: { flex: 1 },
  cardTitle: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
  tapHint: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted, marginTop: 2 },
  cardRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  expanded: { marginTop: 12 },
  divider: { height: 1, marginBottom: 12 },
  description: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: colors.text,
    lineHeight: 23,
    marginBottom: 12,
  },
  lessonBox: {
    flexDirection: "row",
    gap: 8,
    padding: 12,
    borderRadius: colors.radius.md,
    alignItems: "flex-start",
    position: "relative",
    overflow: "hidden",
  },
  lessonBoxBorder: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    borderWidth: 1,
    borderRadius: colors.radius.md,
  },
  lessonLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 9,
    color: colors.gold,
    letterSpacing: 1.2,
    marginBottom: 3,
    opacity: 0.85,
  },
  lessonText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: colors.gold,
    lineHeight: 20,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  footerHintRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginBottom: 8,
  },
  footerHint: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: colors.textMuted,
    textAlign: "center",
  },
  ctaWrap: { width: "100%", position: "relative" },
  ctaGlow: {
    position: "absolute",
    top: -6,
    left: -6,
    right: -6,
    bottom: -6,
    borderRadius: colors.radius.lg ?? 16,
    backgroundColor: "rgba(212,150,42,0.18)",
  },
  btn: { width: "100%" },
});