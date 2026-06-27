import { Cairo_500Medium, Cairo_700Bold, useFonts } from "@expo-google-fonts/cairo";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function AnimatedButton({ children, onPress, style }: {
  children: React.ReactNode; onPress: () => void; style?: any;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, friction: 3, tension: 100, useNativeDriver: true }).start();
  };
  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

function FloatingCircle({ size, color, top, left, delay }: {
  size: number; color: string; top: number; left: number; delay: number;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 1200, delay, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, delay, friction: 4, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.08, duration: 2400, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 2400, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        top,
        left,
        opacity,
        transform: [{ scale }],
      }}
    />
  );
}

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({ Cairo_500Medium, Cairo_700Bold });

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(-40)).current;
  const titleScale = useRef(new Animated.Value(0.8)).current;

  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineY = useRef(new Animated.Value(-20)).current;

  const carOpacity = useRef(new Animated.Value(0)).current;
  const carY = useRef(new Animated.Value(50)).current;
  const carScale = useRef(new Animated.Value(0.85)).current;

  const btn1Opacity = useRef(new Animated.Value(0)).current;
  const btn1Y = useRef(new Animated.Value(40)).current;

  const btn2Opacity = useRef(new Animated.Value(0)).current;
  const btn2Y = useRef(new Animated.Value(40)).current;

  const footerOpacity = useRef(new Animated.Value(0)).current;

  const animateIn = (opacity: Animated.Value, translateY: Animated.Value, scale?: Animated.Value, delay: number = 0) =>
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 700, delay, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 700, delay, useNativeDriver: true }),
      ...(scale
        ? [Animated.spring(scale, { toValue: 1, delay, friction: 5, useNativeDriver: true })]
        : []),
    ]);

  useEffect(() => {
    if (!fontsLoaded) return;
    Animated.sequence([
      Animated.stagger(150, [
        animateIn(titleOpacity, titleY, titleScale, 0),
        animateIn(taglineOpacity, taglineY, undefined, 0),
        animateIn(carOpacity, carY, carScale, 0),
      ]),
      Animated.stagger(120, [
        animateIn(btn1Opacity, btn1Y, undefined, 0),
        animateIn(btn2Opacity, btn2Y, undefined, 0),
        Animated.timing(footerOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
    ]).start();
  }, [fontsLoaded]);

  useEffect(() => {
    if (!fontsLoaded) return;
    Animated.loop(
      Animated.sequence([
        Animated.timing(carY, { toValue: -8, duration: 2200, useNativeDriver: true }),
        Animated.timing(carY, { toValue: 8, duration: 2200, useNativeDriver: true }),
      ])
    ).start();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <LinearGradient
        colors={["#0B0D2E", "#1A1458", "#12305C", "#0A6EBD"]}
        locations={[0, 0.35, 0.65, 1]}
        style={styles.background}
      />

      <FloatingCircle size={180} color="rgba(99, 102, 241, 0.08)" top={60} left={-40} delay={200} />
      <FloatingCircle size={120} color="rgba(59, 130, 246, 0.07)" top={180} left={280} delay={500} />
      <FloatingCircle size={90} color="rgba(139, 92, 246, 0.06)" top={400} left={30} delay={800} />
      <FloatingCircle size={60} color="rgba(59, 130, 246, 0.09)" top={320} left={320} delay={1100} />
      <FloatingCircle size={140} color="rgba(99, 102, 241, 0.05)" top={550} left={260} delay={400} />

      <View style={[styles.contentContainer, { paddingTop: insets.top + 50, paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.topSection}>
          <Animated.View
            style={[
              styles.header,
              {
                opacity: titleOpacity,
                transform: [{ translateY: titleY }, { scale: titleScale }],
              },
            ]}
          >
            <Text style={styles.title}>Welcome</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.taglineContainer,
              { opacity: taglineOpacity, transform: [{ translateY: taglineY }] },
            ]}
          >
            <Text style={styles.tagline}>to Gerayo Amahoro</Text>
            <View style={styles.taglineDivider} />
            <Text style={styles.subtitle}>Your road safety companion</Text>
          </Animated.View>
        </View>

        <Animated.View
          style={[
            styles.imageSection,
            {
              opacity: carOpacity,
              transform: [{ translateY: carY }, { scale: carScale }],
            },
          ]}
        >
          <View style={styles.carGlow} />
          <Image
            source={require("../../assets/images/car-welcome.png")}
            style={styles.carImage}
            resizeMode="contain"
          />
        </Animated.View>

        <View style={styles.bottomSection}>
          <Animated.View style={{ opacity: btn1Opacity, transform: [{ translateY: btn1Y }] }}>
            <AnimatedButton onPress={() => router.push("/(auth)/register")}>
              <LinearGradient
                colors={["#3B82F6", "#6366F1"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.primaryButton}
              >
                <Ionicons name="person-add" size={20} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>Get Started</Text>
                <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.7)" />
              </LinearGradient>
            </AnimatedButton>
          </Animated.View>

          <Animated.View style={{ opacity: btn2Opacity, transform: [{ translateY: btn2Y }] }}>
            <AnimatedButton onPress={() => router.push("/(auth)/login")}>
              <View style={styles.secondaryButton}>
                <Ionicons name="log-in" size={18} color="rgba(255,255,255,0.8)" />
                <Text style={styles.secondaryButtonText}>Already have an account</Text>
                <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.35)" />
              </View>
            </AnimatedButton>
          </Animated.View>

          <Animated.View style={[styles.footer, { opacity: footerOpacity }]}>
            <Text style={styles.footerText}>
              Gerayo Amahoro — Drive safe, arrive safe
            </Text>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B0D2E",
  },
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
    paddingHorizontal: 24,
  },
  topSection: {
    alignItems: "center",
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontFamily: "Cairo_700Bold",
    fontSize: 52,
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 2,
    textShadowColor: "rgba(99, 102, 241, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  taglineContainer: {
    alignItems: "center",
    marginTop: 12,
    gap: 8,
  },
  tagline: {
    fontFamily: "Cairo_500Medium",
    fontSize: 22,
    color: "rgba(255, 255, 255, 0.9)",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  taglineDivider: {
    width: 40,
    height: 2,
    borderRadius: 1,
    backgroundColor: "rgba(99, 102, 241, 0.6)",
  },
  subtitle: {
    fontFamily: "Cairo_500Medium",
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.5)",
    letterSpacing: 0.5,
  },
  imageSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carGlow: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(99, 102, 241, 0.15)",
    top: "50%",
    left: "50%",
    marginTop: -100,
    marginLeft: -100,
  },
  carImage: {
    width: 300,
    height: 165,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },
  bottomSection: {
    gap: 12,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    gap: 10,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    fontFamily: "Cairo_700Bold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    gap: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  secondaryButtonText: {
    fontFamily: "Cairo_700Bold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  footer: {
    alignItems: "center",
    paddingTop: 10,
  },
  footerText: {
    fontFamily: "Cairo_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.3)",
    letterSpacing: 0.5,
  },
});
