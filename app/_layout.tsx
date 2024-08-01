import Loading from "@/components/Loading";
import { AuthProvider } from "@/context/AuthContext";
import { UserInactivityProvider } from "@/context/UserInactivity";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

export { ErrorBoundary } from "expo-router";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
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
    return <Loading />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />

      <Stack.Screen
        name="(auth)/login"
        options={{
          title: "",
          // header: () => <CustomHeader onBackPress={router.back} />,
          // headerTransparent: true,
          // headerBackTitle: "",
          // headerShadowVisible: false,
          // headerStyle: { backgroundColor: Colors.background },
          // headerLeft: () => (
          //   <TouchableOpacity onPress={router.back} className="absolute">
          //     <Ionicons name="arrow-back" size={34} color={Colors.dark} />
          //   </TouchableOpacity>
          // ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)/signup"
        options={{
          title: "",
          // headerBackTitle: "",
          // headerShadowVisible: false,
          // headerStyle: { backgroundColor: Colors.background },
          // headerLeft: () => (
          //   <TouchableOpacity onPress={router.back}>
          //     <Ionicons name="arrow-back" size={34} color={Colors.dark} />
          //   </TouchableOpacity>
          // ),
          headerShown: false,
        }}
      />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
};

const RootLayoutNav = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <UserInactivityProvider>
                <RootLayout />
              </UserInactivityProvider>
            </QueryClientProvider>
          </AuthProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};

export default RootLayoutNav;
