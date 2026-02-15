/*eslint-disable*/
//import ProfileBottomSheet from "@/components/profilesheet";
import BottomSheet , {BottomSheetView} from '@gorhom/bottom-sheet'
import ScreenWrapper from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Header from "../../components/header";
import { theme } from '@/theme';
import { TextInput } from 'react-native-gesture-handler';
//import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated'

const profile = () => {
    const [name, setname] = useState("");
    const [bio,setbio] = useState("");
    const[location,setlocation] = useState("");


    const bottomsheetref = useRef<BottomSheet>(null);
    const snapPonints = useMemo(()=>["55%"],[]);
  //const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <ScreenWrapper scroll={false}>
      <Header title="Profile" />
      <ScrollView>
        <TouchableOpacity
          style={styles.profilecontainer}
          onPress={()=>bottomsheetref.current?.expand()}    >
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
      <BottomSheet
      ref={bottomsheetref}
      index={-1}
      snapPoints={snapPonints}
      backgroundStyle={{backgroundColor:theme.colors.secondary}}
      enablePanDownToClose={true}
      >
        <BottomSheetView style={styles.sheet} >
            <Text style={styles.title}>Update Your Profile!!</Text>
            <TextInput
            placeholder='name'
            placeholderTextColor={theme.colors.gray}
            value={name}
            onChangeText={setname}
            style={styles.input}/>
            <TextInput
            placeholder='bio'
            placeholderTextColor={theme.colors.gray}
            value={bio}
            onChangeText={setbio}
            style={styles.input}/>
            <TextInput
            placeholder='address'
            placeholderTextColor={theme.colors.gray}
            value={location}
            onChangeText={setlocation}
            style={styles.input}/>
            <TouchableOpacity style={styles.btn}>
                <Text style={{color:"black", fontWeight:500}}>Profile pic</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
                <Text style={{color:"black", fontWeight:500}}>Save</Text>
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
  },
  sheet:{
    //backgroundColor:theme.colors.secondary,
    justifyContent:"center",
    flexDirection:"column",
    alignItems:"center",
    gap:10,
    flex:1
  },
  title:{
    fontWeight:500,
    color:"#fff",
    padding:10
  },
  input:{
    width: "90%",
    backgroundColor: "#414141",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    color:"#fff"
  },
  btn:{
    width: "90%",
    backgroundColor: "#f1f1f1",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    justifyContent:"center",
    alignItems:"center",
    
  }
});
