import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FloatingFooterProps {
  activeTab: "home" | "your-cars" | "appointment" | "management";
}

const TABS: {
  key: FloatingFooterProps["activeTab"];
  label: string;
  route: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconActive: keyof typeof Ionicons.glyphMap;
}[] = [
  { key: "home", label: "Home", route: "/(tabs)", icon: "home-outline", iconActive: "home" },
  { key: "your-cars", label: "Your Car", route: "/(tabs)/your-cars", icon: "car-outline", iconActive: "car" },
  { key: "appointment", label: "Schedule", route: "/(tabs)/schedule-appointment", icon: "calendar-outline", iconActive: "calendar" },
  { key: "management", label: "Settings", route: "/(tabs)/management", icon: "settings-outline", iconActive: "settings" },
];

const TabItem: React.FC<{
  tab: (typeof TABS)[0];
  isActive: boolean;
  onPress: () => void;
  entryDelay: number;
}> = ({ tab, isActive, onPress, entryDelay }) => {
  const pressScale = useRef(new Animated.Value(1)).current;
  const entryOpacity = useRef(new Animated.Value(0)).current;
  const entryY = useRef(new Animated.Value(10)).current;
  const indicatorWidth = useRef(new Animated.Value(isActive ? 1 : 0)).current;
  const iconColor = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(entryOpacity, { toValue: 1, duration: 350, delay: entryDelay, useNativeDriver: true }),
      Animated.spring(entryY, { toValue: 0, tension: 80, friction: 10, delay: entryDelay, useNativeDriver: true }),
    ]).start();
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(indicatorWidth, { toValue: isActive ? 1 : 0, tension: 200, friction: 14, useNativeDriver: false }),
      Animated.timing(iconColor, { toValue: isActive ? 1 : 0, duration: 200, useNativeDriver: true }),
    ]).start();
  }, [isActive]);

  const handlePressIn = () => {
    Animated.spring(pressScale, { toValue: 0.88, tension: 300, friction: 10, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(pressScale, { toValue: 1, tension: 300, friction: 10, useNativeDriver: true }).start();
  };

  const iconInterpolate = iconColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(255,255,255,0.35)", "#FFFFFF"],
  });

  const indicatorScaleX = indicatorWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Pressable
      style={styles.tabItem}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={{
          alignItems: "center",
          opacity: entryOpacity,
          transform: [{ translateY: entryY }, { scale: pressScale }],
        }}
      >
        <View style={styles.iconContainer}>
          <Animated.Text style={{ color: iconInterpolate }}>
            <Ionicons name={isActive ? tab.iconActive : tab.icon} size={22} color={isActive ? "#FFF" : "rgba(255,255,255,0.35)"} />
          </Animated.Text>
        </View>

        <Animated.Text
          style={[
            styles.tabLabel,
            { color: iconInterpolate },
          ]}
        >
          {tab.label}
        </Animated.Text>

        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [{ scaleX: indicatorScaleX }],
              opacity: indicatorScaleX,
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

export const FloatingFooter: React.FC<FloatingFooterProps> = ({ activeTab }) => {
  const insets = useSafeAreaInsets();
  const footerY = useRef(new Animated.Value(60)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(footerOpacity, { toValue: 1, duration: 350, delay: 80, useNativeDriver: true }),
      Animated.spring(footerY, { toValue: 0, tension: 60, friction: 12, delay: 80, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.footer,
        {
          bottom: 16 + insets.bottom,
          opacity: footerOpacity,
          transform: [{ translateY: footerY }],
        },
      ]}
    >
      <View style={styles.footerInner} />
      {TABS.map((tab, index) => (
        <TabItem
          key={tab.key}
          tab={tab}
          isActive={activeTab === tab.key}
          onPress={() => router.push(tab.route as any)}
          entryDelay={index * 50}
        />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    left: 16,
    right: 16,
    height: 68,
    backgroundColor: "#111827",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 16,
  },
  footerInner: {
    position: "absolute",
    top: 0,
    left: 32,
    right: 32,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
  iconContainer: {
    width: 36,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
  tabLabel: {
    fontFamily: "CairoMedium",
    fontSize: 10,
    textAlign: "center",
    letterSpacing: 0.2,
  },
  indicator: {
    width: 16,
    height: 2.5,
    borderRadius: 1.25,
    backgroundColor: "#6366F1",
    marginTop: 4,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
});
