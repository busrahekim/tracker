import CustomHeader from "@/components/CustomHeader";
import Colors from "@/constants/Colors";
import { AuthProvider } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { ActivityIndicator, TouchableOpacity, View, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const router = useRouter();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      // console.log("auth state: ", uid);
    } else {
      // User is signed out
    }
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(auth)/login"
        options={{
          title: "",
          header: () => (
            <CustomHeader onBackPress={router.back} />
          ),
          headerTransparent: true,
          // headerBackTitle: "",
          // headerShadowVisible: false,
          // headerStyle: { backgroundColor: Colors.background },
          // headerLeft: () => (
          //   <TouchableOpacity onPress={router.back} className="absolute">
          //     <Ionicons name="arrow-back" size={34} color={Colors.dark} />
          //   </TouchableOpacity>
          // ),
        }}
      />
      <Stack.Screen
        name="(auth)/signup"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayoutNav;
