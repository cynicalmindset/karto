import React, { ReactNode } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  RefreshControl,
  StatusBar,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
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
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal:wp("4%"),
    paddingVertical: hp("2%"),
  },

  content: {
    paddingHorizontal: wp("4%"), // responsive horizontal padding
    paddingVertical: hp("2%"),   // responsive vertical padding
    flexGrow: 1,
  },

});
