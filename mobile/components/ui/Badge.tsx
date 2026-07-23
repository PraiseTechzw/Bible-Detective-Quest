import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";

type Color = "gold" | "green" | "red" | "blue" | "purple" | "amber" | "muted";

interface Props {
  label: string;
  color?: Color;
  icon?: keyof typeof Feather.glyphMap;
  size?: "sm" | "md";
}

const COLOR_MAP: Record<Color, { bg: string; border: string; text: string }> = {
  gold: { bg: "rgba(212,150,42,0.18)", border: "rgba(212,150,42,0.45)", text: colors.gold },
  green: { bg: "rgba(46,204,142,0.15)", border: "rgba(46,204,142,0.4)", text: colors.green },
  red: { bg: "rgba(232,64,64,0.15)", border: "rgba(232,64,64,0.4)", text: colors.red },
  blue: { bg: "rgba(74,126,232,0.15)", border: "rgba(74,126,232,0.4)", text: colors.blue },
  purple: { bg: "rgba(124,94,232,0.15)", border: "rgba(124,94,232,0.4)", text: colors.purple },
  amber: { bg: "rgba(245,166,35,0.15)", border: "rgba(245,166,35,0.4)", text: colors.amber },
  muted: { bg: "rgba(122,133,163,0.12)", border: "rgba(122,133,163,0.25)", text: colors.textMuted },
};

export default function Badge({ label, color = "gold", icon, size = "sm" }: Props) {
  const c = COLOR_MAP[color];
  const fs = size === "sm" ? 10 : 12;
  const iconSize = size === "sm" ? 10 : 12;

  return (
    <View style={[styles.badge, { backgroundColor: c.bg, borderColor: c.border, paddingHorizontal: size === "sm" ? 8 : 10, paddingVertical: size === "sm" ? 3 : 5 }]}>
      {icon && <Feather name={icon} size={iconSize} color={c.text} />}
      <Text style={[styles.label, { fontSize: fs, color: c.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderRadius: colors.radius.full,
  },
  label: { fontFamily: "Inter_600SemiBold", letterSpacing: 0.5 },
});
