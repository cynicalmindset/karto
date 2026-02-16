/*eslint-disable*/
//import ProfileBottomSheet from "@/components/profilesheet";
import ScreenWrapper from "@/components/ScreenWrapper";
import { supabase } from "@/lib/supabase";
import { getusers, updateprofile } from "@/services/profileservice";
import { uploadAvatar } from "@/services/storageservice";
import { theme } from "@/theme";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Header from "../../components/header";
//import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated'

const profile = () => {
async function handleLogout() { //define this logout button
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("Logout error:", error.message);
      return;
    }

    router.replace("/(auth)/onboarding");
  }


  async function pickImage() {
    try {
      // Ask permission
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission required");
        return;
      }

      // Open gallery
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (result.canceled) return;

      const imageUri = result.assets[0].uri;

      const user = (await supabase.auth.getUser()).data.user;

      if (!user) return;

      // Upload to Supabase Storage
      const avatarUrl = await uploadAvatar(user.id, imageUri);

      // Save in profiles table
      await updateprofile(user.id, {
        profile_pic: avatarUrl,
      });

      const data = await getusers(user.id);
      setprofile(data);

      // Update UI instantly
      setprofile((prev: any) => ({
        ...prev,
        profile_pic: avatarUrl,
      }));

      Alert.alert("Profile picture updated");
    } catch (error) {
      console.log(error);
    }
  }

  const [profile, setprofile] = useState<any>(null);
  useFocusEffect(
    useCallback(() => {
      async function fetchuser() {
        const user = (await supabase.auth.getUser()).data.user;

        if (!user) return;

        const data = await getusers(user.id);

        setprofile(data);

        setname(data.full_name || "");
        setbio(data.bio || "");
        setlocation(data.address || "");
      }

      fetchuser();
    }, []),
  );

  async function refresh() {
    setrefresh(true);
    const user = (await supabase.auth.getUser()).data.user;
    if (user) {
      const data = await getusers(user.id);
      setprofile(data);
    }

    setrefresh(false);
  }

  async function handelsave() {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;
      await updateprofile(user.id, {
        full_name: name,
        bio: bio,
        address: location,
      });

      setprofile({
        ...profile,
        full_name: name,
        bio: bio,
        address: location,
      });

      bottomsheetref.current?.close();
    } catch (error) {
      console.log("profile update error:", error);
    }
  }

  const [name, setname] = useState("");
  const [bio, setbio] = useState("");
  const [location, setlocation] = useState("");
  const [refrest, setrefresh] = useState(false);

  const bottomsheetref = useRef<BottomSheet>(null);
  const snapPonints = useMemo(() => ["45%"], []);
  //const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <ScreenWrapper scroll={true} refreshing={refrest} onRefresh={refresh}>
      <Header title="Profile" />
      <ScrollView>
        <TouchableOpacity
          style={styles.profilecontainer}
          onPress={() => bottomsheetref.current?.expand()}
        >
          <Image
            source={
              profile?.profile_pic
                ? { uri: profile.profile_pic + "?t=" + Date.now() }
                : require("../../assets/img/avatar.png")
            }
            style={styles.pfp}
          />

          <View style={styles.info}>
            <Text style={styles.text}>Hello {profile?.full_name} !!</Text>
            <View style={{ width: "90%", opacity: 0.5, marginTop: 8 }}>
              {/* <Text style={styles.text2}>{profile?.bio || "Add bio"}</Text> */}
              <Text style={styles.text2}>
                {profile?.address || "Add address"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <BottomSheet
        ref={bottomsheetref}
        index={-1}
        snapPoints={snapPonints}
        backgroundStyle={{ backgroundColor: theme.colors.secondary }}
        enablePanDownToClose={true}
      >
        <BottomSheetView style={styles.sheet}>
          <Text style={styles.title}>Update Your Profile!!</Text>
          <TextInput
            placeholder="name"
            placeholderTextColor={theme.colors.gray}
            value={name}
            onChangeText={setname}
            style={styles.input}
          />
          {/* <TextInput
            placeholder="bio"
            placeholderTextColor={theme.colors.gray}
            value={bio}
            onChangeText={setbio}
            style={styles.input}
          /> */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => router.push("/(main)/select-address")}
          >
            <Text>{profile?.address || "Add Address"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={pickImage}>
            <Text style={{ color: "black", fontWeight: 500 }}>Profile pic</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={handelsave}>
            <Text style={{ color: "black", fontWeight: 500 }}>Save</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </ScreenWrapper>
  );
};

export default profile;

const styles = StyleSheet.create({
  profilecontainer: {
    width: "100%",
    height: 150,
    //backgroundColor:"#d9d9d9",
    flexDirection: "row",
    //justifyContent:"space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#cecece",
    borderRadius: 20,
    gap: 30,
  },
  pfp: {
    height: 120,
    width: 120,
    resizeMode: "contain",
    borderRadius: 17,
    marginLeft: 14,
  },
  info: {
    flexDirection: "column",
    //gap:1
  },
  texthel: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 4,
    color: "#373737",
  },
  text: {
    fontWeight: 500,
    fontSize: 20,
  },
  text2: {
    fontWeight: 400,
    fontSize: 10,
    flexWrap: "wrap",
    width: "60%",

    //marginRight:5
  },
  sheet: {
    //backgroundColor:theme.colors.secondary,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  title: {
    fontWeight: 500,
    color: "#fff",
    padding: 10,
  },
  input: {
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
    justifyContent: "center",
    alignItems: "center",
  },
});
