/* eslint-disable */
import { supabase } from "@/lib/supabase";
import { getusers } from "@/services/profileservice";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
type Props = {
  title?: string;
};

export default function header({ title }: Props) {
  const [profile, setprofile] = useState<any>(null);
  useEffect(() => {
    async function loadprofile() {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;

      const data = await getusers(user.id);
      setprofile(data);
    }
    loadprofile();
  }, []);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity style={styles.logo} onPress={() => router.back()}>
        <Image
          source={require("../assets/img/logo.png")}
          style={styles.image}
        />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        style={styles.profile}
        onPress={() => {
          router.push("/(main)/profile");
        }}
      >
        <Image
          style={styles.pfp}
          source={
            profile?.profile_pic
              ? { uri: profile.profile_pic + "?t=" + Date.now() }
              : require("../assets/img/avatar.png")
          }
        />
      </TouchableOpacity>
    </View>
  );
}

//export default function header

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  logo: {
    position: "absolute",
    left: 1,
  },
  image: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
  profile: {
    position: "absolute",
    right: 8,

    //backgroundColor: "#d1d1d1",
  },
  pfp: {
    borderRadius: 15,
    height: 45,
    width: 45,
    resizeMode: "contain",
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
  },
});
