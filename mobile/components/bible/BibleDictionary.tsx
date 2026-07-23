import React, { useMemo, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { IconArrowLeft, IconArrowRight } from "@/components/ui/SvgIcons";
import { BIBLE_DICTIONARY } from "@/data/bibleTools";

interface Props { onBack: () => void; topPad: number; }

export default function BibleDictionary({ onBack, topPad }: Props) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<typeof BIBLE_DICTIONARY[0] | null>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return BIBLE_DICTIONARY;
    const q = query.toLowerCase();
    return BIBLE_DICTIONARY.filter(e =>
      e.word.toLowerCase().includes(q) || e.definition.toLowerCase().includes(q)
    );
  }, [query]);

  if (selected) {
    return (
      <View style={styles.root}>
        <View style={[styles.header, { paddingTop: topPad + 8 }]}>
          <Pressable onPress={() => setSelected(null)} style={styles.backBtn}><IconArrowLeft size={16} color={colors.textMuted} /></Pressable>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerLabel}>DICTIONARY</Text>
            <Text style={styles.headerTitle}>{selected.word}</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90 }}>
          <Text style={styles.defText}>{selected.definition}</Text>
          {selected.related.length > 0 && (
            <View style={styles.relatedSection}>
              <Text style={styles.relatedTitle}>Related Terms</Text>
              <View style={styles.relatedRow}>
                {selected.related.map(r => (
                  <Pressable key={r} onPress={() => setSelected(BIBLE_DICTIONARY.find(e => e.word === r) ?? null)} style={styles.relatedTag}>
                    <Text style={styles.relatedTagText}>{r}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={onBack} style={styles.backBtn}><IconArrowLeft size={16} color={colors.textMuted} /></Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>TOOLS</Text>
          <Text style={styles.headerTitle}>Bible Dictionary</Text>
        </View>
      </View>

      <View style={styles.searchWrap}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search terms..."
          placeholderTextColor={colors.textFaint}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <Text style={styles.count}>{filtered.length} term{filtered.length !== 1 ? "s" : ""}</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.list, { paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90 }]}>
        {filtered.map(entry => (
          <Pressable key={entry.word} onPress={() => setSelected(entry)} style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryWord}>{entry.word}</Text>
              <IconArrowRight size={14} color={colors.textMuted} />
            </View>
            <Text style={styles.entryDef} numberOfLines={2}>{entry.definition}</Text>
            {entry.related.length > 0 && (
              <Text style={styles.relatedHint}>Related: {entry.related.join(", ")}</Text>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 10, gap: 10 },
  backBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.surface2, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border },
  headerLabel: { fontFamily: "Inter_600SemiBold", fontSize: 9, color: colors.gold, letterSpacing: 1.5 },
  headerTitle: { fontFamily: "Inter_700Bold", fontSize: 22, color: colors.text },
  searchWrap: { paddingHorizontal: 16, marginBottom: 8 },
  searchInput: { backgroundColor: colors.surface2, borderRadius: colors.radius.md, paddingHorizontal: 14, paddingVertical: 10, fontFamily: "Inter_400Regular", fontSize: 14, color: colors.text, borderWidth: 1, borderColor: colors.border },
  count: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted, paddingHorizontal: 16, marginBottom: 6 },
  list: { paddingHorizontal: 16 },
  entryCard: { backgroundColor: colors.surface2, borderRadius: colors.radius.md, padding: 13, marginBottom: 8, borderWidth: 1, borderColor: colors.border },
  entryHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 4 },
  entryWord: { fontFamily: "Inter_700Bold", fontSize: 15, color: colors.gold },
  entryDef: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, lineHeight: 20 },
  relatedHint: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textFaint, marginTop: 6 },
  defText: { fontFamily: "Inter_400Regular", fontSize: 15, color: colors.text, lineHeight: 26, marginBottom: 24 },
  relatedSection: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 16 },
  relatedTitle: { fontFamily: "Inter_700Bold", fontSize: 13, color: colors.text, marginBottom: 10 },
  relatedRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  relatedTag: { backgroundColor: colors.goldGlow, borderRadius: colors.radius.full, paddingHorizontal: 12, paddingVertical: 5, borderWidth: 1, borderColor: colors.goldBorder },
  relatedTagText: { fontFamily: "Inter_600SemiBold", fontSize: 12, color: colors.gold },
});
