import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Header from '../../components/header'
//import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated'

const profile = () => {
  return (
    <ScreenWrapper scroll={false}>
        <Header title='Profile'/>
      <ScrollView></ScrollView>
    </ScreenWrapper>
  )
}

export default profile

const styles = StyleSheet.create({})