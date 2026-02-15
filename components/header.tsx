/* eslint-disable */
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  useSafeAreaInsets
} from "react-native-safe-area-context";
type Props = {
  title?: string;
  profileURI?: string | null;
};

export default function header({ title, profileURI }: Props) {
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
            profileURI
              ? { uri: profileURI }
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
