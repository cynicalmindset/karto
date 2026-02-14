import ScreenWrapper from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useAuthContext } from "../hooks/use-auth-context";



const index = () => {
  const router = useRouter();
  const { session, loading } = useAuthContext();

  useEffect(() => {
    // Wait until auth finishes loading
    if (loading) return;

    // Delay navigation slightly to ensure layout mounts
    const timeout = setTimeout(() => {
      if (session) {
        router.replace("/(main)/Home");
      } else {
        router.replace("/(auth)/onboarding");
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [session, loading]);
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Image
          source={require("../assets/img/logo.png")}
          style={styles.image}
        />
      </View>
    </ScreenWrapper>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "15%",
    width: "15%",
    resizeMode: "contain",
  },
});
