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
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { AnimatedScreen } from "../../components/AnimatedScreen";
import { HapticButton } from "../../components/HapticButton";

interface FBFieldProps {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
  hasError: boolean;
  errorText?: string;
  keyboardType?: any;
  maxLength?: number;
  returnKeyType?: "next" | "done";
  onSubmitEditing?: () => void;
  inputRef?: React.RefObject<TextInput>;
  prefix?: React.ReactNode;
  entranceDelay?: number;
  h: (n: number) => number;
  moderateScale: (n: number, f?: number) => number;
}

function FBField({
  label,
  value,
  onChangeText,
  onFocus,
  onBlur,
  isFocused,
  hasError,
  errorText,
  keyboardType,
  maxLength,
  returnKeyType = "next",
  onSubmitEditing,
  inputRef,
  prefix,
  entranceDelay = 0,
  h,
  moderateScale,
}: FBFieldProps) {
  const labelAnim = useRef(
    new Animated.Value(value.length > 0 ? 1 : 0),
  ).current;
  const borderAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const entranceAnim = useRef(new Animated.Value(0)).current;
  const prevError = useRef("");
  const hasValue = value.length > 0;

  React.useEffect(() => {
    Animated.timing(entranceAnim, {
      toValue: 1,
      duration: 340,
      delay: entranceDelay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, []);

  React.useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || hasValue ? 1 : 0,
      duration: 160,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [isFocused, hasValue]);

  React.useEffect(() => {
    const to = hasError ? 2 : isFocused ? 1 : 0;
    Animated.timing(borderAnim, {
      toValue: to,
      duration: 180,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [isFocused, hasError]);

  React.useEffect(() => {
    if (hasError && errorText && errorText !== prevError.current) {
      prevError.current = errorText;
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 6, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -6, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 4, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -4, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 30, useNativeDriver: true }),
      ]).start();
    }
    if (!hasError) prevError.current = "";
  }, [hasError, errorText]);

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ["#CDD1D4", "#1877F2", "#FA3E3E"],
  });
  const labelTop = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [h(15), h(5)],
  });
  const labelSize = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [moderateScale(15), moderateScale(11)],
  });
  const labelColor = borderAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ["#90949C", "#1877F2", "#FA3E3E"],
  });
  const entranceY = entranceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 0],
  });

  return (
    <Animated.View
      style={{ opacity: entranceAnim, transform: [{ translateY: entranceY }] }}
    >
      <Animated.View
        style={[
          styles.fbField,
          {
            borderColor,
            height: h(52),
            transform: [{ translateX: shakeAnim }],
          },
        ]}
      >
        {prefix && <View style={{ height: h(52) }}>{prefix}</View>}

        <View style={styles.fbFieldInner}>
          {!prefix && (
            <Animated.Text
              style={[
                styles.fbLabel,
                { top: labelTop, fontSize: labelSize, color: labelColor },
              ]}
              pointerEvents="none"
            >
              {label}
            </Animated.Text>
          )}
          {prefix && (
            <Text
              style={[styles.fbLabelStatic, { fontSize: moderateScale(11) }]}
            >
              {label}
            </Text>
          )}
          <TextInput
            ref={inputRef}
            style={[
              styles.fbInput,
              {
                fontSize: moderateScale(16),
                paddingTop: prefix ? h(4) : h(22),
                paddingBottom: h(6),
              },
            ]}
            value={value}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder=""
            placeholderTextColor="transparent"
            keyboardType={keyboardType}
            maxLength={maxLength}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            selectionColor="#1877F2"
            cursorColor="#1877F2"
          />
        </View>
      </Animated.View>

      {hasError && errorText ? (
        <Text style={[styles.fbErrorText, { fontSize: moderateScale(12) }]}>
          {errorText}
        </Text>
      ) : null}
    </Animated.View>
  );
}

