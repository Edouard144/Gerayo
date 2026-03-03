import {
    Cairo_500Medium,
    Cairo_700Bold,
    useFonts,
} from "@expo-google-fonts/cairo";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated, // ← for fade/slide/scale animations
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable, // ← replaces HapticButton for better press feedback
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { AnimatedScreen } from "../../components/AnimatedScreen";

const { width } = Dimensions.get("window");

export default function VehicleSetupScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({ Cairo_500Medium, Cairo_700Bold });

  // ─── State ────────────────────────────────────────────────────────────────
  const [carType, setCarType] = useState<"old" | "modern">("modern");
  const [scrolled, setScrolled] = useState(false);
  const [plateNumber, setPlateNumber] = useState("");
  const [isFocused, setIsFocused] = useState(false); // plate input focus
  const isPlateValid = plateNumber.length >= 6;

  // ─── Animation refs ───────────────────────────────────────────────────────
  const fadeAnim = useRef(new Animated.Value(0)).current; // whole page fade-in
  const carSlideAnim = useRef(new Animated.Value(-30)).current; // car slides in from top
  const formSlideAnim = useRef(new Animated.Value(60)).current; // form slides up
  const checkAnim = useRef(new Animated.Value(0)).current; // checkmark pop
  const continueScale = useRef(new Animated.Value(1)).current; // continue btn scale

  // ─── Entry animation (runs once on mount) ────────────────────────────────
  useEffect(() => {
    if (!fontsLoaded) return;

    // 1) Fade everything in
    // 2) Slide the car image down into place
    // 3) Slide the form up into place
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(carSlideAnim, {
        toValue: 0,
        tension: 60,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.spring(formSlideAnim, {
        toValue: 0,
        tension: 50,
        friction: 10,
        delay: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fontsLoaded]);

  // ─── Checkmark pop animation when plate becomes valid ────────────────────
  useEffect(() => {
    if (isPlateValid) {
      // Scale from 0 → 1 with a bounce
      Animated.spring(checkAnim, {
        toValue: 1,
        tension: 200,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(checkAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [isPlateValid]);

  // ─── Continue button press animation ─────────────────────────────────────
  const onContinuePress = () => {
    // Quick scale-down → scale-up → navigate
    Animated.sequence([
      Animated.timing(continueScale, {
        toValue: 0.93,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(continueScale, {
        toValue: 1,
        tension: 200,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start(() => router.replace("/(tabs)"));
  };

  // ─── Toggle button animated scale ─────────────────────────────────────────
  // We keep one scale ref per button so each animates independently
  const oldScale = useRef(new Animated.Value(1)).current;
  const modernScale = useRef(new Animated.Value(1)).current;

  const animateToggle = (scaleRef: Animated.Value, type: "old" | "modern") => {
    setCarType(type);
    // Tiny bounce on the pressed button
    Animated.sequence([
      Animated.timing(scaleRef, {
        toValue: 0.92,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(scaleRef, {
        toValue: 1,
        tension: 300,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    setScrolled(y > 10);
  };

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: "#1a1a3a" }} />;
  }

  return (
    <AnimatedScreen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <StatusBar style="light" />

        {/* ── Header ─────────────────────────────────────────────── */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <Text style={styles.headerTitle}>Gerayo</Text>
        </Animated.View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.mainScroll, { paddingTop: 120 }]}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {/* ── Car Image ──────────────────────────────────────── */}
          {/* Slides in from slightly above, fades in */}
          <Animated.View
            style={[
              styles.imageContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: carSlideAnim }],
              },
            ]}
          >
            <Image
              source={require("../../assets/images/second_car.png")}
              style={styles.carImage}
              resizeMode="contain"
            />
          </Animated.View>

          {/* ── Form Card ──────────────────────────────────────── */}
          {/* Slides up from below, fades in */}
          <Animated.View
            style={[
              styles.formContainer,
              {
                borderTopLeftRadius: scrolled ? 0 : 56,
                borderTopRightRadius: scrolled ? 0 : 56,
                opacity: fadeAnim,
                transform: [{ translateY: formSlideAnim }],
              },
            ]}
          >
            <View style={styles.scrollContent}>
              <Text style={styles.formTitle}>Register your Car</Text>

              {/* ── Car Type Toggle ────────────────────────── */}
              <Text style={styles.label}>Car Type</Text>
              <View style={styles.toggleContainer}>
                {/* OLD button */}
                <Animated.View
                  style={{ flex: 1, transform: [{ scale: oldScale }] }}
                >
                  <Pressable
                    style={[
                      styles.toggleButton,
                      carType === "old"
                        ? styles.activeToggle
                        : styles.inactiveToggle,
                    ]}
                    onPress={() => animateToggle(oldScale, "old")}
                    // Darken slightly on press (Android ripple on iOS uses opacity)
                    android_ripple={{
                      color: "rgba(0,0,0,0.1)",
                      borderless: false,
                    }}
                  >
                    {/* Active = subtle inner glow */}
                    {carType === "old" && <View style={styles.activeGlow} />}
                    <Text
                      style={[
                        styles.toggleText,
                        carType === "old"
                          ? styles.activeText
                          : styles.inactiveText,
                      ]}
                    >
                      Old
                    </Text>
                  </Pressable>
                </Animated.View>

                {/* MODERN button */}
                <Animated.View
                  style={{ flex: 1, transform: [{ scale: modernScale }] }}
                >
                  <Pressable
                    style={[
                      styles.toggleButton,
                      carType === "modern"
                        ? styles.activeToggle
                        : styles.inactiveToggle,
                    ]}
                    onPress={() => animateToggle(modernScale, "modern")}
                    android_ripple={{
                      color: "rgba(0,0,0,0.1)",
                      borderless: false,
                    }}
                  >
                    {carType === "modern" && <View style={styles.activeGlow} />}
                    <Text
                      style={[
                        styles.toggleText,
                        carType === "modern"
                          ? styles.activeText
                          : styles.inactiveText,
                      ]}
                    >
                      Modern
                    </Text>
                  </Pressable>
                </Animated.View>
              </View>

              {/* ── Plate Number Input ─────────────────────── */}
              <Text style={styles.label}>Plate number</Text>
              <View style={styles.plateWrapper}>
                {/* Glowing border when focused */}
                <View
                  style={[
                    styles.plateContainer,
                    isFocused && styles.plateContainerFocused,
                  ]}
                >
                  <View style={styles.countryCode}>
                    <Text style={styles.countryCodeText}>RW</Text>
                    <Ionicons name="chevron-down" size={16} color="#fff" />
                  </View>
                  <TextInput
                    style={styles.plateInput}
                    placeholder="RAA 123 A"
                    placeholderTextColor="#aaa"
                    value={plateNumber}
                    onChangeText={setPlateNumber}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    clearButtonMode="while-editing"
                    autoCapitalize="characters"
                  />
                </View>

                {/* Animated checkmark — pops in when plate is valid */}
                <Animated.View
                  style={[
                    styles.inputIconWrapper,
                    { transform: [{ scale: checkAnim }], opacity: checkAnim },
                  ]}
                >
                  <Ionicons name="checkmark-circle" size={22} color="#4CAF50" />
                </Animated.View>
              </View>

              <View style={{ height: 40 }} />

              {/* ── Continue Button ────────────────────────── */}
              {/* Scale animation wraps the whole button */}
              <Animated.View style={{ transform: [{ scale: continueScale }] }}>
                <Pressable
                  onPress={onContinuePress}
                  android_ripple={{
                    color: "rgba(255,255,255,0.2)",
                    borderless: false,
                  }}
                >
                  <LinearGradient
                    colors={["#3B6CF2", "#5D5FEF", "#7B4DFF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.primaryButton}
                  >
                    <Text style={styles.primaryButtonText}>Continue</Text>
                    {/* Small arrow icon for a polished feel */}
                    <Ionicons
                      name="arrow-forward"
                      size={18}
                      color="#fff"
                      style={{ marginLeft: 8 }}
                    />
                  </LinearGradient>
                </Pressable>
              </Animated.View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AnimatedScreen>
  );
}

// ─── Styles (original preserved, small additions marked with ← NEW) ──────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a3a",
  },
  header: {
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  headerTitle: {
    fontFamily: "Cairo_500Medium",
    fontSize: 40,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
    width: 119,
    height: 22,
    lineHeight: 22,
  },
  imageContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  carImage: {
    width: width * 0.8,
    height: 150,
  },
  mainScroll: {
    flexGrow: 1,
  },
  formContainer: {
    backgroundColor: "#D9D9D9",
    borderTopLeftRadius: 56,
    borderTopRightRadius: 56,
    minHeight: Dimensions.get("window").height - 100 - 200 - 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  scrollContent: {
    paddingHorizontal: 32,
    paddingVertical: 32,
    alignItems: "center",
  },
  formTitle: {
    fontFamily: "Cairo_500Medium",
    fontSize: 24,
    color: "#333",
    marginBottom: 20,
  },
  label: {
    fontFamily: "Cairo_500Medium",
    fontSize: 16,
    color: "#666",
    alignSelf: "center",
    marginBottom: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 24,
    width: 296,
    justifyContent: "center",
    alignSelf: "center",
  },
  toggleButton: {
    flex: 1,
    height: 44,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // ← NEW: clips the glow effect inside the border
  },
  activeToggle: {
    backgroundColor: "#004080",
    // ← NEW: subtle shadow to lift the active button
    shadowColor: "#004080",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  inactiveToggle: {
    backgroundColor: "#fff",
  },
  // ← NEW: soft inner glow overlay on the active toggle
  activeGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
  },
  activeText: {
    color: "#fff", // ← FIXED: white text on dark button (was #000)
    fontFamily: "Cairo_500Medium",
    fontSize: 16,
  },
  inactiveText: {
    color: "#333",
    fontFamily: "Cairo_500Medium",
    fontSize: 16,
  },
  toggleText: {
    fontFamily: "Cairo_500Medium",
    fontSize: 16,
  },
  plateContainer: {
    flexDirection: "row",
    width: 296,
    alignSelf: "center",
    // ← NEW: subtle border that glows when focused
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 10,
    overflow: "hidden",
  },
  // ← NEW: focused state — blue border ring
  plateContainerFocused: {
    borderColor: "#4285F4",
    shadowColor: "#4285F4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  countryCode: {
    backgroundColor: "#4285F4",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    width: 80,
    height: 44,
  },
  countryCodeText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Cairo_500Medium",
  },
  plateInput: {
    flex: 1,
    backgroundColor: "#fff",
    height: 44,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Cairo_500Medium",
    color: "#333",
    outlineStyle: "none",
  } as any,
  plateWrapper: {
    width: 296,
    alignSelf: "center",
    position: "relative",
    justifyContent: "center",
  },
  // ← NEW: absolute positioned icon wrapper for the animated checkmark
  inputIconWrapper: {
    position: "absolute",
    right: -30, // sits just outside the input on the right
  },
  primaryButton: {
    borderRadius: 25,
    width: 230,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row", // ← NEW: row so the arrow icon sits next to text
    shadowColor: "#5D5FEF",
    shadowOffset: { width: 0, height: 6 }, // ← NEW: deeper colored shadow
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Cairo_500Medium",
  },
});
