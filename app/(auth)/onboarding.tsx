import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/theme";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Onboarding = () => {
    const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScreenWrapper scroll={false}>
      <View style={styles.container}>

  
  <View style={styles.topStack}>
    <Image
      source={require("../../assets/img/logo.png")}
      style={[styles.logo, { marginTop: insets.top + 10 }]}
    />
  </View>


  <View style={styles.centerStack}>
    <Text style={styles.title}>
      Create your{"\n"}Karto and{"\n"}never lose track{"\n"}of your cart.
    </Text>
  </View>

 
  <View style={styles.bottomStack}>

  <TouchableOpacity onPress={()=>{router.replace("/(auth)/login")}} style={styles.button}>
  <Text style={styles.buttonText}>Login</Text>
</TouchableOpacity>


<TouchableOpacity onPress={()=>{router.replace("/(auth)/register")}} style={styles.button}>
  <Text style={styles.buttonText}>Register</Text>
</TouchableOpacity>
</View>

</View>
    </ScreenWrapper>
  );
};

export default Onboarding;

const styles = StyleSheet.create({

  
container: {
  flex: 1,
},

topStack: {
  paddingLeft: 10,
},

centerStack: {
  flex: 1,
  justifyContent: "center",
  alignItems: "flex-start",
  paddingHorizontal: 10,
  
},

bottomStack: {
  //paddingHorizontal: 10,
  paddingBottom: 10,
  gap: 16,
},


logo: {
  width: 55,
  height: 55,
  resizeMode: "contain",
},

title: {
  fontSize: 28,
  fontWeight: "700",
  textAlign: "left",
},
 button: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    //marginTop:10
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },


});
