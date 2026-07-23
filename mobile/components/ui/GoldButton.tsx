import { Feather, Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import colors from "@/constants/colors";

type IconFamily = "feather" | "ionicons" | "material-community" | "font-awesome-5";

type IconName =
  | keyof typeof Feather.glyphMap
  | keyof typeof Ionicons.glyphMap
  | keyof typeof MaterialCommunityIcons.glyphMap
  | keyof typeof FontAwesome5.glyphMap;

interface Props {
  label: string;
  onPress: () => void;
  icon?: IconName;
  iconFamily?: IconFamily;
  iconRight?: boolean;
  disabled?: boolean;
  loading?: boolean;
  variant?: "gold" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  style?: ViewStyle;
}

const SIZE_PY: Record<string, number> = { sm: 10, md: 14, lg: 18 };
const SIZE_FS: Record<string, number> = { sm: 13, md: 15, lg: 17 };

function renderIcon(
  family: IconFamily,
  name: IconName,
  size: number,
  color: string
) {
  switch (family) {
    case "ionicons":
      return <Ionicons name={name as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
    case "material-community":
      return (
        <MaterialCommunityIcons
          name={name as keyof typeof MaterialCommunityIcons.glyphMap}
          size={size}
          color={color}
        />
      );
    case "font-awesome-5":
      return <FontAwesome5 name={name as keyof typeof FontAwesome5.glyphMap} size={size} color={color} />;
    case "feather":
    default:
      return <Feather name={name as keyof typeof Feather.glyphMap} size={size} color={color} />;
  }
}

export default function GoldButton({
  label,
  onPress,
  icon,
  iconFamily = "feather",
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
    const color = isDisabled ? colors.textFaint : colors.gold;
    return (
      <Pressable
        onPress={isDisabled ? undefined : onPress}
        style={({ pressed }) => [
          styles.btn,
          { paddingVertical: py, borderWidth: 1.5, borderColor: isDisabled ? colors.textFaint : colors.goldBorder, backgroundColor: "transparent", opacity: pressed && !isDisabled ? 0.7 : 1 },
          style,
        ]}
      >
        {icon && !iconRight && renderIcon(iconFamily, icon, fs, color)}
        <Text style={[styles.label, { fontSize: fs, color }]}>{label}</Text>
        {icon && iconRight && renderIcon(iconFamily, icon, fs, color)}
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
        {icon && !iconRight && renderIcon(iconFamily, icon, fs, colors.textMuted)}
        <Text style={[styles.label, { fontSize: fs, color: colors.textMuted }]}>{label}</Text>
        {icon && iconRight && renderIcon(iconFamily, icon, fs, colors.textMuted)}
      </Pressable>
    );
  }

  const gradientColors = variant === "danger"
    ? (["#C42828", "#8B1A1A"] as const)
    : isDisabled
    ? (["#2A3050", "#1A2038"] as const)
    : colors.goldGradient;

  const solidColor = isDisabled ? colors.textFaint : "#000";

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
          <ActivityIndicator size="small" color={solidColor} />
        ) : (
          <>
            {icon && !iconRight && renderIcon(iconFamily, icon, fs, solidColor)}
            <Text style={[styles.label, { fontSize: fs, color: solidColor }]}>{label}</Text>
            {icon && iconRight && renderIcon(iconFamily, icon, fs, solidColor)}
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