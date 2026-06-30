import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { IconFolder, IconZap, IconAward, IconTrendingUp } from "@/components/ui/SvgIcons";

function TabIcon({ icon, label, focused }: { icon: React.ReactNode; label: string; focused: boolean }) {
  return (
    <View style={tabStyles.iconWrap}>
      {focused ? (
        <LinearGradient colors={[colors.goldLight, colors.gold]} style={tabStyles.activeChip}>
          {icon}
        </LinearGradient>
      ) : (
        <View style={tabStyles.inactiveChip}>
          {icon}
        </View>
      )}
      <Text style={[tabStyles.label, { color: focused ? colors.gold : colors.textMuted }]}>{label}</Text>
    </View>
  );
}

const tabStyles = StyleSheet.create({
  iconWrap: { alignItems: "center", gap: 3, paddingTop: 4 },
  activeChip: { width: 40, height: 32, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  inactiveChip: { width: 40, height: 32, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  label: { fontFamily: "Inter_500Medium", fontSize: 10, letterSpacing: 0.2 },
});

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPad = Platform.OS === "web" ? 0 : insets.bottom;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface1,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 56 + bottomPad,
          paddingBottom: bottomPad,
          elevation: 0,
        },
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<IconFolder size={16} color={focused ? "#000" : colors.textMuted} />}
              label="Cases"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="play"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<IconZap size={16} color={focused ? "#000" : colors.textMuted} />}
              label="Play"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<IconTrendingUp size={16} color={focused ? "#000" : colors.textMuted} />}
              label="Records"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<IconAward size={16} color={focused ? "#000" : colors.textMuted} />}
              label="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
