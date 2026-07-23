import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import colors from "@/constants/colors";

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  glowColor?: string;
  gradient?: readonly [string, string, ...string[]];
  bordered?: boolean;
  borderColor?: string;
  padding?: number;
}

export default function GradientCard({
  children,
  style,
  glowColor,
  gradient = [colors.surface2, colors.surface1],
  bordered = true,
  borderColor = colors.border,
  padding = 16,
}: Props) {
  return (
    <View style={[styles.wrapper, glowColor && { shadowColor: glowColor, shadowOpacity: 0.4, shadowRadius: 16, shadowOffset: { width: 0, height: 4 } }, style]}>
      {bordered && (
        <View style={[StyleSheet.absoluteFill, styles.border, { borderColor, borderRadius: colors.radius.lg }]} />
      )}
      <LinearGradient
        colors={gradient}
        style={[styles.card, { borderRadius: colors.radius.lg, padding }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {children}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: "relative" },
  border: {
    borderWidth: 1,
    zIndex: 0,
  },
  card: {
    overflow: "hidden",
  },
});
