import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
const COLORS = {
  primary: "#007AFF",
  lightWhite: "#FAFAFA",
  white: "#FFFFFF",
  gray: "#808080",
  gray2: "#D3D3D3",
  // ... other color definitions
};

const FONT = {
  regular: "System",
  medium: "System-Medium",
  bold: "System-Bold",
  // ... other font definitions
};

const SIZES = {
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  // ... other size definitions
};

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleResetPassword = () => {
    // Here you would typically call an API to handle the password reset
    // For this example, we'll just show an alert
    if (email) {
      Alert.alert(
        "Password Reset",
        "If an account exists for " +
          email +
          ", you will receive a password reset email shortly.",
        [{ text: "OK", onPress: () => router.back() }]
      );
    } else {
      Alert.alert("Error", "Please enter your email address");
    }
  };

  return (
    <LinearGradient colors={["#006400", "#004d00"]} style={styles.container}>
      <View style={styles.card}>

          <Stack.Screen
            options={{
              headerShadowVisible: false,
              headerTitle: "Forget Password",
            }}
          />

          <Text style={styles.title}>Forgot Your Password?</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you instructions to reset
            your password.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            placeholderTextColor="#fff"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.text}>Reset Password</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backLink}>Back to sign up</Text>
          </TouchableOpacity>
        </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: "#1E2329",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color:"#4CAF50",
    marginBottom: SIZES.small,
  },
  subtitle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color:"#4CAF50",
    marginBottom: SIZES.large,
  },
  input: {
    backgroundColor: '#2C3137',
    color: "#fff", 
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
  },
  backLink: {
    marginTop: SIZES.small,
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    textDecorationLine: "underline",
    textAlign: "center",
  },  
  text:{
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default ForgetPass;
