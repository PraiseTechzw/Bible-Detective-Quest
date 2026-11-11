import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { FEAST_DAYS } from "@/data/bibleTools";

interface Props { onBack: () => void; topPad: number; }

const FEAST_COLORS = [colors.gold, colors.amber, colors.green, colors.purple, colors.blue, colors.red, colors.gold];
const SEASON_EMOJIS: Record<string, string> = { Spring: "🌸", Summer: "☀️", Autumn: "🍂", Winter: "❄️" };

export default function BibleCalendar({ onBack, topPad }: Props) {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={onBack} style={styles.backBtn}><Text style={styles.backIcon}>←</Text></Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>BIBLE TOOLS</Text>
          <Text style={styles.headerTitle}>Jewish Feasts</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>7 feasts</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.list, { paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90 }]}>

        {/* Intro */}
        <LinearGradient colors={["rgba(212,150,42,0.1)", "rgba(212,150,42,0.04)"]} style={styles.intro}>
          <View style={[styles.introBorder, { borderColor: colors.goldBorder }]} />
          <Text style={styles.introEmoji}>🕎</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.introTitle}>The 7 Feasts of Israel</Text>
            <Text style={styles.introDesc}>God appointed 7 annual feasts (Leviticus 23) — each a shadow of Messianic fulfilment. Spring feasts fulfilled at Christ's first coming; autumn feasts await His return.</Text>
          </View>
        </LinearGradient>

        {/* Season label — Spring */}
        <SeasonHeader emoji="🌸" label="Spring Feasts — Christ's First Coming" />

        {FEAST_DAYS.slice(0, 4).map((feast, i) => (
          <FeastCard key={i} feast={feast} idx={i} color={FEAST_COLORS[i]} expanded={selected === i} onToggle={() => setSelected(selected === i ? null : i)} />
        ))}

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>400 years</Text>
          <View style={styles.dividerLine} />
        </View>

        <SeasonHeader emoji="🍂" label="Autumn Feasts — Christ's Return" />

        {FEAST_DAYS.slice(4).map((feast, i) => (
          <FeastCard key={i + 4} feast={feast} idx={i + 4} color={FEAST_COLORS[i + 4]} expanded={selected === i + 4} onToggle={() => setSelected(selected === i + 4 ? null : i + 4)} />
        ))}

        {/* Summary card */}
        <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.summaryCard}>
          <View style={[styles.summaryBorder, { borderColor: colors.border }]} />
          <Text style={styles.summaryEmoji}>💡</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.summaryTitle}>Pattern of Fulfilment</Text>
            <Text style={styles.summaryText}>Jesus died on Passover, was buried during Unleavened Bread, rose on Firstfruits, and sent the Spirit on Pentecost — fulfilling all 4 spring feasts precisely. The 3 autumn feasts (Trumpets, Atonement, Tabernacles) point to His return.</Text>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

function SeasonHeader({ emoji, label }: { emoji: string; label: string }) {
  return (
    <View style={sh.row}>
      <Text style={{ fontSize: 18 }}>{emoji}</Text>
      <Text style={sh.label}>{label}</Text>
    </View>
  );
}
const sh = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 8, marginVertical: 10 },
  label: { fontFamily: "Inter_700Bold", fontSize: 13, color: colors.text },
});

