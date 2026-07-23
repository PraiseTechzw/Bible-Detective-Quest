import { LinearGradient } from "expo-linear-gradient";
import { Tabs, useSegments } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { IconFolder, IconZap, IconAward, IconTrendingUp, IconBookOpen } from "@/components/ui/SvgIcons";

function TabIcon({ icon, label, focused }: { icon: React.ReactNode; label: string; focused: boolean }) {
  return (
    <View style={tabStyles.iconWrap}>
      {focused ? (
        <LinearGradient colors={[colors.goldLight, colors.gold]} style={tabStyles.activeChip}>
          {icon}
        </LinearGradient>
      ) : (
        <View style={tabStyles.inactiveChip}>{icon}</View>
      )}
      <Text style={[tabStyles.label, { color: focused ? colors.gold : colors.textMuted }]}>{label}</Text>
    </View>
  );
}

const tabStyles = StyleSheet.create({
  iconWrap: { alignItems: "center", gap: 3, paddingTop: 4 },
  activeChip: { width: 38, height: 30, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  inactiveChip: { width: 38, height: 30, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  label: { fontFamily: "Inter_500Medium", fontSize: 9, letterSpacing: 0.1 },
});

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPad = Platform.OS === "web" ? 0 : insets.bottom;
  const segments = useSegments();
  const activeTab = segments[segments.length - 1];
  const hideTabBar = activeTab === "bible";
  const baseTabBarStyle = {
    backgroundColor: colors.surface1,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: 54 + bottomPad,
    paddingBottom: bottomPad,
    elevation: 0,
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: hideTabBar ? { display: "none" } : baseTabBarStyle,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={<IconFolder size={15} color={focused ? "#000" : colors.textMuted} />} label="Cases" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="play"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={<IconZap size={15} color={focused ? "#000" : colors.textMuted} />} label="Play" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="bible"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={<IconBookOpen size={15} color={focused ? "#000" : colors.textMuted} />} label="Bible" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={<IconTrendingUp size={15} color={focused ? "#000" : colors.textMuted} />} label="Records" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={<IconAward size={15} color={focused ? "#000" : colors.textMuted} />} label="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
