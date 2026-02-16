import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

type Props = {
  onPress: () => void;
};

export default function FAB({ onPress }: Props) {

  return (

    <TouchableOpacity
      style={styles.fab}
      onPress={onPress}
    >

      <Text style={styles.plus}>+</Text>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

fab: {
  position: "absolute",
  bottom: 15,
  right: 15,
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: "#2c2c2c",
  justifyContent: "center",
  alignItems: "center",
  elevation: 5,
},

plus: {
  color: "white",
  fontSize: 28,
  //fontWeight: "bold",
  alignItems:"center",
  justifyContent:"center"
},

});
