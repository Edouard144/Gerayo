import { Cairo_500Medium, useFonts } from "@expo-google-fonts/cairo";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({ Cairo_500Medium });

  // --- Animation values ---
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(-30)).current; // slides from above

  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleY = useRef(new Animated.Value(-20)).current;

  const carOpacity = useRef(new Animated.Value(0)).current;
  const carY = useRef(new Animated.Value(40)).current; // slides from below

  const btn1Opacity = useRef(new Animated.Value(0)).current;
  const btn1Y = useRef(new Animated.Value(30)).current;

  const btn2Opacity = useRef(new Animated.Value(0)).current;
  const btn2Y = useRef(new Animated.Value(30)).current;

  // --- Reusable fade + slide helper ---
  const animate = (opacity: Animated.Value, translateY: Animated.Value) =>
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]);

  useEffect(() => {
    if (!fontsLoaded) return;

    // Stagger: each element starts 130ms after the previous one
    Animated.stagger(130, [
      animate(titleOpacity, titleY), // 1st — title
      animate(subtitleOpacity, subtitleY), // 2nd — subtitle
      animate(carOpacity, carY), // 3rd — car image
      animate(btn1Opacity, btn1Y), // 4th — GET STARTED button
      animate(btn2Opacity, btn2Y), // 5th — ALREADY HAVE AN ACCOUNT button
    ]).start();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1a1a2e",
        }}
      >
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["#1A1458", "#054B8D"]}
        locations={[0.68, 1]}
        style={styles.background}
      />

      <View style={styles.contentContainer}>
        {/* Header — slides down from top */}
        <Animated.View
          style={[
            styles.header,
            { opacity: titleOpacity, transform: [{ translateY: titleY }] },
          ]}
        >
          <Text style={styles.title}>Gerayo</Text>
          <Animated.Text
            style={[
              styles.subtitle,
              {
                opacity: subtitleOpacity,
                transform: [{ translateY: subtitleY }],
              },
            ]}
          >
            Gerayo Amahoro
          </Animated.Text>
        </Animated.View>

        {/* Car Image — slides up from below */}
        <Animated.View
          style={[
            styles.imageContainer,
            { opacity: carOpacity, transform: [{ translateY: carY }] },
          ]}
        >
          <Image
            source={require("../../assets/images/car-welcome.png")}
            style={styles.carImage}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Buttons — slide up one after the other */}
        <View style={styles.buttonContainer}>
          {/* GET STARTED */}
          <Animated.View
            style={{ opacity: btn1Opacity, transform: [{ translateY: btn1Y }] }}
          >
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push("/(auth)/register")}
            >
              <Text style={styles.primaryButtonText}>GET STARTED</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* ALREADY HAVE AN ACCOUNT */}
          <Animated.View
            style={{ opacity: btn2Opacity, transform: [{ translateY: btn2Y }] }}
          >
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push("/(auth)/login")}
            >
              <Text style={styles.secondaryButtonText}>
                ALREADY HAVE AN ACCOUNT
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 80,
    paddingBottom: 2,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontFamily: "Cairo_500Medium",
    fontSize: 40,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
    width: 119,
    height: 22,
    lineHeight: 22,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Cairo_500Medium",
    fontSize: 18,
    color: "#a0a0a0",
    marginTop: 5,
    textAlign: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carImage: {
    width: 277.47,
    height: 152.46,
  },
  buttonContainer: {
    gap: 15,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: "#0056b3",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#0056b3",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
