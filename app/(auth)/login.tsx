import ScreenWrapper from "@/components/ScreenWrapper";
// eslint-disable-next-line import/no-unresolved
import { supabase } from "@/lib/supabase";
import { theme } from "@/theme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Onboarding = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  async function signwithemail() {
    if (!email || !password) {
      Alert.alert("Missing Something", "Fill all credentials");
    }
    setloading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      Alert.alert("login failed", "try again later");
      console.log("signin error:", error.message);
      return;
    }
    if (data.session) {
      setloading(false);
      router.replace("/(main)/Home");
      Alert.alert("successfull", "Welcome back!");
    }
  }

  return (
    <ScreenWrapper scroll={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={40}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.topStack}>
              <TouchableOpacity
                onPress={() => {
                  router.replace("/(auth)/onboarding");
                }}
              >
                <Image
                  source={require("../../assets/img/logo.png")}
                  style={[styles.logo, { marginTop: insets.top + 10 }]}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.centerStack}>
              <Text style={styles.label}>Continue Journey</Text>
              <TextInput
                placeholder="your@gmail.com"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TextInput
                placeholder="password"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.bottomStack}>
              <TouchableOpacity
                onPress={() => signwithemail()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topStack: {
    paddingLeft: 10,
  },

  centerStack: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    flexDirection: "column",
  },

  bottomStack: {
    //paddingHorizontal: 10,
    paddingBottom: 10,
    gap: 16,
  },

  logo: {
    width: 55,
    height: 55,
    resizeMode: "contain",
  },

  button: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    //marginTop:10
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  label: {
    marginBottom: 30,
    fontWeight: 500,
    fontSize: 16,
  },
});
