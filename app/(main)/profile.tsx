import ProfileBottomSheet from "@/components/profilesheet";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Header from "../../components/header";
//import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated'

const profile = () => {
  //const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <ScreenWrapper scroll={false}>
      <Header title="Profile" />
      <ScrollView>
        <TouchableOpacity
          style={styles.profilecontainer}
          onPress={()=>router.push('/(main)/updateprofile')}    >
          <Image
            source={require("../../assets/img/avatar.png")}
            style={styles.pfp}
          ></Image>
          <View style={styles.info}>
            <Text style={styles.texthel}>Hello,</Text>
            <Text style={styles.text}>enter name</Text>
            <Text style={styles.text}>enter bio</Text>
            <Text style={styles.text}>enter location</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
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
  },
});
