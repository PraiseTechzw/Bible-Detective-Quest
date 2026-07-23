import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { TIMELINE_EVENTS } from "@/data/bibleTools";

interface Props { onBack: () => void; topPad: number; }

const ERAS = ["All", "Primeval", "Patriarchs", "Exodus", "Conquest", "Judges", "United Kingdom", "Divided Kingdom", "Prophets", "Exile", "Restoration", "New Testament"];
const ERA_COLORS: Record<string, string> = {
  Primeval: colors.amber, Patriarchs: colors.gold, Exodus: colors.red,
  Conquest: colors.green, Judges: colors.purple, "United Kingdom": colors.blue,
  "Divided Kingdom": colors.red, Prophets: colors.purple, Exile: "#8B4513",
  Restoration: colors.green, "New Testament": colors.gold,
};

export default function BibleTimeline({ onBack, topPad }: Props) {
  const insets = useSafeAreaInsets();
  const [selectedEra, setSelectedEra] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = selectedEra === "All" ? TIMELINE_EVENTS : TIMELINE_EVENTS.filter(e => e.era === selectedEra);

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={onBack} style={styles.backBtn}><Text style={styles.backIcon}>←</Text></Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>BIBLE TOOLS</Text>
          <Text style={styles.headerTitle}>Biblical Timeline</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{filtered.length} events</Text>
        </View>
      </View>

      {/* Era filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.eraRow}>
        {ERAS.map(era => (
          <Pressable key={era} onPress={() => setSelectedEra(era)} style={[styles.eraChip, selectedEra === era && { backgroundColor: colors.goldGlow, borderColor: colors.gold }]}>
            <Text style={[styles.eraChipText, selectedEra === era && { color: colors.gold }]}>{era}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.list, { paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90 }]}>
        {/* Timeline intro */}
        <LinearGradient colors={["rgba(212,150,42,0.1)", "rgba(212,150,42,0.04)"]} style={styles.intro}>
          <View style={[styles.introBorder, { borderColor: colors.goldBorder }]} />
          <Text style={styles.introEmoji}>⏳</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.introTitle}>From Creation to Revelation</Text>
            <Text style={styles.introDesc}>30 key events spanning biblical history. Dates are approximate — scholars debate exact chronology.</Text>
          </View>
        </LinearGradient>

        {filtered.map((event, idx) => {
          const isExpanded = expanded === event.id;
          const eraColor = ERA_COLORS[event.era] ?? colors.textMuted;
          const isLast = idx === filtered.length - 1;

          return (
            <Pressable key={event.id} onPress={() => setExpanded(isExpanded ? null : event.id)}>
              <View style={styles.eventRow}>
                {/* Spine */}
                <View style={styles.spine}>
                  <View style={[styles.dot, { backgroundColor: eraColor, borderColor: eraColor + "60" }]} />
                  {!isLast && <View style={[styles.line, { backgroundColor: eraColor + "30" }]} />}
                </View>

                {/* Card */}
                <LinearGradient
                  colors={isExpanded ? [eraColor + "14", eraColor + "06"] : [colors.surface2, colors.surface1]}
                  style={[styles.eventCard, { borderColor: isExpanded ? eraColor + "45" : colors.border }]}
                >
                  <View style={styles.eventTop}>
                    <View style={styles.eventMeta}>
                      <Text style={[styles.eventYear, { color: eraColor }]}>{event.year}</Text>
                      <View style={[styles.eraPill, { backgroundColor: eraColor + "18", borderColor: eraColor + "40" }]}>
                        <Text style={[styles.eraPillText, { color: eraColor }]}>{event.era}</Text>
                      </View>
                    </View>
                    <Text style={styles.expandArrow}>{isExpanded ? "▲" : "▼"}</Text>
                  </View>
                  <Text style={styles.eventName}>{event.event}</Text>
                  {isExpanded && (
                    <View style={styles.eventExpanded}>
                      <Text style={styles.eventDesc}>{event.desc}</Text>
                      <View style={styles.scriptureRef}>
                        <Text style={styles.scriptureEmoji}>📖</Text>
                        <Text style={styles.scriptureText}>{event.scripture}</Text>
                      </View>
                    </View>
                  )}
                </LinearGradient>
              </View>
            </Pressable>
          );
        })}

        {filtered.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>📅</Text>
            <Text style={styles.emptyText}>No events in this era</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 10, gap: 10 },
  backBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.surface2, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border },
  backIcon: { color: colors.textMuted, fontSize: 16, lineHeight: 20 },
  headerLabel: { fontFamily: "Inter_600SemiBold", fontSize: 9, color: colors.gold, letterSpacing: 1.5 },
  headerTitle: { fontFamily: "Inter_700Bold", fontSize: 22, color: colors.text },
  countBadge: { backgroundColor: colors.surface2, borderRadius: colors.radius.full, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: colors.border },
  countText: { fontFamily: "Inter_500Medium", fontSize: 11, color: colors.textMuted },
  eraRow: { paddingHorizontal: 14, paddingBottom: 10, gap: 7 },
  eraChip: { borderRadius: colors.radius.full, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface2 },
  eraChipText: { fontFamily: "Inter_500Medium", fontSize: 11, color: colors.textMuted },
  list: { paddingHorizontal: 16, paddingTop: 4 },
  intro: { flexDirection: "row", gap: 10, borderRadius: colors.radius.md, padding: 13, marginBottom: 18, position: "relative", overflow: "hidden", alignItems: "flex-start" },
  introBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.md },
  introEmoji: { fontSize: 22 },
  introTitle: { fontFamily: "Inter_700Bold", fontSize: 13, color: colors.gold, marginBottom: 3 },
  introDesc: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, lineHeight: 18 },
  eventRow: { flexDirection: "row", gap: 12, marginBottom: 10 },
  spine: { width: 24, alignItems: "center", paddingTop: 14 },
  dot: { width: 12, height: 12, borderRadius: 6, borderWidth: 2, zIndex: 1 },
  line: { flex: 1, width: 2, marginTop: 4 },
  eventCard: { flex: 1, borderRadius: colors.radius.md, padding: 13, borderWidth: 1, gap: 4 },
  eventTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  eventMeta: { flexDirection: "row", alignItems: "center", gap: 8 },
  eventYear: { fontFamily: "Inter_700Bold", fontSize: 11 },
  eraPill: { borderRadius: colors.radius.full, paddingHorizontal: 6, paddingVertical: 2, borderWidth: 1 },
  eraPillText: { fontFamily: "Inter_600SemiBold", fontSize: 9 },
  expandArrow: { fontSize: 10, color: colors.textFaint },
  eventName: { fontFamily: "Inter_700Bold", fontSize: 15, color: colors.text },
  eventExpanded: { marginTop: 8, gap: 8 },
  eventDesc: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, lineHeight: 20 },
  scriptureRef: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.surface3, borderRadius: colors.radius.sm, padding: 8 },
  scriptureEmoji: { fontSize: 14 },
  scriptureText: { fontFamily: "Inter_500Medium", fontSize: 12, color: colors.gold },
  empty: { alignItems: "center", paddingVertical: 60, gap: 10 },
  emptyEmoji: { fontSize: 36 },
  emptyText: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.textMuted },
});
