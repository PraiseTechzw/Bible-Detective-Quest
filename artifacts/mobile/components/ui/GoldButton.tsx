import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import colors from "@/constants/colors";

interface Props {
  label: string;
  onPress: () => void;
  icon?: keyof typeof Feather.glyphMap;
  iconRight?: boolean;
  disabled?: boolean;
  loading?: boolean;
  variant?: "gold" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  style?: ViewStyle;
}

const SIZE_PY: Record<string, number> = { sm: 10, md: 14, lg: 18 };
const SIZE_FS: Record<string, number> = { sm: 13, md: 15, lg: 17 };

export default function GoldButton({
  label,
  onPress,
  icon,
  iconRight = true,
  disabled = false,
  loading = false,
  variant = "gold",
  size = "md",
  style,
}: Props) {
  const py = SIZE_PY[size];
  const fs = SIZE_FS[size];
  const isDisabled = disabled || loading;

  if (variant === "outline") {
    return (
      <Pressable
        onPress={isDisabled ? undefined : onPress}
        style={({ pressed }) => [
          styles.btn,
          { paddingVertical: py, borderWidth: 1.5, borderColor: isDisabled ? colors.textFaint : colors.goldBorder, backgroundColor: "transparent", opacity: pressed && !isDisabled ? 0.7 : 1 },
          style,
        ]}
      >
        {icon && !iconRight && <Feather name={icon} size={fs} color={isDisabled ? colors.textFaint : colors.gold} />}
        <Text style={[styles.label, { fontSize: fs, color: isDisabled ? colors.textFaint : colors.gold }]}>{label}</Text>
        {icon && iconRight && <Feather name={icon} size={fs} color={isDisabled ? colors.textFaint : colors.gold} />}
      </Pressable>
    );
  }

  if (variant === "ghost") {
    return (
      <Pressable
        onPress={isDisabled ? undefined : onPress}
        style={({ pressed }) => [
          styles.btn,
          { paddingVertical: py, backgroundColor: "transparent", opacity: pressed && !isDisabled ? 0.6 : 1 },
          style,
        ]}
      >
        {icon && !iconRight && <Feather name={icon} size={fs} color={colors.textMuted} />}
        <Text style={[styles.label, { fontSize: fs, color: colors.textMuted }]}>{label}</Text>
        {icon && iconRight && <Feather name={icon} size={fs} color={colors.textMuted} />}
      </Pressable>
    );
  }

  const gradientColors = variant === "danger"
    ? (["#C42828", "#8B1A1A"] as const)
    : isDisabled
    ? (["#2A3050", "#1A2038"] as const)
    : colors.goldGradient;

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      style={({ pressed }) => [{ opacity: pressed && !isDisabled ? 0.85 : 1, borderRadius: colors.radius.md }, style]}
    >
      <LinearGradient
        colors={gradientColors}
        style={[styles.btn, { paddingVertical: py }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {loading ? (
          <ActivityIndicator size="small" color={isDisabled ? colors.textFaint : "#000"} />
        ) : (
          <>
            {icon && !iconRight && <Feather name={icon} size={fs} color={isDisabled ? colors.textFaint : "#000"} />}
            <Text style={[styles.label, { fontSize: fs, color: isDisabled ? colors.textFaint : "#000" }]}>{label}</Text>
            {icon && iconRight && <Feather name={icon} size={fs} color={isDisabled ? colors.textFaint : "#000"} />}
          </>
        )}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: colors.radius.md,
    paddingHorizontal: 20,
  },
  label: { fontFamily: "Inter_700Bold", letterSpacing: 0.3 },
});
