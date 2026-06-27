import {
  Cairo_500Medium,
  Cairo_700Bold,
  useFonts,
} from "@expo-google-fonts/cairo";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { AnimatedScreen } from "../../components/AnimatedScreen";
import { HapticButton } from "../../components/HapticButton";

export default function VerifyCodeScreen() {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const router = useRouter();
  const [fontsLoaded] = useFonts({ Cairo_500Medium, Cairo_700Bold });

  const [code, setCode] = useState(["", "", "", ""]);
  const [scrolled, setScrolled] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const activeIndex = code.indexOf("");

  const entranceAnim = useRef(new Animated.Value(0)).current;
  const digitAnims = useRef(
    [0, 1, 2, 3].map(() => new Animated.Value(0)),
  ).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.stagger(80, [
      ...digitAnims.map((anim) =>
        Animated.spring(anim, {
          toValue: 1,
          friction: 5,
          tension: 80,
          useNativeDriver: true,
        })
      ),
    ]).start();
  }, []);

  const h = (size: number) => (size / 812) * screenHeight;
  const w = (size: number) => (size / 375) * screenWidth;
  const moderateScale = (size: number, factor = 0.5) =>
    size + (h(size) - size) * factor;

  const handleKeyPress = (key: string) => {
    if (key === "backspace") {
      setCode((prev) => {
        const newCode = [...prev];
        const lastIndex = newCode
          .map((val, i) => (val !== "" ? i : -1))
          .filter((i) => i !== -1)
          .pop();
        if (lastIndex !== undefined) {
          newCode[lastIndex] = "";
          Animated.sequence([
            Animated.timing(digitAnims[lastIndex], {
              toValue: 0.7,
              duration: 60,
              useNativeDriver: true,
            }),
            Animated.spring(digitAnims[lastIndex], {
              toValue: 1,
              friction: 4,
              useNativeDriver: true,
            }),
          ]).start();
        }
        return newCode;
      });
    } else {
      setCode((prev) => {
        const newCode = [...prev];
        const firstEmptyIndex = newCode.indexOf("");
        if (firstEmptyIndex !== -1) {
          newCode[firstEmptyIndex] = key;
          Animated.sequence([
            Animated.timing(digitAnims[firstEmptyIndex], {
              toValue: 1.15,
              duration: 80,
              useNativeDriver: true,
            }),
            Animated.spring(digitAnims[firstEmptyIndex], {
              toValue: 1,
              friction: 3,
              tension: 120,
              useNativeDriver: true,
            }),
          ]).start();
        }
        return newCode;
      });
    }
  };

  const handleContinue = () => {
    if (!code.every((digit) => digit !== "")) {
      setErrorMsg("Please enter the full 4-digit code.");
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 8, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -8, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 5, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -5, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 30, useNativeDriver: true }),
      ]).start();
      return;
    }
    setErrorMsg("");
    router.replace("/(tabs)");
  };

  if (!fontsLoaded)
    return <View style={{ flex: 1, backgroundColor: "#1a1a3a" }} />;

  const handleScroll = (e: any) =>
    setScrolled(e.nativeEvent.contentOffset.y > 10);

  const Key = ({
    value,
    label,
    onPress,
  }: {
    value: string;
    label?: string;
    onPress: () => void;
  }) => {
    const keyScale = useRef(new Animated.Value(1)).current;
    return (
      <HapticButton
        style={[styles.key, { height: h(56) }]}
        onPress={() => {
          Animated.sequence([
            Animated.timing(keyScale, {
              toValue: 0.9,
              duration: 50,
              useNativeDriver: true,
            }),
            Animated.spring(keyScale, {
              toValue: 1,
              friction: 3,
              useNativeDriver: true,
            }),
          ]).start();
          onPress();
        }}
      >
        <Animated.Text
          style={[styles.keyText, { fontSize: moderateScale(22), transform: [{ scale: keyScale }] }]}
        >
          {label || value}
        </Animated.Text>
      </HapticButton>
    );
  };

  const dynamicStyles = {
    formContainer: {
      borderTopLeftRadius: scrolled ? 0 : h(56),
      borderTopRightRadius: scrolled ? 0 : h(56),
    },
    headerText: {
      fontSize: moderateScale(40),
      height: moderateScale(30),
      lineHeight: moderateScale(30),
    },
  };

  return (
    <LinearGradient
      colors={["#1A1458", "#054B8D"]}
      locations={[0.68, 1]}
      style={styles.container}
    >
      <AnimatedScreen>
        <StatusBar style="light" />

        <View style={[styles.header, { top: h(30) }]}>
          <Text style={[styles.headerTitle, dynamicStyles.headerText]}>
            Gerayo
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.mainScroll, { paddingTop: h(80) }]}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          bounces={false}
        >
          <View style={[styles.formContainer, dynamicStyles.formContainer]}>
            <View
              style={[
                styles.scrollContent,
                { paddingTop: h(28), paddingBottom: h(16) },
              ]}
            >
              <Text
                style={[
                  styles.formTitle,
                  { fontSize: moderateScale(22), marginBottom: h(8) },
                ]}
              >
                Enter Verification Code
              </Text>

              <Text
                style={[
                  styles.description,
                  { fontSize: moderateScale(13), marginBottom: h(28) },
                ]}
              >
                We have sent a code to: +250 7XX XXX XXX
              </Text>

              <Animated.View
                style={[
                  styles.codeDisplayContainer,
                  { transform: [{ translateX: shakeAnim }] },
                ]}
              >
                {code.map((digit, index) => (
                  <Animated.View
                    key={index}
                    style={[
                      styles.digitContainer,
                      {
                        width: h(58),
                        height: h(58),
                        borderColor:
                          activeIndex === index
                            ? "#1877F2"
                            : digit
                            ? "#0056b3"
                            : "#CDD1D4",
                        borderWidth: activeIndex === index ? 2 : 1,
                        transform: [{ scale: digitAnims[index] }],
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.digitText,
                        { fontSize: moderateScale(24) },
                      ]}
                    >
                      {digit}
                    </Text>
                    {activeIndex === index && (
                      <View style={styles.cursor} />
                    )}
                  </Animated.View>
                ))}
              </Animated.View>

              {errorMsg ? (
                <Text
                  style={[
                    styles.errorText,
                    { fontSize: moderateScale(12), marginBottom: h(16) },
                  ]}
                >
                  {errorMsg}
                </Text>
              ) : null}

              <HapticButton
                style={[
                  styles.continueButton,
                  { height: h(46), width: w(260), marginBottom: h(16) },
                ]}
                onPress={handleContinue}
              >
                <Text
                  style={[
                    styles.continueButtonText,
                    { fontSize: moderateScale(16) },
                  ]}
                >
                  Continue
                </Text>
              </HapticButton>

              <HapticButton
                style={{ marginBottom: h(8) }}
                onPress={() => {}}
              >
                <Text
                  style={[
                    styles.resendText,
                    { fontSize: moderateScale(14) },
                  ]}
                >
                  Resend Code
                </Text>
              </HapticButton>
            </View>
          </View>

          <View style={[styles.keypadCard, { height: h(280) }]}>
            <View style={[styles.keypadContainer, { paddingHorizontal: w(24) }]}>
              <View style={styles.keyRow}>
                <Key value="1" onPress={() => handleKeyPress("1")} />
                <Key value="2" onPress={() => handleKeyPress("2")} />
                <Key value="3" onPress={() => handleKeyPress("3")} />
              </View>
              <View style={styles.keyRow}>
                <Key value="4" onPress={() => handleKeyPress("4")} />
                <Key value="5" onPress={() => handleKeyPress("5")} />
                <Key value="6" onPress={() => handleKeyPress("6")} />
              </View>
              <View style={styles.keyRow}>
                <Key value="7" onPress={() => handleKeyPress("7")} />
                <Key value="8" onPress={() => handleKeyPress("8")} />
                <Key value="9" onPress={() => handleKeyPress("9")} />
              </View>
              <View style={styles.keyRow}>
                <View style={{ flex: 1 }} />
                <Key value="0" onPress={() => handleKeyPress("0")} />
                <HapticButton
                  style={[styles.backspaceKey, { height: h(56) }]}
                  onPress={() => handleKeyPress("backspace")}
                >
                  <Ionicons
                    name="backspace-outline"
                    size={moderateScale(26)}
                    color="#666"
                  />
                </HapticButton>
              </View>
            </View>
          </View>
        </ScrollView>
      </AnimatedScreen>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  headerTitle: {
    fontFamily: "Cairo_500Medium",
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
  },
  mainScroll: { flexGrow: 1, justifyContent: "flex-end" },
  formContainer: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
  },
  scrollContent: { paddingHorizontal: 32, alignItems: "center" },
  formTitle: {
    fontFamily: "Cairo_700Bold",
    color: "#1A1A2E",
    textAlign: "center",
  },
  description: {
    fontFamily: "Cairo_500Medium",
    color: "#666",
    textAlign: "center",
    lineHeight: 18,
  },

  codeDisplayContainer: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 16,
  },
  digitContainer: {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F6F7",
  },
  digitText: {
    fontFamily: "Cairo_700Bold",
    color: "#1A1A2E",
  },
  cursor: {
    position: "absolute",
    bottom: 10,
    width: 20,
    height: 2,
    borderRadius: 1,
    backgroundColor: "#1877F2",
  },
  errorText: {
    fontFamily: "Cairo_500Medium",
    color: "#FA3E3E",
    textAlign: "center",
  },

  continueButton: {
    backgroundColor: "#1877F2",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#1877F2",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 6,
  },
  continueButtonText: { color: "#fff", fontFamily: "Cairo_700Bold" },

  resendText: {
    color: "#0056b3",
    fontFamily: "Cairo_700Bold",
    textDecorationLine: "underline",
  },

  keypadCard: {
    backgroundColor: "#F5F6F7",
    marginTop: 0,
    justifyContent: "center",
  },
  keypadContainer: { gap: 10 },
  keyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  key: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  keyText: {
    fontFamily: "Cairo_700Bold",
    color: "#1A1A2E",
  },
  backspaceKey: {
    flex: 1,
    marginHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});
