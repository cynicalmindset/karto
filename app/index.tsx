import { StyleSheet, Text, View , Image} from 'react-native'
import React, { useEffect } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { useRouter } from 'expo-router';

const index = () => {
  const router = useRouter();
  useEffect(()=>{
    setTimeout(() => {
      router.replace("/(auth)/onboarding")
    }, 2000);
  },[])
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Image source={require("../assets/img/logo.png")} style={styles.image}/>
      </View>
      
    </ScreenWrapper>
  )
}

export default index

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  image:{
    height:"15%",
    width:"15%",
    resizeMode:"contain"
  }
})