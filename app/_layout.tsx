import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthProvider from "../providers/auth-provider";
//import FAB from "@/components/FAB";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>

          {/* Stack navigator */}
          <Stack screenOptions={{ headerShown: false }} />


        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
