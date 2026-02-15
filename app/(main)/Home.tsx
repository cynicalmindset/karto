import ScreenWrapper from "@/components/ScreenWrapper";
//import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import React, { useMemo, useRef } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { supabase } from "../../lib/supabase";
//import { useRouter } from "expo-router";
import FAB from "@/components/FAB";
import Header from "@/components/header";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { theme } from "@/theme";
//import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";

const Home = () => {
  const bottomsheetref = useRef<BottomSheet>(null);
  const snapPoint = useMemo(() => ["50%"], []);
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
    <ScreenWrapper scroll={true}>
      <Header title="Home" />
      <ScrollView></ScrollView>
      <FAB onPress={() => bottomsheetref.current?.expand()} />
      <BottomSheet
        ref={bottomsheetref}
        index={-1}
        snapPoints={snapPoint}
        enablePanDownToClose
        backgroundStyle={{backgroundColor:theme.colors.secondary}}
      >
        <BottomSheetView>
          <Text>add item</Text>
        </BottomSheetView>
      </BottomSheet>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
