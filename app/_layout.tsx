import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from "../providers/auth-provider";
//import Toast from "react-native-toast-message";
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
        
      </AuthProvider>
    </SafeAreaProvider>
  );
}
