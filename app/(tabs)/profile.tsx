import { FIREBASE_APP } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { TouchableOpacity, View, Text } from "react-native";

export default function Profile() {
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut(getAuth(FIREBASE_APP));
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
