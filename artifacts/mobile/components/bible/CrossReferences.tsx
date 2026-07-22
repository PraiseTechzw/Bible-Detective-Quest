import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { CROSS_REFERENCES } from "@/data/bibleTools";

interface Props { onBack: () => void; topPad: number; }

const THEME_COLORS = [colors.gold, colors.blue, colors.red, colors.purple, colors.green, colors.amber, colors.blue, colors.red, colors.gold, colors.purple, colors.green, colors.amber, colors.gold];

export default function CrossReferences({ onBack, topPad }: Props) {
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={onBack} style={styles.backBtn}><Text style={styles.backIcon}>←</Text></Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>BIBLE TOOLS</Text>
          <Text style={styles.headerTitle}>Cross References</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{CROSS_REFERENCES.length} chains</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.list, { paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90 }]}>
        {/* Intro */}
        <LinearGradient colors={["rgba(74,126,232,0.1)", "rgba(74,126,232,0.04)"]} style={styles.intro}>
          <View style={[styles.introBorder, { borderColor: "rgba(74,126,232,0.3)" }]} />
          <Text style={styles.introEmoji}>🔗</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.introTitle}>Scripture Interprets Scripture</Text>
            <Text style={styles.introDesc}>Each entry shows how one verse links to others across both Testaments — revealing the Bible's unified story.</Text>
          </View>
        </LinearGradient>

        {CROSS_REFERENCES.map((xref, i) => {
          const color = THEME_COLORS[i % THEME_COLORS.length];
          const isExpanded = expanded === i;
          return (
            <Pressable key={i} onPress={() => setExpanded(isExpanded ? null : i)}>
              <LinearGradient colors={isExpanded ? [color + "14", color + "06"] : [colors.surface2, colors.surface1]} style={[styles.card, { borderColor: isExpanded ? color + "45" : colors.border }]}>

                {/* Theme pill */}
                <View style={styles.cardTop}>
                  <View style={[styles.themePill, { backgroundColor: color + "18", borderColor: color + "40" }]}>
                    <Text style={[styles.themeText, { color }]}>🔗 {xref.theme}</Text>
                  </View>
                  <Text style={styles.arrow}>{isExpanded ? "▲" : "▼"}</Text>
                </View>

                {/* Source verse */}
                <View style={styles.sourceRow}>
                  <View style={[styles.sourceDot, { backgroundColor: color }]} />
                  <Text style={[styles.sourceRef, { color }]}>{xref.from}</Text>
                </View>

                {/* Chain preview */}
                <View style={styles.chainRow}>
                  {xref.to.map((ref, j) => (
                    <View key={j} style={styles.chainLink}>
                      {j > 0 && <Text style={styles.chainArrow}>→</Text>}
                      <View style={[styles.refPill, { backgroundColor: color + "14", borderColor: color + "30" }]}>
                        <Text style={[styles.refPillText, { color }]}>{ref}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                {isExpanded && (
                  <View style={styles.expandedBody}>
                    <View style={styles.expandedRow}>
                      <View style={[styles.expandedDot, { backgroundColor: color }]} />
                      <View style={styles.expandedContent}>
                        <Text style={[styles.expandedFromRef, { color }]}>📌 {xref.from}</Text>
                        <Text style={styles.expandedDesc}>The source verse that anchors this cross-reference chain.</Text>
                      </View>
                    </View>

                    <View style={[styles.chainConnector, { backgroundColor: color + "30" }]} />

                    {xref.to.map((ref, j) => (
                      <View key={j}>
                        <View style={styles.expandedRow}>
                          <View style={[styles.expandedDot, { backgroundColor: color + "60" }]} />
                          <View style={styles.expandedContent}>
                            <Text style={[styles.expandedToRef, { color }]}>📖 {ref}</Text>
                            <Text style={styles.expandedDesc}>
                              {j === 0 ? "Primary parallel — echoes or fulfils the source." : j === 1 ? "Secondary parallel — confirms the theme." : "Additional support for the same theological truth."}
                            </Text>
                          </View>
                        </View>
                        {j < xref.to.length - 1 && <View style={[styles.chainConnector, { backgroundColor: color + "20" }]} />}
                      </View>
                    ))}
                  </View>
                )}
              </LinearGradient>
            </Pressable>
          );
        })}

        {/* Footer note */}
        <View style={styles.footerNote}>
          <Text style={styles.footerNoteText}>📝 Cross-references reveal Scripture's internal unity. The same God authored all 66 books over 1,500 years through 40+ writers.</Text>
        </View>
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
  list: { paddingHorizontal: 16, paddingTop: 4, gap: 8 },
  intro: { flexDirection: "row", gap: 10, borderRadius: colors.radius.md, padding: 13, position: "relative", overflow: "hidden", alignItems: "flex-start" },
  introBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.md },
  introEmoji: { fontSize: 22 },
  introTitle: { fontFamily: "Inter_700Bold", fontSize: 13, color: colors.blue, marginBottom: 3 },
  introDesc: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, lineHeight: 18 },
  card: { borderRadius: colors.radius.lg, padding: 14, borderWidth: 1, gap: 8 },
  cardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  themePill: { borderRadius: colors.radius.full, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1 },
  themeText: { fontFamily: "Inter_700Bold", fontSize: 11 },
  arrow: { fontSize: 10, color: colors.textFaint },
  sourceRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  sourceDot: { width: 8, height: 8, borderRadius: 4 },
  sourceRef: { fontFamily: "Inter_700Bold", fontSize: 14 },
  chainRow: { flexDirection: "row", flexWrap: "wrap", gap: 4, alignItems: "center" },
  chainLink: { flexDirection: "row", alignItems: "center", gap: 4 },
  chainArrow: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textFaint },
  refPill: { borderRadius: colors.radius.full, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1 },
  refPillText: { fontFamily: "Inter_500Medium", fontSize: 11 },
  expandedBody: { marginTop: 4, gap: 0 },
  expandedRow: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  expandedDot: { width: 10, height: 10, borderRadius: 5, marginTop: 4 },
  expandedContent: { flex: 1, gap: 2 },
  expandedFromRef: { fontFamily: "Inter_700Bold", fontSize: 13 },
  expandedToRef: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
  expandedDesc: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, lineHeight: 18 },
  chainConnector: { width: 2, height: 18, marginLeft: 4, marginVertical: 2 },
  footerNote: { backgroundColor: colors.surface2, borderRadius: colors.radius.md, padding: 13, borderWidth: 1, borderColor: colors.border, marginTop: 6 },
  footerNoteText: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, lineHeight: 20 },
});
