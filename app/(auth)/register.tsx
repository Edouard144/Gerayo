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
    Image,
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

export default function RegisterScreen() {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const router = useRouter();
  const [fontsLoaded] = useFonts({ Cairo_500Medium, Cairo_700Bold });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const phoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation states
  const [touched, setTouched] = useState({
    fullName: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Strong validation helpers
  const validateFullName = (name: string) =>
    name.length === 0
      ? ""
      : name.length < 3
        ? "Full name must be at least 3 characters"
        : "";
  const validatePhone = (num: string) =>
    num.length === 0
      ? ""
      : !/^07\d{8}$/.test(num)
        ? "Enter valid Rwanda number (e.g. 0781234567)"
        : "";
  const validateEmail = (em: string) =>
    em.length === 0
      ? ""
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)
        ? "Please enter a valid email address"
        : "";
  const validatePassword = (pw: string) => {
    if (pw.length === 0) return "";
    if (pw.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(pw)) return "Must contain 1 uppercase letter";
    if (!/[a-z]/.test(pw)) return "Must contain 1 lowercase letter";
    if (!/\d/.test(pw)) return "Must contain 1 number";
    if (!/[^A-Za-z0-9]/.test(pw))
      return "Must contain 1 special character (!@#$ etc.)";
    return "";
  };
  const validateConfirmPassword = (confirm: string) =>
    confirm.length === 0
      ? ""
      : confirm !== password
        ? "Passwords do not match"
        : "";

  // Handle blur + live error update
  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setFocusedField(null);

    let error = "";
    switch (field) {
      case "fullName":
        error = validateFullName(fullName);
        break;
      case "phone":
        error = validatePhone(phone);
        break;
      case "email":
        error = validateEmail(email);
        break;
      case "password":
        error = validatePassword(password);
        break;
      case "confirmPassword":
        error = validateConfirmPassword(confirmPassword);
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // Auto-update confirm error when password changes
  React.useEffect(() => {
    if (touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(confirmPassword),
      }));
    }
  }, [password, touched.confirmPassword]);

  // Form completely valid?
  const isFormValid =
    fullName.trim().length >= 3 &&
    /^07\d{8}$/.test(phone) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    validatePassword(password) === "" &&
    confirmPassword === password &&
    confirmPassword.length >= 8;

  const h = (size: number) => (size / 812) * screenHeight;
  const w = (size: number) => (size / 375) * screenWidth;
  const moderateScale = (size: number, factor = 0.5) =>
    size + (h(size) - size) * factor;

  if (!fontsLoaded)
    return <View style={{ flex: 1, backgroundColor: "#1a1a3a" }} />;

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    setScrolled(y > 10);
  };

  const getBorderColor = (fieldName: string) => {
    const hasError =
      touched[fieldName as keyof typeof touched] &&
      errors[fieldName as keyof typeof errors];
    if (hasError) return "#E53935";
    if (focusedField === fieldName) return "#0056b3";
    return "#E8E8E8";
  };

  const fieldBorder = (fieldName: string) => ({
    borderWidth: 1.5,
    borderColor: getBorderColor(fieldName),
  });

  const dynamicStyles = {
    formContainer: {
      borderTopLeftRadius: scrolled ? 0 : h(56),
      borderTopRightRadius: scrolled ? 0 : h(56),
      minHeight: screenHeight - h(100),
    },
    headerText: {
      fontSize: moderateScale(40),
      height: moderateScale(30),
      lineHeight: moderateScale(30),
    },
  };

  const handleRegister = () => {
    if (!isFormValid) {
      // Force show all errors
      setTouched({
        fullName: true,
        phone: true,
        email: true,
        password: true,
        confirmPassword: true,
      });
      return;
    }
    router.push("/(auth)/verify-phone");
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
        >
          <StatusBar style="light" />

          {/* Header */}
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
                    { fontSize: moderateScale(24), marginBottom: h(20) },
                  ]}
                >
                  Create Account
                </Text>

                <View style={[styles.inputGroup, { gap: h(12) }]}>
                  {/* Full Name */}
                  <View style={[styles.inputWrapper, fieldBorder("fullName")]}>
                    <TextInput
                      placeholder="Full names"
                      style={[
                        styles.input,
                        { height: h(44), fontSize: moderateScale(16) },
                      ]}
                      placeholderTextColor="#ADADAD"
                      value={fullName}
                      onChangeText={setFullName}
                      returnKeyType="next"
                      onSubmitEditing={() => phoneRef.current?.focus()}
                      onFocus={() => setFocusedField("fullName")}
                      onBlur={() => handleBlur("fullName")}
                      selectionColor="#0056b3"
                      cursorColor="#0056b3"
                    />
                    {fullName.length >= 3 && !errors.fullName && (
                      <Ionicons
                        name="checkmark-circle"
                        size={moderateScale(20)}
                        color="#4CAF50"
                        style={styles.inputIcon}
                      />
                    )}
                  </View>
                  {touched.fullName && errors.fullName ? (
                    <Text style={styles.errorText}>{errors.fullName}</Text>
                  ) : null}

                  {/* Phone */}
                  <View style={[styles.phoneWrapper, fieldBorder("phone")]}>
                    <View style={styles.phoneContainer}>
                      <TouchableOpacity
                        style={[
                          styles.countryCode,
                          { height: h(44), width: w(80) },
                        ]}
                      >
                        <Text
                          style={[
                            styles.countryCodeText,
                            { fontSize: moderateScale(16) },
                          ]}
                        >
                          RW
                        </Text>
                        <Ionicons
                          name="chevron-down"
                          size={moderateScale(16)}
                          color="#fff"
                        />
                      </TouchableOpacity>
                      <TextInput
                        ref={phoneRef}
                        placeholder="Phone number"
                        style={[
                          styles.input,
                          styles.phoneInput,
                          { height: h(44), fontSize: moderateScale(16) },
                        ]}
                        keyboardType="phone-pad"
                        placeholderTextColor="#ADADAD"
                        value={phone}
                        onChangeText={setPhone}
                        returnKeyType="next"
                        onSubmitEditing={() => emailRef.current?.focus()}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => handleBlur("phone")}
                        selectionColor="#0056b3"
                        cursorColor="#0056b3"
                        maxLength={10}
                      />
                    </View>
                    {/^07\d{8}$/.test(phone) && (
                      <Ionicons
                        name="checkmark-circle"
                        size={moderateScale(20)}
                        color="#4CAF50"
                        style={styles.inputIcon}
                      />
                    )}
                  </View>
                  {touched.phone && errors.phone ? (
                    <Text style={styles.errorText}>{errors.phone}</Text>
                  ) : null}

                  {/* Email */}
                  <View style={[styles.inputWrapper, fieldBorder("email")]}>
                    <TextInput
                      ref={emailRef}
                      placeholder="Email"
                      style={[
                        styles.input,
                        { height: h(44), fontSize: moderateScale(16) },
                      ]}
                      keyboardType="email-address"
                      placeholderTextColor="#ADADAD"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                      returnKeyType="next"
                      onSubmitEditing={() => passwordRef.current?.focus()}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => handleBlur("email")}
                      selectionColor="#0056b3"
                      cursorColor="#0056b3"
                    />
                    {validateEmail(email) === "" && email.length > 0 && (
                      <Ionicons
                        name="checkmark-circle"
                        size={moderateScale(20)}
                        color="#4CAF50"
                        style={styles.inputIcon}
                      />
                    )}
                  </View>
                  {touched.email && errors.email ? (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  ) : null}

                  {/* Password */}
                  <View
                    style={[
                      styles.passwordContainer,
                      { height: h(44) },
                      fieldBorder("password"),
                    ]}
                  >
                    <TextInput
                      ref={passwordRef}
                      placeholder="Password"
                      style={[
                        styles.passwordInput,
                        { fontSize: moderateScale(16) },
                      ]}
                      secureTextEntry={!showPassword}
                      placeholderTextColor="#ADADAD"
                      value={password}
                      onChangeText={setPassword}
                      returnKeyType="next"
                      onSubmitEditing={() =>
                        confirmPasswordRef.current?.focus()
                      }
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => handleBlur("password")}
                      selectionColor="#0056b3"
                      cursorColor="#0056b3"
                    />
                    <View style={styles.passwordActions}>
                      {validatePassword(password) === "" &&
                        password.length > 0 && (
                          <Ionicons
                            name="checkmark-circle"
                            size={moderateScale(20)}
                            color="#4CAF50"
                            style={{ marginRight: 8 }}
                          />
                        )}
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Image
                          source={require("../../assets/images/Group 547.png")}
                          style={{
                            width: w(15),
                            height: h(7.5),
                            tintColor: "#7F7F7F",
                          }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {touched.password && errors.password ? (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  ) : null}

                  {/* Confirm Password */}
                  <View
                    style={[
                      styles.passwordContainer,
                      { height: h(44) },
                      fieldBorder("confirmPassword"),
                    ]}
                  >
                    <TextInput
                      ref={confirmPasswordRef}
                      placeholder="Confirm Password"
                      style={[
                        styles.passwordInput,
                        { fontSize: moderateScale(16) },
                      ]}
                      secureTextEntry={!showConfirmPassword}
                      placeholderTextColor="#ADADAD"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      returnKeyType="done"
                      onFocus={() => setFocusedField("confirmPassword")}
                      onBlur={() => handleBlur("confirmPassword")}
                      selectionColor="#0056b3"
                      cursorColor="#0056b3"
                    />
                    <View style={styles.passwordActions}>
                      {confirmPassword === password &&
                        confirmPassword.length > 0 && (
                          <Ionicons
                            name="checkmark-circle"
                            size={moderateScale(20)}
                            color="#4CAF50"
                            style={{ marginRight: 8 }}
                          />
                        )}
                      <TouchableOpacity
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        <Image
                          source={require("../../assets/images/Group 547.png")}
                          style={{
                            width: w(15),
                            height: h(7.5),
                            tintColor: "#7F7F7F",
                          }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {touched.confirmPassword && errors.confirmPassword ? (
                    <Text style={styles.errorText}>
                      {errors.confirmPassword}
                    </Text>
                  ) : null}
                </View>

                {/* Remember Me + Forgot Password */}
                <View
                  style={[
                    styles.optionsRow,
                    { marginTop: h(12), marginBottom: h(20) },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.rememberMe}
                    onPress={() => setRememberMe(!rememberMe)}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        { width: moderateScale(18), height: moderateScale(18) },
                        rememberMe && styles.checkboxChecked,
                      ]}
                    >
                      {rememberMe && (
                        <Ionicons
                          name="checkmark"
                          size={moderateScale(12)}
                          color="#fff"
                        />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.optionText,
                        { fontSize: moderateScale(14) },
                      ]}
                    >
                      Remember Me
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Text
                      style={[
                        styles.forgotPassword,
                        { fontSize: moderateScale(14) },
                      ]}
                    >
                      Forgot Password
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Create Account Button */}
                <HapticButton
                  style={[
                    styles.primaryButton,
                    {
                      height: h(46),
                      width: w(138),
                      marginBottom: h(20),
                      opacity: isFormValid ? 1 : 0.65,
                    },
                  ]}
                  onPress={handleRegister}
                  disabled={!isFormValid}
                >
                  <Text
                    style={[
                      styles.primaryButtonText,
                      { fontSize: moderateScale(16) },
                    ]}
                  >
                    Create Account
                  </Text>
                </HapticButton>

                {/* Divider */}
                <View
                  style={[styles.dividerContainer, { marginBottom: h(12) }]}
                >
                  <Text
                    style={[
                      styles.dividerText,
                      { fontSize: moderateScale(20) },
                    ]}
                  >
                    Continue with
                  </Text>
                </View>

                {/* Social buttons */}
                <View
                  style={[
                    styles.socialContainer,
                    { gap: w(20), marginBottom: h(24) },
                  ]}
                >
                  <HapticButton
                    style={[
                      styles.socialButton,
                      { width: h(44), height: h(44), borderRadius: h(22) },
                    ]}
                  >
                    <Ionicons
                      name="logo-google"
                      size={moderateScale(20)}
                      color="#FFF"
                    />
                  </HapticButton>
                  <HapticButton
                    style={[
                      styles.socialButton,
                      { width: h(44), height: h(44), borderRadius: h(22) },
                    ]}
                  >
                    <Ionicons
                      name="logo-apple"
                      size={moderateScale(20)}
                      color="#FFF"
                    />
                  </HapticButton>
                </View>

                {/* Login link */}
                <View style={styles.loginContainer}>
                  <Text
                    style={[styles.loginText, { fontSize: moderateScale(14) }]}
                  >
                    Already have an account?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => router.push("/(auth)/login")}
                  >
                    <Text
                      style={[
                        styles.loginLink,
                        { fontSize: moderateScale(14) },
                      ]}
                    >
                      Login.
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </AnimatedScreen>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // === ALL YOUR ORIGINAL STYLES (unchanged) ===
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
  scrollContent: { paddingHorizontal: 32 },
  formTitle: {
    fontFamily: "Cairo_700Bold",
    color: "#1A1A2E",
    textAlign: "center",
  },
  inputGroup: {},
  input: {
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontFamily: "Cairo_500Medium",
    color: "#1A1A2E",
    width: "100%",
    maxWidth: 296,
    alignSelf: "center",
  } as any,
  inputWrapper: {
    width: "100%",
    maxWidth: 296,
    alignSelf: "center",
    position: "relative",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    overflow: "hidden",
  },
  phoneWrapper: {
    width: "100%",
    maxWidth: 296,
    alignSelf: "center",
    position: "relative",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    overflow: "hidden",
  },
  inputIcon: { position: "absolute", right: 12 },
  passwordActions: { flexDirection: "row", alignItems: "center" },
  phoneContainer: {
    flexDirection: "row",
    width: "100%",
    maxWidth: 296,
    alignSelf: "center",
  },
  countryCode: {
    backgroundColor: "#0056b3",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  countryCodeText: {
    color: "#fff",
    fontFamily: "Cairo_500Medium",
  },
  phoneInput: {
    flex: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  passwordContainer: {
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 296,
    alignSelf: "center",
  } as any,
  passwordInput: {
    flex: 1,
    fontFamily: "Cairo_500Medium",
    color: "#1A1A2E",
    marginRight: 10,
  } as any,
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: 296,
    alignSelf: "center",
  },
  rememberMe: { flexDirection: "row", alignItems: "center", gap: 8 },
  checkbox: {
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#0056b3",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: { backgroundColor: "#0056b3" },
  optionText: { color: "#888", fontFamily: "Cairo_500Medium" },
  forgotPassword: { color: "#0056b3", fontFamily: "Cairo_700Bold" },
  primaryButton: {
    backgroundColor: "#0056b3",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#0056b3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: "#fff",
    fontFamily: "Cairo_700Bold",
  },
  dividerContainer: { alignItems: "center" },
  dividerText: { color: "#ADADAD", fontFamily: "Cairo_500Medium" },
  socialContainer: { flexDirection: "row", justifyContent: "center" },
  socialButton: {
    backgroundColor: "#0056b3",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0056b3",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: { color: "#ADADAD", fontFamily: "Cairo_500Medium" },
  loginLink: { color: "#0056b3", fontFamily: "Cairo_700Bold" },

  // === NEW VALIDATION STYLE ===
  errorText: {
    color: "#E53935",
    fontSize: 13,
    fontFamily: "Cairo_500Medium",
    marginTop: 4,
    paddingHorizontal: 8,
    alignSelf: "center",
    width: "100%",
    maxWidth: 296,
  },
});
