import React, { useMemo, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { CHARACTER_PROFILES, CharacterProfile } from "@/data/bibleTools";

interface Props { onBack: () => void; topPad: number; }

export default function CharacterProfiles({ onBack, topPad }: Props) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<CharacterProfile | null>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return CHARACTER_PROFILES;
    const q = query.toLowerCase();
    return CHARACTER_PROFILES.filter(c =>
      c.name.toLowerCase().includes(q) || c.era.toLowerCase().includes(q) || c.role.toLowerCase().includes(q)
    );
  }, [query]);

  const ERA_COLORS: Record<string, string> = {
    "Creation": colors.gold, "Pre-Patriarchal": colors.amber, "Patriarchs": colors.green,
    "Exodus": colors.blue, "Conquest": colors.purple, "United Kingdom": colors.amber,
    "Divided Kingdom": colors.red, "Exile": colors.textMuted, "New Testament": colors.blue,
  };

  if (selected) {
    return (
      <View style={styles.root}>
        <View style={[styles.header, { paddingTop: topPad + 8 }]}>
          <Pressable onPress={() => setSelected(null)} style={styles.backBtn}><Text style={styles.backIcon}>←</Text></Pressable>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerLabel}>CHARACTER PROFILE</Text>
            <Text style={styles.headerTitle}>{selected.name}</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90, gap: 16 }}>
          <View style={styles.profileMeta}>
            <View style={styles.metaPill}><Text style={styles.metaPillText}>{selected.era}</Text></View>
            <View style={[styles.metaPill, { backgroundColor: "rgba(74,126,232,0.15)", borderColor: colors.blueGlow }]}>
              <Text style={[styles.metaPillText, { color: colors.blue }]}>{selected.role}</Text>
            </View>
          </View>
          <View style={styles.traitRow}>
            <Text style={styles.traitLabel}>Known as:</Text>
            <Text style={styles.traitValue}>{selected.trait}</Text>
          </View>
          <Text style={styles.descText}>{selected.description}</Text>
          <View>
            <Text style={styles.sectionTitle}>Key Verses</Text>
            {selected.keyVerses.map(v => (
              <View key={v} style={styles.verseRef}>
                <Text style={styles.verseRefText}>{v}</Text>
              </View>
            ))}
          </View>
          <View>
            <Text style={styles.sectionTitle}>Books of the Bible</Text>
            <View style={styles.bookChips}>
              {selected.books.map(b => (
                <View key={b} style={styles.bookChip}>
                  <Text style={styles.bookChipText}>{b.toUpperCase()}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={onBack} style={styles.backBtn}><Text style={styles.backIcon}>←</Text></Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>TOOLS</Text>
          <Text style={styles.headerTitle}>Character Profiles</Text>
        </View>
      </View>

      <View style={styles.searchWrap}>
        <TextInput style={styles.searchInput} placeholder="Search people..." placeholderTextColor={colors.textFaint} value={query} onChangeText={setQuery} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.list, { paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90 }]}>
        {filtered.map(c => (
          <Pressable key={c.id} onPress={() => setSelected(c)} style={styles.card}>
            <View style={styles.cardLeft}>
              <View style={[styles.avatar, { backgroundColor: `${ERA_COLORS[c.era] ?? colors.gold}22` }]}>
                <Text style={[styles.avatarText, { color: ERA_COLORS[c.era] ?? colors.gold }]}>{c.name[0]}</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardName}>{c.name}</Text>
              <Text style={styles.cardRole}>{c.role}</Text>
              <Text style={styles.cardEra}>{c.era}</Text>
            </View>
            <Text style={styles.cardArrow}>→</Text>
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
  backIcon: { color: colors.textMuted, fontSize: 16, lineHeight: 20 },
  headerLabel: { fontFamily: "Inter_600SemiBold", fontSize: 9, color: colors.gold, letterSpacing: 1.5 },
  headerTitle: { fontFamily: "Inter_700Bold", fontSize: 22, color: colors.text },
  searchWrap: { paddingHorizontal: 16, marginBottom: 8 },
  searchInput: { backgroundColor: colors.surface2, borderRadius: colors.radius.md, paddingHorizontal: 14, paddingVertical: 10, fontFamily: "Inter_400Regular", fontSize: 14, color: colors.text, borderWidth: 1, borderColor: colors.border },
  list: { paddingHorizontal: 16 },
  card: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: colors.surface2, borderRadius: colors.radius.md, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: colors.border },
  cardLeft: {},
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  avatarText: { fontFamily: "Inter_700Bold", fontSize: 20 },
  cardName: { fontFamily: "Inter_700Bold", fontSize: 15, color: colors.text },
  cardRole: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, marginTop: 1 },
  cardEra: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textFaint, marginTop: 2 },
  cardArrow: { color: colors.textMuted, fontSize: 16 },
  profileMeta: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  metaPill: { borderRadius: colors.radius.full, paddingHorizontal: 12, paddingVertical: 4, backgroundColor: colors.goldGlow, borderWidth: 1, borderColor: colors.goldBorder },
  metaPillText: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: colors.gold },
  traitRow: { flexDirection: "row", gap: 8, alignItems: "baseline" },
  traitLabel: { fontFamily: "Inter_600SemiBold", fontSize: 13, color: colors.textMuted },
  traitValue: { fontFamily: "Inter_700Bold", fontSize: 14, color: colors.text, flex: 1 },
  descText: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.textMuted, lineHeight: 24 },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 14, color: colors.text, marginBottom: 8 },
  verseRef: { backgroundColor: colors.surface2, borderRadius: colors.radius.sm, paddingHorizontal: 12, paddingVertical: 6, marginBottom: 6, borderWidth: 1, borderColor: colors.border },
  verseRefText: { fontFamily: "Inter_600SemiBold", fontSize: 13, color: colors.gold },
  bookChips: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  bookChip: { backgroundColor: colors.surface3, borderRadius: colors.radius.sm, paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: colors.border },
  bookChipText: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: colors.textMuted },
});