function FeastCard({ feast, idx, color, expanded, onToggle }: { feast: any; idx: number; color: string; expanded: boolean; onToggle: () => void }) {
  return (
    <Pressable onPress={onToggle}>
      <LinearGradient colors={expanded ? [color + "14", color + "06"] : [colors.surface2, colors.surface1]} style={[fc.card, { borderColor: expanded ? color + "45" : colors.border }]}>
        <View style={fc.top}>
          <View style={[fc.numBadge, { backgroundColor: color + "18", borderColor: color + "40" }]}>
            <Text style={[fc.numText, { color }]}>{idx + 1}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={fc.name}>{feast.name}</Text>
            <Text style={[fc.hebrew, { color }]}>{feast.hebrewName}</Text>
          </View>
          <View style={[fc.seasonPill, { backgroundColor: color + "14", borderColor: color + "30" }]}>
            <Text style={fc.seasonText}>{feast.season.split(" ")[0]}</Text>
          </View>
          <Text style={fc.arrow}>{expanded ? "▲" : "▼"}</Text>
        </View>

        {expanded && (
          <View style={fc.body}>
            <Text style={fc.desc}>{feast.desc}</Text>
            <View style={[fc.sigBox, { backgroundColor: color + "12", borderColor: color + "30" }]}>
              <Text style={[fc.sigLabel, { color }]}>✨ Significance</Text>
              <Text style={fc.sigText}>{feast.significance}</Text>
            </View>
            <View style={fc.scriptRow}>
              <Text style={{ fontSize: 14 }}>📖</Text>
              <Text style={[fc.scriptText, { color }]}>{feast.scripture}</Text>
            </View>
          </View>
        )}
      </LinearGradient>
    </Pressable>
  );
}
const fc = StyleSheet.create({
  card: { borderRadius: colors.radius.lg, padding: 14, marginBottom: 8, borderWidth: 1, gap: 0 },
  top: { flexDirection: "row", alignItems: "center", gap: 10 },
  numBadge: { width: 32, height: 32, borderRadius: 16, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  numText: { fontFamily: "Inter_700Bold", fontSize: 14 },
  name: { fontFamily: "Inter_700Bold", fontSize: 15, color: colors.text },
  hebrew: { fontFamily: "Inter_500Medium", fontSize: 11 },
  seasonPill: { borderRadius: colors.radius.full, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1 },
  seasonText: { fontFamily: "Inter_500Medium", fontSize: 9, color: colors.textMuted },
  arrow: { fontSize: 10, color: colors.textFaint },
  body: { marginTop: 10, gap: 10 },
  desc: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, lineHeight: 21 },
  sigBox: { borderRadius: colors.radius.md, padding: 10, borderWidth: 1, gap: 4 },
  sigLabel: { fontFamily: "Inter_700Bold", fontSize: 11 },
  sigText: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, lineHeight: 18 },
  scriptRow: { flexDirection: "row", alignItems: "flex-start", gap: 6 },
  scriptText: { fontFamily: "Inter_500Medium", fontSize: 12, flex: 1 },
});

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 10, gap: 10 },
  backBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.surface2, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border },
  backIcon: { color: colors.textMuted, fontSize: 16, lineHeight: 20 },
  headerLabel: { fontFamily: "Inter_600SemiBold", fontSize: 9, color: colors.gold, letterSpacing: 1.5 },
  headerTitle: { fontFamily: "Inter_700Bold", fontSize: 22, color: colors.text },
  countBadge: { backgroundColor: colors.surface2, borderRadius: colors.radius.full, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: colors.border },
  countText: { fontFamily: "Inter_500Medium", fontSize: 11, color: colors.textMuted },
  list: { paddingHorizontal: 16, paddingTop: 4 },
  intro: { flexDirection: "row", gap: 10, borderRadius: colors.radius.md, padding: 13, marginBottom: 10, position: "relative", overflow: "hidden", alignItems: "flex-start" },
  introBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.md },
  introEmoji: { fontSize: 22 },
  introTitle: { fontFamily: "Inter_700Bold", fontSize: 13, color: colors.gold, marginBottom: 3 },
  introDesc: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, lineHeight: 18 },
  divider: { flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { fontFamily: "Inter_500Medium", fontSize: 11, color: colors.textFaint },
  summaryCard: { flexDirection: "row", gap: 10, borderRadius: colors.radius.lg, padding: 14, marginTop: 4, position: "relative", overflow: "hidden", alignItems: "flex-start" },
  summaryBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.lg },
  summaryEmoji: { fontSize: 22 },
  summaryTitle: { fontFamily: "Inter_700Bold", fontSize: 13, color: colors.gold, marginBottom: 4 },
  summaryText: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, lineHeight: 19 },
});
