import ScreenWrapper from "@/components/ScreenWrapper";
//import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
//import { useRouter } from "expo-router";
import FAB from "@/components/FAB";
import Header from "@/components/header";
import { theme } from "@/theme";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
//import { Picker } from "@react-native-picker/picker";
import DropdownComponent from "@/components/Dropdown";
import ItemList from "@/components/itemlist";
import { createitem, getitem } from "@/services/itemservice";
import { TextInput } from "react-native-gesture-handler";
//import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";

const Home = () => {
  const [name, setname] = useState("");
  const [items, setitems] = useState<any[]>([]);
  const [note, setnote] = useState("");
  const [urgent, seturgent] = useState("");
  const [purchased, setpurchased] = useState("done");

  useEffect(() => {
    loaditems();
  }, []);

  async function loaditems() {
    const data = await getitem();
    setitems(data);
  }

  const handelsave = async () => {
    try {
      if(!name||!note||!urgent){
        Alert.alert("fill all details")
        return;
      }
      await createitem(name, note, urgent, purchased);
      setname("");
      setnote("");
      seturgent("");
      console.log("item saved");
      bottomsheetref.current?.close();
      await loaditems();
    } catch (error) {
      console.log(error);
    }
  };

  const bottomsheetref = useRef<BottomSheet>(null);
  const snapPoint = useMemo(() => ["45%", "70%"], []);

  const router = useRouter();
  return (
    <ScreenWrapper scroll={false}>
      <Header title="Home" />
      
        <ItemList items={items} reload={loaditems} />
      

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
