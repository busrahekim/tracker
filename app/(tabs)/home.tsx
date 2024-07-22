import { TouchableOpacity, Text, View } from "react-native";
// import { collection, addDoc } from "firebase/firestore";
// import { FIRESTORE_DB } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useCallback, useMemo, useRef } from "react";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import CustomBottomSheet from "@/components/CustomBottomSheet";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheetModalProvider>
      <View className="flex-1 items-center justify-center">
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheetView className="flex-1">
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
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
            onPress={handlePresentModalPress}
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
        <View>
          <Text>popular workout routine 1</Text>
        </View>
      </View>
    </BottomSheetModalProvider>
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
