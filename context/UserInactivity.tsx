import { AppState, AppStateStatus } from "react-native";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "./AuthContext";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV({
  id: "inactivity-storage",
});

export const UserInactivityProvider = ({ children }: any) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const sub = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      sub.remove();
    };
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {

    // console.log("nextAppState: ", nextAppState);
    if (nextAppState === "background") {
      recordStartTime();
    } else if (
      nextAppState === "active" &&
      appState.current.match(/background/)
    ) {
      const elapsed = Date.now() - (storage.getNumber("startTime") || 0);
      if (elapsed > 3000 && user?.uid) {
        router.replace("/(tabs)/profile");
      }
    }
    appState.current = nextAppState;
  };

  const recordStartTime = () => {
    storage.set("startTime", Date.now());
  };

  return children;
};
