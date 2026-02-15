import React, { ReactNode } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

type Props = {
  children: ReactNode;
  onRefresh?: () => void;
  refreshing?: boolean;
  scroll?: boolean;
};

export default function ScreenWrapper({
  children,
  onRefresh,
  refreshing = false,
  scroll = true,
}: Props) {

  if (scroll) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            onRefresh && (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            )
          }
        >
          {children}
        </ScrollView>

      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {children}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,  // FIXED
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("2%"),
    backgroundColor: "#fff",
  },

  content: {
    flexGrow: 1,
  },
});

