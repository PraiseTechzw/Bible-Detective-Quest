import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { getDailyVerse, DAILY_VERSES } from "@/data/bibleTools";
import { useBible } from "@/context/BibleContext";

const DEVOTIONAL_THOUGHTS: Record<string, string> = {
  "Salvation": "God's love is not passive — it is active, costly, and personal. The cross is the ultimate proof that He did not simply observe our suffering but stepped into it. Today, rest in the truth that you are fully known and completely loved.",
  "Trust": "The Lord is not a distant supervisor — He is a shepherd who knows each sheep by name. When you feel lost or overwhelmed, remember: you have a Shepherd who actively seeks you, leads you beside still waters, and restores your soul.",
  "Providence": "Nothing that touches your life is outside of God's sovereign awareness. Even your most painful chapters are being worked into a story of His glory and your ultimate good. Trust the Author.",
  "Wisdom": "Leaning on your own understanding is like trying to navigate by candlelight when the sun is available. God's wisdom is not just information — it is illumination. Ask, and He gives generously.",
  "Strength": "You were never meant to carry the weight of life in your own strength. The invitation to 'do all things through Christ' is not a command to try harder but to abide deeper. His strength is made perfect in your weakness.",
  "Renewal": "Weariness is not a spiritual failure — it is an invitation. God does not condemn the tired; He refreshes them. Wait on Him today. Not passively, but with expectant hope that He will lift you on eagle's wings.",
  "Hope": "God's plans for you were crafted before you knew to worry about them. His thoughts toward you outnumber the grains of sand. The future He holds for you is better than the future you fear.",
  "Courage": "Courage is not the absence of fear — it is obedience in spite of it. The God who commanded Joshua to 'be strong and courageous' is the same God who walks with you today. You are not alone.",
  "Witness": "Your life is a living testimony. When people see you love, forgive, serve, and persevere, they catch a glimpse of the Father. Let your light shine — not to draw attention to yourself, but to point to Him.",
  "Peace": "In a world that measures productivity by noise and busyness, God invites you to 'be still'. Stillness is not laziness — it is the posture of someone who knows God is God and they are not.",
  "Transformation": "Conformity to the world happens by drift; transformation happens by intention. The renewing of your mind is daily work — filling your thoughts with truth until it shapes your desires, decisions, and direction.",
  "Scripture": "The Bible is not merely literature about God — it is a lamp. Not a floodlight for all of life at once, but enough light for the next step. Open it today, and walk in the light it gives you.",
  "Grace": "You did not earn salvation, and you cannot lose it by failing to maintain it. Grace is not a transaction — it is a relationship. Come just as you are, again and again, to the God of all grace.",
  "Holy Spirit": "The fruit of the Spirit grows in the same soil as all other fruit: time, sunlight, and patience. You cannot manufacture love, joy, or peace — but you can abide in the One who produces them in you.",
  "Faith": "Every step of faith begins with uncertainty. The heroes of Hebrews 11 did not know how the story would end — they simply trusted the Author. Today, take the next faithful step, even if you can't see the staircase.",
  "Love": "God is love — not merely loving, but love itself. Everything He does flows from this nature. Because He first loved us, we can love. Because He is love, love can conquer what fear, pride, and selfishness cannot.",
  "Priority": "Seeking first the Kingdom is not about religious activity — it is about where you look when you wake up, when you're afraid, when you're tempted, when you succeed. First means first in the order of your heart.",
  "Atonement": "Isaiah 53 describes the Servant bruised for our iniquities centuries before crucifixion was invented. The cross was not an accident — it was the eternal plan of a God who would stop at nothing to bring us home.",
  "Jesus": "Jesus did not say 'I know the way' or 'I will show you the way'. He said 'I am the way'. The path to the Father is not a method or a philosophy — it is a Person. And that Person says, 'Come to me'.",
  "Creation": "In the beginning — three words that shift everything. Before anxiety, before failure, before every broken thing, there was God. And He created. And it was good. You were made by the same creative hand.",
  "Justice": "God's justice and mercy are not in tension — they meet at the cross. He requires justice because He is holy; He provides mercy because He is love. What He requires of you is simply to reflect that same character to others.",
  "Compassion": "The shortest verse in the Bible contains perhaps its deepest theology: Jesus wept. He did not lecture Mary and Martha about heaven. He sat with them in their grief. God is not unmoved by your pain.",
  "Character": "Strength and honour are not earned in moments of ease — they are forged in seasons of difficulty. The woman clothed with strength in Proverbs 31 does not fear the future because she has been faithful in the present.",
  "Repentance": "God does not want a clean performance — He wants a clean heart. Psalm 51 was written after David's most spectacular failure. If God could restore David, He can restore you. Come with honesty, not perfection.",
  "Mission": "The Great Commission is not for missionaries only — it is for every follower of Jesus. You have been sent: to your home, your workplace, your neighbourhood, your city. Go. And as you go, make disciples.",
  "Sin": "Romans 3:23 levels every human hierarchy — prophet and pagan, religious and rebellious, all fall short. The playing field of need is perfectly level. And the provision of grace is equally available to all.",
  "Forgiveness": "As far as the east is from the west — not north from south (which has measurable poles) but east from west, which is infinite. That is the distance God places between you and your forgiven sin. It is gone.",
};

