import { TouchableOpacity, Text, View } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const handleClick = async () => {
    console.log("clicked");

    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

 
  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex justify-center m-3 rounded-md p-3 border-b-2 border-r-2 overflow-hidden relative bg-white">
        <Text className="text-2xl">Hi, buddy!</Text>
        {user ? (
          <></>
        ) : (
          <>
            <Text className="text-lg">
              I would like to know better to help out to track your workout. Why
              won't you start with that?
            </Text>
            <TouchableOpacity
              className="mt-4 cursor-pointer"
              onPress={handleClick}
            >
              <Text className="text-lg text-blue-500 font-bold">
                Create profile
              </Text>
            </TouchableOpacity>
          </>
        )}

        <View className="absolute right-0 bottom-0 h-16 w-16">
          <View className="absolute right-[-34px] bottom-[10px] w-[170px] transform -rotate-45 bg-blue-500 py-1"></View>
        </View>
      </View>
      {/* //TODO:list popular workout routines */}
      <View>
        <Text>popular workout routine 1</Text>
        <Text>popular workout routine 2</Text>
        <Text>popular workout routine 3</Text>
      </View>
    </View>
  );
}
