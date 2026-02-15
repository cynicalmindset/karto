import ScreenWrapper from "@/components/ScreenWrapper";
import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet,ScrollView } from "react-native";
import { supabase } from "../../lib/supabase";
//import { useRouter } from "expo-router";
import Header from "@/components/header";
//import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";

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
    <ScreenWrapper scroll={false}>
      <Header title="Home"/>
      <ScrollView>
        <Button onPress={() => handleLogout()} variant="filled" color="#007AFF">
          logout
        </Button>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
