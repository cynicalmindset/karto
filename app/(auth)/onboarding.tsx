import ScreenWrapper from "@/components/ScreenWrapper";
import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Onboarding = () => {

  const insets = useSafeAreaInsets();

  return (
    <ScreenWrapper scroll={false}>
      <View style={styles.container}>

        <Image
          source={require("../../assets/img/logo.png")}
          style={[styles.logo, { top: insets.top + 10 }]}
        />

        <View style={styles.centerStack}>
          <Text style={styles.title}>
            Create your Karto and never lose track of your cart.
          </Text>
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

  logo: {
    width: 55,
    height: 55,
    resizeMode: "contain",
    position: "absolute",
    left: 20,
  },

  centerStack: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },

});