export default function VerifyPhoneScreen() {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const router = useRouter();
  const [fontsLoaded] = useFonts({ Cairo_500Medium, Cairo_700Bold });

  const [scrolled, setScrolled] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  const buttonScale = useRef(new Animated.Value(1)).current;

  const validatePhone = (v: string) =>
    v.length > 0 && !/^07\d{8}$/.test(v)
      ? "Enter a valid Rwanda mobile number"
      : "";

  const isPhoneValid = /^07\d{8}$/.test(phone);

  const h = (size: number) => (size / 812) * screenHeight;
  const w = (size: number) => (size / 375) * screenWidth;
  const moderateScale = (size: number, factor = 0.5) =>
    size + (h(size) - size) * factor;

  if (!fontsLoaded)
    return <View style={{ flex: 1, backgroundColor: "#1a1a3a" }} />;

  const handleScroll = (e: any) =>
    setScrolled(e.nativeEvent.contentOffset.y > 10);

  const handleContinue = () => {
    setTouched(true);
    const err = validatePhone(phone);
    setError(err);
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 220,
        friction: 6,
      }),
    ]).start(() => {
      if (!err) router.push("/(auth)/verify-code");
    });
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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <StatusBar style="light" />

          <View style={[styles.header, { top: h(30) }]}>
            <Text style={[styles.headerTitle, dynamicStyles.headerText]}>
              Gerayo
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.mainScroll, { paddingTop: h(100) }]}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            bounces={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
          >
            <View style={[styles.formContainer, dynamicStyles.formContainer]}>
              <View
                style={[
                  styles.scrollContent,
                  { paddingTop: h(24), paddingBottom: h(20) },
                ]}
              >
                <Text
                  style={[
                    styles.formTitle,
                    { fontSize: moderateScale(24), marginBottom: h(10) },
                  ]}
                >
                  Verify Phone Number
                </Text>

                <Text
                  style={[
                    styles.description,
                    { fontSize: moderateScale(14), marginBottom: h(24) },
                  ]}
                >
                  We have sent you an SMS with a code to verify your phone
                  number
                </Text>

                <View style={{ gap: h(14) }}>
                  <FBField
                    label="Phone number"
                    value={phone}
                    onChangeText={setPhone}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => {
                      setFocusedField(null);
                      setTouched(true);
                      setError(validatePhone(phone));
                    }}
                    isFocused={focusedField === "phone"}
                    hasError={touched && !!error}
                    errorText={error}
                    keyboardType="phone-pad"
                    maxLength={10}
                    returnKeyType="done"
                    entranceDelay={60}
                    h={h}
                    moderateScale={moderateScale}
                    prefix={
                      <TouchableOpacity
                        style={[
                          styles.countryCode,
                          { height: h(52), width: w(80) },
                        ]}
                        activeOpacity={0.75}
                      >
                        <Text
                          style={[
                            styles.countryCodeText,
                            { fontSize: moderateScale(15) },
                          ]}
                        >
                          RW
                        </Text>
                        <Ionicons
                          name="chevron-down"
                          size={moderateScale(14)}
                          color="#fff"
                        />
                      </TouchableOpacity>
                    }
                  />
                </View>

                <Animated.View
                  style={{
                    transform: [{ scale: buttonScale }],
                    alignSelf: "center",
                    marginTop: h(24),
                  }}
                >
                  <HapticButton
                    style={[
                      styles.primaryButton,
                      { height: h(46), width: w(260) },
                    ]}
                    onPress={handleContinue}
                  >
                    <Text
                      style={[
                        styles.primaryButtonText,
                        { fontSize: moderateScale(16) },
                      ]}
                    >
                      Continue
                    </Text>
                  </HapticButton>
                </Animated.View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  mainScroll: { flexGrow: 1 },
  formContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
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
    lineHeight: 20,
  },

  fbField: {
    width: "100%",
    maxWidth: 296,
    alignSelf: "center",
    backgroundColor: "#F5F6F7",
    borderRadius: 6,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  fbFieldInner: { flex: 1, position: "relative", justifyContent: "center" },
  fbLabel: {
    position: "absolute",
    left: 14,
    fontFamily: "Cairo_500Medium",
    zIndex: 1,
  },
  fbLabelStatic: {
    color: "#90949C",
    fontFamily: "Cairo_500Medium",
    paddingLeft: 12,
    paddingTop: 4,
  },
  fbInput: {
    fontFamily: "Cairo_500Medium",
    color: "#1C1E21",
    paddingHorizontal: 14,
    width: "100%",
  } as any,
  fbErrorText: {
    color: "#FA3E3E",
    fontFamily: "Cairo_500Medium",
    marginTop: 5,
    paddingHorizontal: 2,
    alignSelf: "center",
    width: "100%",
    maxWidth: 296,
  },

  countryCode: {
    backgroundColor: "#0056b3",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  countryCodeText: { color: "#fff", fontFamily: "Cairo_500Medium" },

  primaryButton: {
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
  primaryButtonText: { color: "#fff", fontFamily: "Cairo_700Bold" },
});
