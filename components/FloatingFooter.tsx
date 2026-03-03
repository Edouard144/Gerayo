import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
    Animated, // for all animations
    Image,
    Pressable, // better than TouchableOpacity — supports fine-grained press states
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FloatingFooterProps {
  activeTab: "home" | "your-cars" | "appointment" | "management";
}

// ─── Tab config — single source of truth ─────────────────────────────────────
const TABS: {
  key: FloatingFooterProps["activeTab"];
  label: string;
  route: string;
  icon: any;
}[] = [
  {
    key: "home",
    label: "Home",
    route: "/",
    icon: require("../assets/images/material-symbols_home-outline-rounded.png"),
  },
  {
    key: "your-cars",
    label: "Your Car",
    route: "/your-cars",
    icon: require("../assets/images/car_icon.png"),
  },
  {
    key: "appointment",
    label: "Appointment",
    route: "/schedule-appointment",
    icon: require("../assets/images/mdi_calendar-outline.png"),
  },
  {
    key: "management",
    label: "Management",
    route: "/management",
    icon: require("../assets/images/material-symbols_settings-outline-rounded.png"),
  },
];

// ─── Single animated tab item ─────────────────────────────────────────────────
const TabItem: React.FC<{
  tab: (typeof TABS)[0];
  isActive: boolean;
  onPress: () => void;
  entryDelay: number; // staggered fade-in delay
}> = ({ tab, isActive, onPress, entryDelay }) => {
  // Scale for press feedback
  const pressScale = useRef(new Animated.Value(1)).current;

  // Scale for the active indicator blob (grows in when active)
  const activeScale = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  // Opacity for the icon/text (entry animation)
  const entryOpacity = useRef(new Animated.Value(0)).current;
  const entryY = useRef(new Animated.Value(12)).current;

  // ── Entry animation (staggered slide-up + fade-in) ──────────────────────
  useEffect(() => {
    Animated.parallel([
      Animated.timing(entryOpacity, {
        toValue: 1,
        duration: 400,
        delay: entryDelay,
        useNativeDriver: true,
      }),
      Animated.spring(entryY, {
        toValue: 0,
        tension: 80,
        friction: 10,
        delay: entryDelay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // ── Active indicator: scale in/out when tab changes ─────────────────────
  useEffect(() => {
    Animated.spring(activeScale, {
      toValue: isActive ? 1 : 0,
      tension: 200,
      friction: 12,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  // ── Press handlers: quick scale-down + spring back ───────────────────────
  const handlePressIn = () => {
    Animated.spring(pressScale, {
      toValue: 0.85,
      tension: 300,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressScale, {
      toValue: 1,
      tension: 300,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      style={styles.footerItem}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      android_ripple={{
        color: "rgba(255,255,255,0.08)",
        borderless: true,
        radius: 36,
      }}
    >
      {/* Staggered entry wrapper */}
      <Animated.View
        style={{
          alignItems: "center",
          opacity: entryOpacity,
          transform: [{ translateY: entryY }, { scale: pressScale }],
        }}
      >
        {/* Icon container with animated active background */}
        <View style={styles.iconWrapper}>
          {/* Active gradient background — scales in/out */}
          <Animated.View
            style={[
              styles.activeBackground,
              { transform: [{ scale: activeScale }], opacity: activeScale },
            ]}
          >
            <LinearGradient
              colors={["#3B6CF2", "#5D5FEF", "#7B4DFF"]}
              locations={[0, 0.5, 1]}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          </Animated.View>

          {/* The icon itself — tint animates via JS (simple toggle) */}
          <Image
            source={tab.icon}
            style={[styles.icon, { tintColor: isActive ? "#FFF" : "#555" }]}
            resizeMode="contain"
          />
        </View>

        {/* Label */}
        <Text style={[styles.footerText, isActive && styles.activeFooterText]}>
          {tab.label}
        </Text>

        {/* Active dot indicator at the bottom */}
        <Animated.View
          style={[
            styles.activeDot,
            { transform: [{ scale: activeScale }], opacity: activeScale },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

// ─── Main FloatingFooter ──────────────────────────────────────────────────────
export const FloatingFooter: React.FC<FloatingFooterProps> = ({
  activeTab,
}) => {
  const insets = useSafeAreaInsets();

  // Footer itself slides up from off-screen on mount
  const footerY = useRef(new Animated.Value(100)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(footerOpacity, {
        toValue: 1,
        duration: 400,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.spring(footerY, {
        toValue: 0,
        tension: 60,
        friction: 12,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.footer,
        {
          bottom: 20 + insets.bottom,
          opacity: footerOpacity,
          transform: [{ translateY: footerY }],
        },
      ]}
    >
      {/* Subtle inner top border highlight — gives a glass-like depth */}
      <View style={styles.innerTopHighlight} />

      {TABS.map((tab, index) => (
        <TabItem
          key={tab.key}
          tab={tab}
          isActive={activeTab === tab.key}
          onPress={() => router.push(tab.route as any)}
          entryDelay={index * 60} // each tab staggers 60ms apart
        />
      ))}
    </Animated.View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    left: "50%",
    marginLeft: -172,
    width: 344,
    height: 72,
    // Slightly deeper dark for a premium feel
    backgroundColor: "#0F1422",
    borderRadius: 20, // ← rounder = more modern
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 8,
    // Rich multi-layer shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 20,
    overflow: "visible",
  },
  // Thin top edge highlight to simulate glass refraction
  innerTopHighlight: {
    position: "absolute",
    top: 0,
    left: 24,
    right: 24,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 1,
  },
  footerItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 6,
  },
  // Relative container so the gradient bg sits behind the icon
  iconWrapper: {
    width: 46,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 3,
    overflow: "hidden", // clips the gradient within the rounded box
  },
  // Gradient background that scales in when active
  activeBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
    overflow: "hidden",
  },
  icon: {
    width: 22,
    height: 22,
    zIndex: 1, // icon stays above the gradient layer
  },
  footerText: {
    fontFamily: "Cairo",
    color: "rgba(255,255,255,0.38)",
    fontSize: 9.5,
    textAlign: "center",
    letterSpacing: 0.2,
  },
  activeFooterText: {
    fontFamily: "CairoMedium",
    color: "#FFFFFF",
    opacity: 1,
  },
  // Small glowing dot under the active label
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#7B4DFF",
    marginTop: 3,
    shadowColor: "#7B4DFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
  },
});
