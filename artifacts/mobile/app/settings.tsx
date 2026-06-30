import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "@/constants/colors";
import { getRankForLevel } from "@/constants/ranks";
import { useGame } from "@/context/GameContext";

const STORAGE_KEY = "@bible_detective_game_state_v2";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 60 : insets.top;
  const game = useGame();
  const rank = getRankForLevel(game.level);

  const [haptics, setHaptics] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [darkMode] = useState(true);
  const [nameEdit, setNameEdit] = useState(false);
  const [name, setName] = useState(game.playerName);

  const handleReset = () => {
    Alert.alert(
      "Reset All Progress?",
      "This will permanently delete all your XP, badges, coins, and solved cases. There is no undo.\n\nAre you absolutely sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset Everything",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem(STORAGE_KEY);
            Alert.alert("Progress Reset", "All data cleared. The investigation starts fresh.", [
              { text: "OK", onPress: () => router.replace("/(tabs)") },
            ]);
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.root, { paddingTop: topPad }]}>
      <LinearGradient colors={["#0A0D1A", "#070A13"]} style={StyleSheet.absoluteFill} />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.backBg}>
            <Text style={{ fontSize: 18 }}>←</Text>
          </LinearGradient>
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerLabel}>DETECTIVE FILE</Text>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 40 }}>

        {/* Player card */}
        <LinearGradient colors={[rank.gradTop, rank.gradBot]} style={styles.playerCard}>
          <View style={[styles.playerCardBorder, { borderColor: rank.rimColor + "60" }]} />
          <Text style={styles.playerCrest}>{rank.crest}</Text>
          <View>
            <Text style={styles.playerName}>{game.playerName}</Text>
            <Text style={[styles.playerRank, { color: rank.color }]}>{rank.title} · Level {game.level}</Text>
          </View>
        </LinearGradient>

        {/* Detective Name */}
        <SectionHead emoji="🪪" title="Detective Identity" />
        <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.section}>
          <View style={[styles.sectionBorder, { borderColor: colors.border }]} />
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={styles.rowEmoji}>🕵️</Text>
              <View>
                <Text style={styles.rowLabel}>Detective Name</Text>
                {nameEdit ? (
                  <TextInput
                    style={styles.nameInput}
                    value={name}
                    onChangeText={setName}
                    autoFocus
                    maxLength={20}
                    placeholderTextColor={colors.textFaint}
                    selectionColor={colors.gold}
                    onBlur={() => setNameEdit(false)}
                  />
                ) : (
                  <Text style={styles.rowValue}>{game.playerName}</Text>
                )}
              </View>
            </View>
            <Pressable onPress={() => setNameEdit(!nameEdit)} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
              <LinearGradient colors={["rgba(212,150,42,0.2)", "rgba(212,150,42,0.08)"]} style={styles.editBtn}>
                <Text style={styles.editBtnText}>{nameEdit ? "Save" : "Edit"}</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </LinearGradient>

        {/* Gameplay Settings */}
        <SectionHead emoji="🎮" title="Gameplay" />
        <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.section}>
          <View style={[styles.sectionBorder, { borderColor: colors.border }]} />
          <ToggleRow emoji="📳" label="Haptic Feedback" sub="Vibrations on correct/wrong answers" value={haptics} onChange={setHaptics} />
          <View style={styles.divider} />
          <ToggleRow emoji="✨" label="Animations" sub="Entrance effects and transitions" value={animations} onChange={setAnimations} />
          <View style={styles.divider} />
          <ToggleRow emoji="🌙" label="Dark Mode" sub="Always on — it's a detective game" value={darkMode} onChange={() => {}} disabled />
        </LinearGradient>

        {/* Progress */}
        <SectionHead emoji="📊" title="Your Progress" />
        <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.section}>
          <View style={[styles.sectionBorder, { borderColor: colors.border }]} />
          {[
            { emoji: "📁", label: "Cases Solved", val: `${game.solvedCases.length} / 6` },
            { emoji: "⚡", label: "Total XP Earned", val: `${game.totalXPEarned} XP` },
            { emoji: "🪙", label: "Coins", val: String(game.coins) },
            { emoji: "🔥", label: "Current Streak", val: `${game.streak} day${game.streak !== 1 ? "s" : ""}` },
            { emoji: "🎮", label: "Games Played", val: String(game.gamesPlayed) },
          ].map((s, i, arr) => (
            <View key={s.label}>
              <View style={styles.statRow}>
                <Text style={styles.rowEmoji}>{s.emoji}</Text>
                <Text style={styles.rowLabel}>{s.label}</Text>
                <Text style={styles.statVal}>{s.val}</Text>
              </View>
              {i < arr.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </LinearGradient>

        {/* Difficulty info */}
        <SectionHead emoji="📈" title="Difficulty Progression" />
        <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.section}>
          <View style={[styles.sectionBorder, { borderColor: colors.border }]} />
          {[
            { emoji: "🟢", label: "Cases 1–2", sub: "Beginner · Genesis · Fewer questions", diff: "Beginner" },
            { emoji: "🟡", label: "Cases 3–4", sub: "Intermediate · More suspects, trickier MCQ", diff: "Intermediate" },
            { emoji: "🔴", label: "Cases 5–6", sub: "Advanced · All suspects plausible, harder timeline", diff: "Advanced" },
          ].map((d, i, arr) => (
            <View key={d.label}>
              <View style={styles.diffRow}>
                <Text style={{ fontSize: 20 }}>{d.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowLabel}>{d.label}</Text>
                  <Text style={styles.rowSub}>{d.sub}</Text>
                </View>
              </View>
              {i < arr.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.tipBox}>
            <Text style={styles.tipEmoji}>💡</Text>
            <Text style={styles.tipText}>New cases unlock as you complete each one. The harder the case, the bigger the XP reward.</Text>
          </View>
        </LinearGradient>

        {/* About */}
        <SectionHead emoji="📖" title="About" />
        <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.section}>
          <View style={[styles.sectionBorder, { borderColor: colors.border }]} />
          <View style={styles.aboutBox}>
            <Text style={styles.aboutTitle}>Bible Detective</Text>
            <Text style={styles.aboutSub}>An interactive biblical investigation game.</Text>
            <Text style={styles.aboutBody}>All cases are grounded strictly in Scripture. Detective framing is used as an educational tool — not to alter biblical accounts.</Text>
            <View style={styles.aboutChips}>
              <Chip label="v1.0.0" />
              <Chip label="6 Cases" />
              <Chip label="12 Badges" />
              <Chip label="7 Rank Tiers" />
            </View>
          </View>
        </LinearGradient>

        {/* Danger zone */}
        <SectionHead emoji="⚠️" title="Danger Zone" />
        <LinearGradient colors={["rgba(232,64,64,0.08)", "rgba(232,64,64,0.03)"]} style={[styles.section, { borderWidth: 1, borderColor: "rgba(232,64,64,0.25)" }]}>
          <View style={styles.dangerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.dangerLabel}>Reset All Progress</Text>
              <Text style={styles.dangerSub}>Deletes all XP, badges, coins, and case completions. This cannot be undone.</Text>
            </View>
          </View>
          <Pressable onPress={handleReset} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1, marginTop: 12 })}>
            <LinearGradient colors={["rgba(232,64,64,0.25)", "rgba(232,64,64,0.1)"]} style={styles.resetBtn}>
              <Text style={styles.resetBtnText}>🗑️  Reset Everything</Text>
            </LinearGradient>
          </Pressable>
        </LinearGradient>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

function SectionHead({ emoji, title }: { emoji: string; title: string }) {
  return (
    <View style={headStyles.row}>
      <Text style={{ fontSize: 15 }}>{emoji}</Text>
      <Text style={headStyles.title}>{title}</Text>
    </View>
  );
}
const headStyles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 2, marginTop: 20, marginBottom: 8 },
  title: { fontFamily: "Inter_700Bold", fontSize: 14, color: colors.textMuted, letterSpacing: 1.2, textTransform: "uppercase" },
});

