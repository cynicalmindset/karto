import ScreenWrapper from "@/components/ScreenWrapper";
import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { supabase } from "../../lib/supabase";
//import { useRouter } from "expo-router";

const Home = () => {
  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("Logout error:", error.message);
      return;
    }

    router.replace("/(auth)/onboarding");
  }

  const router = useRouter();
  return (
    <ScreenWrapper>
      <Button onPress={() => handleLogout()} variant="filled" color="#007AFF">
        logout
      </Button>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
