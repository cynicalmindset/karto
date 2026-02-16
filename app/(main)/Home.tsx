import ScreenWrapper from "@/components/ScreenWrapper";
//import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { supabase } from "../../lib/supabase";
//import { useRouter } from "expo-router";
import FAB from "@/components/FAB";
import Header from "@/components/header";
import { theme } from "@/theme";
import BottomSheet, {
  BottomSheetView
} from "@gorhom/bottom-sheet";
//import { Picker } from "@react-native-picker/picker";
import DropdownComponent from "@/components/Dropdown";
import { createitem } from "@/services/itemservice";
import { TextInput } from "react-native-gesture-handler";
//import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";

const Home = () => {
  const [name, setname] = useState("");
  const [note, setnote] = useState("");
  const [urgent, seturgent] = useState("");
  const [purchased, setpurchased] = useState("done");

  const handelsave = async () => {
    try {
      await createitem(name, note, urgent, purchased);
      setname("");
      setnote("");
      seturgent("");
      console.log("item saved");
      bottomsheetref.current?.close();
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const bottomsheetref = useRef<BottomSheet>(null);
  const snapPoint = useMemo(() => ["45%", "70%"], []);
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
        backgroundStyle={{ backgroundColor: theme.colors.secondary }}
      >
        <BottomSheetView style={styles.container}>
          <Text style={styles.title}>Add item in karto.</Text>
          <TextInput
            style={styles.input}
            placeholder="Product name"
            placeholderTextColor={"#787878"}
            value={name}
            onChangeText={setname}
          />
          <TextInput
            style={styles.input}
            placeholder="Short Note"
            placeholderTextColor={"#787878"}
            value={note}
            onChangeText={setnote}
          />
          <DropdownComponent value={urgent} onChange={seturgent} />
          <TouchableOpacity style={styles.btn} onPress={handelsave}>
            <Text style={{ color: "black", fontWeight: 500 }}>Save</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 10,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 500,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "90%",
    backgroundColor: "#414141",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    color: "#fff",
  },
  btn: {
    width: "90%",
    backgroundColor: "#f1f1f1",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    // position:"absolute",
    // bottom:0
  },
});