function ToggleRow({ emoji, label, sub, value, onChange, disabled }: { emoji: string; label: string; sub: string; value: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <View style={[styles.row, { opacity: disabled ? 0.5 : 1 }]}>
      <Text style={styles.rowEmoji}>{emoji}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowSub}>{sub}</Text>
      </View>
      <Switch value={value} onValueChange={onChange} disabled={disabled}
        trackColor={{ false: colors.surface3, true: colors.gold + "60" }}
        thumbColor={value ? colors.gold : colors.textMuted} />
    </View>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <View style={chipStyles.chip}>
      <Text style={chipStyles.text}>{label}</Text>
    </View>
  );
}
const chipStyles = StyleSheet.create({
  chip: { backgroundColor: "rgba(212,150,42,0.1)", borderRadius: colors.radius.full, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: colors.goldBorder },
  text: { fontFamily: "Inter_500Medium", fontSize: 10, color: colors.gold },
});

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 12, gap: 12 },
  backBtn: {},
  backBg: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border },
  headerCenter: { flex: 1, alignItems: "center" },
  headerLabel: { fontFamily: "Inter_600SemiBold", fontSize: 9, color: colors.gold, letterSpacing: 2 },
  headerTitle: { fontFamily: "Inter_700Bold", fontSize: 20, color: colors.text },
  scroll: { flex: 1, paddingHorizontal: 16 },
  playerCard: { borderRadius: colors.radius.lg, padding: 16, flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 4, position: "relative", overflow: "hidden" },
  playerCardBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1.5, borderRadius: colors.radius.lg },
  playerCrest: { fontSize: 40 },
  playerName: { fontFamily: "Inter_700Bold", fontSize: 20, color: colors.text },
  playerRank: { fontFamily: "Inter_500Medium", fontSize: 13 },
  section: { borderRadius: colors.radius.lg, padding: 16, position: "relative", overflow: "hidden" },
  sectionBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.lg },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  rowLeft: { flex: 1, flexDirection: "row", alignItems: "center", gap: 12 },
  rowEmoji: { fontSize: 22, width: 30, textAlign: "center" },
  rowLabel: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text },
  rowSub: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted, marginTop: 2 },
  rowValue: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, marginTop: 2 },
  nameInput: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.gold, borderBottomWidth: 1, borderBottomColor: colors.goldBorder, paddingVertical: 2, minWidth: 100 },
  editBtn: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: colors.radius.full, borderWidth: 1, borderColor: colors.goldBorder },
  editBtnText: { fontFamily: "Inter_600SemiBold", fontSize: 12, color: colors.gold },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 12 },
  statRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  statVal: { fontFamily: "Inter_700Bold", fontSize: 14, color: colors.gold },
  diffRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  tipBox: { flexDirection: "row", gap: 8, alignItems: "flex-start" },
  tipEmoji: { fontSize: 16 },
  tipText: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, lineHeight: 20, flex: 1 },
  aboutBox: { gap: 8 },
  aboutTitle: { fontFamily: "Inter_700Bold", fontSize: 18, color: colors.text },
  aboutSub: { fontFamily: "Inter_500Medium", fontSize: 13, color: colors.gold },
  aboutBody: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, lineHeight: 20 },
  aboutChips: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 4 },
  dangerRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  dangerLabel: { fontFamily: "Inter_700Bold", fontSize: 15, color: colors.red },
  dangerSub: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, lineHeight: 18, marginTop: 3 },
  resetBtn: { borderRadius: colors.radius.md, padding: 14, alignItems: "center", borderWidth: 1, borderColor: "rgba(232,64,64,0.35)" },
  resetBtnText: { fontFamily: "Inter_700Bold", fontSize: 14, color: colors.red },
});