interface Props {
  onBack: () => void;
  topPad: number;
  onOpenReader: (book: string, bookName: string, chapter: number) => void;
}

export default function DailyDevotional({ onBack, topPad, onOpenReader }: Props) {
  const insets = useSafeAreaInsets();
  const bible = useBible();
  const verse = getDailyVerse();
  const isBookmarked = bible.isBookmarked(verse.book, verse.chapter, verse.verse);
  const thought = DEVOTIONAL_THOUGHTS[verse.theme] ?? "Meditate on this verse today. Let it speak to your heart and guide your steps.";
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);

  const [reflectionIdx, setReflectionIdx] = useState(0);
  const allVerses = DAILY_VERSES;

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>TOOLS · TODAY</Text>
          <Text style={styles.headerTitle}>Daily Verse</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scroll, { paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90 }]}>
        <LinearGradient colors={["rgba(212,150,42,0.15)", "rgba(212,150,42,0.04)"]} style={styles.verseCard}>
          <View style={styles.vcHeader}>
            <View>
              <Text style={styles.vcDate}>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</Text>
              <Text style={styles.vcTheme}>Theme: {verse.theme}</Text>
            </View>
            <Pressable onPress={() => {
              if (isBookmarked) {
                const bm = bible.bookmarks.find(b => b.book === verse.book && b.chapter === verse.chapter && b.verse === verse.verse);
                if (bm) bible.removeBookmark(bm.id);
              } else {
                bible.addBookmark({ book: verse.book, bookName: verse.ref.split(" ")[0], chapter: verse.chapter, verse: verse.verse, text: verse.text, translation: "KJV" });
              }
            }}>
              <Text style={{ fontSize: 22, opacity: isBookmarked ? 1 : 0.3 }}>🔖</Text>
            </Pressable>
          </View>
          <Text style={styles.verseText}>"{verse.text}"</Text>
          <Pressable onPress={() => onOpenReader(verse.book, verse.ref.split(" ")[0], verse.chapter)} style={styles.refBtn}>
            <Text style={styles.refText}>— {verse.ref}</Text>
            <Text style={styles.readLink}>Read chapter →</Text>
          </Pressable>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✍️ Devotional Thought</Text>
          <Text style={styles.devotionText}>{thought}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🙏 Reflection Questions</Text>
          {[
            "How does this verse speak to where you are today?",
            "What is God inviting you to believe, do, or release?",
            "Who can you share this truth with today?",
          ].map((q, i) => (
            <View key={i} style={styles.questionRow}>
              <View style={styles.qNum}><Text style={styles.qNumText}>{i + 1}</Text></View>
              <Text style={styles.questionText}>{q}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 More Verses</Text>
          {DAILY_VERSES.slice(0, 6).map((v, i) => (
            <Pressable key={i} onPress={() => onOpenReader(v.book, v.ref.split(" ")[0], v.chapter)} style={styles.miniVerse}>
              <Text style={styles.miniRef}>{v.ref}</Text>
              <Text style={styles.miniText} numberOfLines={2}>{v.text}</Text>
              <Text style={styles.miniTheme}>{v.theme}</Text>
            </Pressable>
          ))}
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
  scroll: { paddingHorizontal: 16, paddingTop: 4 },
  verseCard: { borderRadius: colors.radius.lg, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: colors.goldBorder },
  vcHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 },
  vcDate: { fontFamily: "Inter_600SemiBold", fontSize: 12, color: colors.gold },
  vcTheme: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textMuted, marginTop: 2 },
  verseText: { fontFamily: "Inter_400Regular", fontSize: 16, color: colors.text, lineHeight: 28, fontStyle: "italic", marginBottom: 12 },
  refBtn: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  refText: { fontFamily: "Inter_700Bold", fontSize: 13, color: colors.gold },
  readLink: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted },
  section: { marginBottom: 20 },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 14, color: colors.text, marginBottom: 12 },
  devotionText: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.textMuted, lineHeight: 24 },
  questionRow: { flexDirection: "row", gap: 10, marginBottom: 10, alignItems: "flex-start" },
  qNum: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.goldGlow, alignItems: "center", justifyContent: "center", marginTop: 1 },
  qNumText: { fontFamily: "Inter_700Bold", fontSize: 11, color: colors.gold },
  questionText: { flex: 1, fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, lineHeight: 21 },
  miniVerse: { backgroundColor: colors.surface2, borderRadius: colors.radius.md, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: colors.border },
  miniRef: { fontFamily: "Inter_700Bold", fontSize: 12, color: colors.gold, marginBottom: 4 },
  miniText: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.text, lineHeight: 18 },
  miniTheme: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textFaint, marginTop: 4 },
});
