import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { useBible } from "@/context/BibleContext";

type Tab = "bookmarks" | "highlights" | "notes";

const HIGHLIGHT_COLORS = [
  { id: "gold", label: "Gold", color: "rgba(212,150,42,0.35)" },
  { id: "blue", label: "Blue", color: "rgba(74,126,232,0.35)" },
  { id: "green", label: "Green", color: "rgba(46,204,142,0.35)" },
  { id: "red", label: "Red", color: "rgba(232,64,64,0.35)" },
  { id: "purple", label: "Purple", color: "rgba(124,94,232,0.35)" },
];

interface Props {
  onBack: () => void;
  topPad: number;
  initialTab?: Tab;
  onOpenReader: (book: string, bookName: string, chapter: number) => void;
}

export default function BookmarksView({ onBack, topPad, initialTab = "bookmarks", onOpenReader }: Props) {
  const insets = useSafeAreaInsets();
  const bible = useBible();
  const [tab, setTab] = useState<Tab>(initialTab);

  const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: "bookmarks", label: "Bookmarks", icon: "🔖" },
    { id: "highlights", label: "Highlights", icon: "🖊️" },
    { id: "notes", label: "Notes", icon: "📝" },
  ];

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>TOOLS</Text>
          <Text style={styles.headerTitle}>{tab === "bookmarks" ? "Bookmarks" : tab === "highlights" ? "Highlights" : "Notes"}</Text>
        </View>
      </View>

      <View style={styles.tabs}>
        {TABS.map(t => (
          <Pressable key={t.id} onPress={() => setTab(t.id)} style={[styles.tabBtn, tab === t.id && styles.tabActive]}>
            <Text style={styles.tabIcon}>{t.icon}</Text>
            <Text style={[styles.tabLabel, { color: tab === t.id ? colors.gold : colors.textMuted }]}>{t.label}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.list, { paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90 }]}
      >
        {tab === "bookmarks" && (
          bible.bookmarks.length === 0 ? (
            <EmptyState icon="🔖" title="No Bookmarks Yet" desc="Tap the bookmark icon while reading to save verses here." />
          ) : (
            bible.bookmarks.map(bm => (
              <Pressable key={bm.id} onPress={() => onOpenReader(bm.book, bm.bookName, bm.chapter)} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardRef}>{bm.bookName} {bm.chapter}:{bm.verse}</Text>
                  <View style={styles.cardActions}>
                    <Text style={styles.cardTrans}>{bm.translation}</Text>
                    <Pressable onPress={() => {
                      Alert.alert("Remove bookmark?", `${bm.bookName} ${bm.chapter}:${bm.verse}`, [
                        { text: "Cancel", style: "cancel" },
                        { text: "Remove", style: "destructive", onPress: () => bible.removeBookmark(bm.id) },
                      ]);
                    }}>
                      <Text style={styles.deleteBtn}>✕</Text>
                    </Pressable>
                  </View>
                </View>
                <Text style={styles.cardText} numberOfLines={3}>{bm.text}</Text>
                <Text style={styles.cardDate}>{bm.date}</Text>
              </Pressable>
            ))
          )
        )}

        {tab === "highlights" && (
          bible.highlights.length === 0 ? (
            <EmptyState icon="🖊️" title="No Highlights Yet" desc="Long-press a verse while reading to highlight it with a colour." />
          ) : (
            bible.highlights.map(h => {
              const colorEntry = HIGHLIGHT_COLORS.find(c => c.id === h.color);
              return (
                <Pressable key={h.id} onPress={() => onOpenReader(h.book, h.book, h.chapter)} style={[styles.card, { borderLeftWidth: 3, borderLeftColor: colorEntry?.color ?? colors.gold }]}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardRef}>{h.book} {h.chapter}:{h.verse}</Text>
                    <View style={[styles.colorDot, { backgroundColor: colorEntry?.color ?? colors.goldGlow }]} />
                    <Pressable onPress={() => bible.removeHighlight(h.id)}>
                      <Text style={styles.deleteBtn}>✕</Text>
                    </Pressable>
                  </View>
                  <Text style={styles.cardDate}>{h.date}</Text>
                </Pressable>
              );
            })
          )
        )}

        {tab === "notes" && (
          bible.notes.length === 0 ? (
            <EmptyState icon="📝" title="No Notes Yet" desc="Tap the note icon while reading to annotate any verse." />
          ) : (
            bible.notes.map(n => (
              <Pressable key={n.id} onPress={() => onOpenReader(n.book, n.bookName, n.chapter)} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardRef}>{n.bookName} {n.chapter}:{n.verse}</Text>
                  <Pressable onPress={() => {
                    Alert.alert("Delete note?", undefined, [
                      { text: "Cancel", style: "cancel" },
                      { text: "Delete", style: "destructive", onPress: () => bible.removeNote(n.id) },
                    ]);
                  }}>
                    <Text style={styles.deleteBtn}>✕</Text>
                  </Pressable>
                </View>
                <Text style={styles.cardText}>{n.note}</Text>
                <Text style={styles.cardDate}>{n.date}</Text>
              </Pressable>
            ))
          )
        )}
      </ScrollView>
    </View>
  );
}

function EmptyState({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <View style={emStyles.wrap}>
      <Text style={emStyles.icon}>{icon}</Text>
      <Text style={emStyles.title}>{title}</Text>
      <Text style={emStyles.desc}>{desc}</Text>
    </View>
  );
}
const emStyles = StyleSheet.create({
  wrap: { alignItems: "center", paddingVertical: 60, paddingHorizontal: 30, gap: 10 },
  icon: { fontSize: 36 },
  title: { fontFamily: "Inter_700Bold", fontSize: 17, color: colors.text },
  desc: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, textAlign: "center", lineHeight: 20 },
});

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 10, gap: 10 },
  backBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.surface2, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border },
  backIcon: { color: colors.textMuted, fontSize: 16, lineHeight: 20 },
  headerLabel: { fontFamily: "Inter_600SemiBold", fontSize: 9, color: colors.gold, letterSpacing: 1.5 },
  headerTitle: { fontFamily: "Inter_700Bold", fontSize: 22, color: colors.text },
  tabs: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: colors.border, marginBottom: 4 },
  tabBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5, paddingVertical: 10 },
  tabActive: { borderBottomWidth: 2, borderBottomColor: colors.gold },
  tabIcon: { fontSize: 13 },
  tabLabel: { fontFamily: "Inter_600SemiBold", fontSize: 12 },
  list: { paddingHorizontal: 16, paddingTop: 8 },
  card: { backgroundColor: colors.surface2, borderRadius: colors.radius.md, padding: 13, marginBottom: 8, borderWidth: 1, borderColor: colors.border },
  cardHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 6 },
  cardRef: { fontFamily: "Inter_700Bold", fontSize: 12, color: colors.gold },
  cardActions: { flexDirection: "row", alignItems: "center", gap: 8 },
  cardTrans: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textFaint },
  cardText: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.text, lineHeight: 20 },
  cardDate: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textFaint, marginTop: 6 },
  deleteBtn: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.textFaint },
  colorDot: { width: 14, height: 14, borderRadius: 7 },
});
