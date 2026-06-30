import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
<parameter name="content">import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { useBible } from "@/context/BibleContext";

interface Props { onBack: () => void; topPad: number; }

export default function PrayerJournal({ onBack, topPad }: Props) {
  const insets = useSafeAreaInsets();
  const bible = useBible();
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "answered">("all");

  const filtered = bible.prayerRequests.filter(p => {
    if (filter === "active") return !p.answered;
    if (filter === "answered") return p.answered;
    return true;
  });

  const handleAdd = () => {
    if (!title.trim()) return;
    bible.addPrayerRequest({ title: title.trim(), body: body.trim(), answered: false });
    setTitle(""); setBody(""); setAdding(false);
  };

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={onBack} style={styles.backBtn}><Text style={styles.backIcon}>←</Text></Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>TOOLS</Text>
          <Text style={styles.headerTitle}>Prayer Journal</Text>
        </View>
        <Pressable onPress={() => setAdding(true)} style={styles.addBtn}>
          <LinearGradient colors={[colors.goldLight, colors.gold]} style={styles.addBtnInner}>
            <Text style={styles.addBtnText}>+ Add</Text>
          </LinearGradient>
        </Pressable>
      </View>

      {adding && (
        <View style={styles.addForm}>
          <TextInput style={styles.input} placeholder="Prayer title..." placeholderTextColor={colors.textFaint} value={title} onChangeText={setTitle} />
          <TextInput style={[styles.input, styles.inputMulti]} placeholder="Details (optional)..." placeholderTextColor={colors.textFaint} value={body} onChangeText={setBody} multiline numberOfLines={3} />
          <View style={styles.formActions}>
            <Pressable onPress={() => { setAdding(false); setTitle(""); setBody(""); }} style={styles.cancelBtn}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={handleAdd} style={styles.saveBtn}>
              <LinearGradient colors={[colors.goldLight, colors.gold]} style={styles.saveBtnInner}>
                <Text style={styles.saveBtnText}>Save Prayer</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      )}

      <View style={styles.filterRow}>
        {(["all", "active", "answered"] as const).map(f => (
          <Pressable key={f} onPress={() => setFilter(f)} style={[styles.filterBtn, filter === f && styles.filterBtnActive]}>
            <Text style={[styles.filterBtnText, { color: filter === f ? colors.gold : colors.textMuted }]}>
              {f === "all" ? "All" : f === "active" ? "Active" : "Answered"}
            </Text>
          </Pressable>
        ))}
        <View style={{ flex: 1 }} />
        <Text style={styles.countLabel}>{filtered.length} prayer{filtered.length !== 1 ? "s" : ""}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.list, { paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90 }]}>
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🙏</Text>
            <Text style={styles.emptyTitle}>No prayers yet</Text>
            <Text style={styles.emptyDesc}>{filter === "answered" ? "No answered prayers recorded." : "Tap '+ Add' to write your first prayer request."}</Text>
          </View>
        ) : (
          filtered.map(p => (
            <View key={p.id} style={[styles.card, p.answered && styles.cardAnswered]}>
              <View style={styles.cardHeader}>
                <View style={styles.cardTitleRow}>
                  {p.answered && <Text style={styles.answeredBadge}>✓ Answered</Text>}
                  <Text style={[styles.cardTitle, p.answered && { color: colors.textMuted }]}>{p.title}</Text>
                </View>
                <View style={styles.cardActions}>
                  <Pressable onPress={() => bible.updatePrayerRequest(p.id, { answered: !p.answered })}>
                    <Text style={{ fontSize: 18 }}>{p.answered ? "🔄" : "✅"}</Text>
                  </Pressable>
                  <Pressable onPress={() => Alert.alert("Delete prayer?", p.title, [
                    { text: "Cancel", style: "cancel" },
                    { text: "Delete", style: "destructive", onPress: () => bible.removePrayerRequest(p.id) },
                  ])}>
                    <Text style={styles.deleteBtn}>✕</Text>
                  </Pressable>
                </View>
              </View>
              {!!p.body && <Text style={styles.cardBody}>{p.body}</Text>}
              <Text style={styles.cardDate}>{p.date}</Text>
            </View>
          ))
        )}

        <View style={styles.scriptureCard}>
          <Text style={styles.scriptureRef}>Philippians 4:6-7</Text>
          <Text style={styles.scriptureText}>"Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God."</Text>
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
  addBtn: {},
  addBtnInner: { borderRadius: colors.radius.md, paddingHorizontal: 14, paddingVertical: 8 },
  addBtnText: { fontFamily: "Inter_700Bold", fontSize: 12, color: "#000" },
  addForm: { marginHorizontal: 16, marginBottom: 10, backgroundColor: colors.surface2, borderRadius: colors.radius.md, padding: 12, gap: 8, borderWidth: 1, borderColor: colors.border },
  input: { backgroundColor: colors.surface3, borderRadius: colors.radius.sm, paddingHorizontal: 12, paddingVertical: 9, fontFamily: "Inter_400Regular", fontSize: 14, color: colors.text, borderWidth: 1, borderColor: colors.border },
  inputMulti: { minHeight: 72, textAlignVertical: "top" },
  formActions: { flexDirection: "row", gap: 8 },
  cancelBtn: { flex: 1, borderRadius: colors.radius.md, paddingVertical: 9, alignItems: "center", backgroundColor: colors.surface3, borderWidth: 1, borderColor: colors.border },
  cancelBtnText: { fontFamily: "Inter_600SemiBold", fontSize: 13, color: colors.textMuted },
  saveBtn: { flex: 1 },
  saveBtnInner: { borderRadius: colors.radius.md, paddingVertical: 9, alignItems: "center" },
  saveBtnText: { fontFamily: "Inter_700Bold", fontSize: 13, color: "#000" },
  filterRow: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 16, marginBottom: 8 },
  filterBtn: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: colors.radius.full, backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border },
  filterBtnActive: { borderColor: colors.gold, backgroundColor: colors.goldGlow },
  filterBtnText: { fontFamily: "Inter_600SemiBold", fontSize: 11 },
  countLabel: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textFaint },
  list: { paddingHorizontal: 16 },
  empty: { alignItems: "center", paddingVertical: 50, gap: 8 },
  emptyIcon: { fontSize: 36 },
  emptyTitle: { fontFamily: "Inter_700Bold", fontSize: 17, color: colors.text },
  emptyDesc: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, textAlign: "center", lineHeight: 20 },
  card: { backgroundColor: colors.surface2, borderRadius: colors.radius.md, padding: 13, marginBottom: 8, borderWidth: 1, borderColor: colors.border },
  cardAnswered: { opacity: 0.7, borderColor: colors.green },
  cardHeader: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 },
  cardTitleRow: { flex: 1, gap: 3 },
  answeredBadge: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: colors.green },
  cardTitle: { fontFamily: "Inter_700Bold", fontSize: 14, color: colors.text },
  cardActions: { flexDirection: "row", alignItems: "center", gap: 10 },
  deleteBtn: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.textFaint },
  cardBody: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, lineHeight: 20, marginBottom: 4 },
  cardDate: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textFaint },
  scriptureCard: { borderRadius: colors.radius.md, padding: 14, marginTop: 10, backgroundColor: "rgba(74,126,232,0.08)", borderWidth: 1, borderColor: colors.blueGlow },
  scriptureRef: { fontFamily: "Inter_700Bold", fontSize: 12, color: colors.blue, marginBottom: 6 },
  scriptureText: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, lineHeight: 20, fontStyle: "italic" },
});
