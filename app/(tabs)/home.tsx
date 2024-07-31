import { TouchableOpacity, Text, View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useHeaderHeight } from "@react-navigation/elements";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const headerHeight = useHeaderHeight();

  const handleClick = () => {
    router.replace("/onboarding");
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
    >
      <View className="flex-1 items-center justify-center">
        <View className="flex justify-center m-3 rounded-md p-3 border-b-2 border-r-2 overflow-hidden relative bg-white">
          <Text className="text-2xl">Hi, buddy!</Text>
          {/* if there is no workout schedule */}
          <Text className="text-lg">
            I would like to know better your workout schedule to help out
            trackking. Why won't we start with that?
          </Text>
          {/* onboarding screen on press, get the details */}
          <TouchableOpacity
            className="mt-4 cursor-pointer"
            onPress={handleClick}
          >
            <Text className="text-lg text-blue-500 font-bold">
              Edit schedule
            </Text>
          </TouchableOpacity>

          <View className="absolute right-0 bottom-0 h-16 w-16">
            <View className="absolute right-[-34px] bottom-[10px] w-[170px] transform -rotate-45 bg-blue-500 py-1"></View>
          </View>
        </View>
        {/* //TODO:list popular workout routines or some articles*/}
        <View className=" bg-red-400">
          <Text>popular workout routine 1</Text>
        </View>
      </View>
    </ScrollView>
  );
}

// const handleClick = async () => {
//   console.log("clicked");

//   try {
//     const docRef = await addDoc(collection(FIRESTORE_DB, "users"), {
//       first: "Ada",
//       last: "Lovelace",
//       born: 1815,
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };
