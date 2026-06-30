import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { useBible } from "@/context/BibleContext";

interface Props { onBack: () => void; topPad: number; }

export default function SermonNotes({ onBack, topPad }: Props) {
  const insets = useSafeAreaInsets();
  const bible = useBible();
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [reference, setReference] = useState("");
  const [body, setBody] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    if (editing) {
      bible.updateSermonNote(editing, { title: title.trim(), reference: reference.trim(), body: body.trim() });
      setEditing(null);
    } else {
      bible.addSermonNote({ title: title.trim(), reference: reference.trim(), body: body.trim() });
    }
    setTitle(""); setReference(""); setBody(""); setAdding(false);
  };

  const openEdit = (id: string) => {
    const note = bible.sermonNotes.find(n => n.id === id);
    if (!note) return;
    setTitle(note.title); setReference(note.reference); setBody(note.body);
    setEditing(id); setAdding(true);
  };

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={onBack} style={styles.backBtn}><Text style={styles.backIcon}>←</Text></Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>TOOLS</Text>
          <Text style={styles.headerTitle}>Sermon Notes</Text>
        </View>
        <Pressable onPress={() => { setAdding(true); setEditing(null); setTitle(""); setReference(""); setBody(""); }} style={styles.addBtn}>
          <LinearGradient colors={[colors.goldLight, colors.gold]} style={styles.addBtnInner}>
            <Text style={styles.addBtnText}>+ New</Text>
          </LinearGradient>
        </Pressable>
      </View>

      {adding && (
        <View style={styles.addForm}>
          <TextInput style={styles.input} placeholder="Sermon title..." placeholderTextColor={colors.textFaint} value={title} onChangeText={setTitle} />
          <TextInput style={styles.input} placeholder="Scripture reference (e.g. John 3:16)..." placeholderTextColor={colors.textFaint} value={reference} onChangeText={setReference} />
          <TextInput style={[styles.input, styles.inputMulti]} placeholder="Your notes..." placeholderTextColor={colors.textFaint} value={body} onChangeText={setBody} multiline numberOfLines={6} />
          <View style={styles.formActions}>
            <Pressable onPress={() => { setAdding(false); setEditing(null); }} style={styles.cancelBtn}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={handleAdd} style={styles.saveBtn}>
              <LinearGradient colors={[colors.goldLight, colors.gold]} style={styles.saveBtnInner}>
                <Text style={styles.saveBtnText}>{editing ? "Update" : "Save Notes"}</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.list, { paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90 }]}>
        {bible.sermonNotes.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🎙️</Text>
            <Text style={styles.emptyTitle}>No Sermon Notes Yet</Text>
            <Text style={styles.emptyDesc}>Tap '+ New' to capture notes from your next message or study.</Text>
          </View>
        ) : (
          bible.sermonNotes.map(note => (
            <Pressable key={note.id} onPress={() => openEdit(note.id)} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{note.title}</Text>
                  {!!note.reference && <Text style={styles.cardRef}>{note.reference}</Text>}
                </View>
                <Pressable onPress={() => Alert.alert("Delete note?", note.title, [
                  { text: "Cancel", style: "cancel" },
                  { text: "Delete", style: "destructive", onPress: () => bible.removeSermonNote(note.id) },
                ])}>
                  <Text style={styles.deleteBtn}>✕</Text>
                </Pressable>
              </View>
              {!!note.body && <Text style={styles.cardBody} numberOfLines={4}>{note.body}</Text>}
              <Text style={styles.cardDate}>{note.date}</Text>
            </Pressable>
          ))
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
  addBtn: {},
  addBtnInner: { borderRadius: colors.radius.md, paddingHorizontal: 14, paddingVertical: 8 },
  addBtnText: { fontFamily: "Inter_700Bold", fontSize: 12, color: "#000" },
  addForm: { marginHorizontal: 16, marginBottom: 10, backgroundColor: colors.surface2, borderRadius: colors.radius.md, padding: 12, gap: 8, borderWidth: 1, borderColor: colors.border },
  input: { backgroundColor: colors.surface3, borderRadius: colors.radius.sm, paddingHorizontal: 12, paddingVertical: 9, fontFamily: "Inter_400Regular", fontSize: 14, color: colors.text, borderWidth: 1, borderColor: colors.border },
  inputMulti: { minHeight: 120, textAlignVertical: "top" },
  formActions: { flexDirection: "row", gap: 8 },
  cancelBtn: { flex: 1, borderRadius: colors.radius.md, paddingVertical: 9, alignItems: "center", backgroundColor: colors.surface3, borderWidth: 1, borderColor: colors.border },
  cancelBtnText: { fontFamily: "Inter_600SemiBold", fontSize: 13, color: colors.textMuted },
  saveBtn: { flex: 1 },
  saveBtnInner: { borderRadius: colors.radius.md, paddingVertical: 9, alignItems: "center" },
  saveBtnText: { fontFamily: "Inter_700Bold", fontSize: 13, color: "#000" },
  list: { paddingHorizontal: 16 },
  empty: { alignItems: "center", paddingVertical: 50, gap: 8 },
  emptyIcon: { fontSize: 36 },
  emptyTitle: { fontFamily: "Inter_700Bold", fontSize: 17, color: colors.text },
  emptyDesc: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, textAlign: "center", lineHeight: 20 },
  card: { backgroundColor: colors.surface2, borderRadius: colors.radius.md, padding: 13, marginBottom: 8, borderWidth: 1, borderColor: colors.border },
  cardHeader: { flexDirection: "row", alignItems: "flex-start", gap: 8, marginBottom: 6 },
  cardTitle: { fontFamily: "Inter_700Bold", fontSize: 15, color: colors.text },
  cardRef: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: colors.gold, marginTop: 2 },
  deleteBtn: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.textFaint },
  cardBody: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, lineHeight: 20, marginBottom: 6 },
  cardDate: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textFaint },
});
