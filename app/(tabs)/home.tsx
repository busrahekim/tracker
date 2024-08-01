import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import Loading from "@/components/Loading";
import Ribbon from "@/components/Ribbon";
import { useFetchDB } from "@/hooks/useFetchDB";
import { useRef, useState } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Home() {
  const router = useRouter();
  const { exercises, userDoc, loading } = useFetchDB();
  const headerHeight = useHeaderHeight();
  const [isModalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleClick = () => {
    router.replace("/onboarding");
  };

  const currentDate = new Date().toISOString().split("T")[0];
  const currentDayName = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
  });
  const currentWorkout =
    userDoc?.schedule?.[currentDate] || "No planned workout for today";

  const showModal = () => {
    setModalVisible(true);
    bottomSheetRef.current?.expand();
  };

  const hideModal = () => {
    bottomSheetRef.current?.collapse();
    setTimeout(() => setModalVisible(false), 100);
  };

  const currentExercises =
    exercises?.find((workout) => workout.day === currentWorkout)?.exercises ||
    [];

  if (loading) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingTop: headerHeight, flex: 1 }}>
        <View className="gap-y-2 justify-center m-3">
          <Text className="text-lg">{currentDayName}</Text>

          <View className="w-full rounded-md p-3 border-b-2 border-r-2 overflow-hidden relative bg-white">
            <Text className="text-2xl">Hi, buddy!</Text>
            {userDoc?.workoutPlan ? (
              <>
                <Text className="text-lg">Ready to hit some PR's?</Text>
                <TouchableOpacity onPress={handleClick}>
                  <Text>add</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text className="text-lg">
                  I would like to know better your workout schedule to help out
                  tracking. Why won't we start with that?
                </Text>
                <TouchableOpacity
                  className="mt-4 cursor-pointer"
                  onPress={handleClick}
                >
                  <Text className="text-lg text-primary font-bold">
                    Edit schedule
                  </Text>
                </TouchableOpacity>
              </>
            )}

            <Ribbon />
          </View>
          <View className="">
            <TouchableOpacity
              onPress={showModal}
              className="w-full rounded-md p-3 border-b-2 border-r-2 overflow-hidden relative bg-primary"
            >
              <Text className="text-xl text-white">{currentWorkout}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Bottom Sheet */}
        {isModalVisible && (
          <BottomSheet
            ref={bottomSheetRef}
            index={0} // // hide the sheet initially
            snapPoints={["50%", "75%", "90%"]}
            onClose={hideModal}
            enablePanDownToClose={true} // Enable this prop to allow closing
            backgroundStyle={styles.bottomSheetBackground}
            handleStyle={styles.bottomSheetHandle}
          >
            <BottomSheetScrollView
              contentContainerStyle={styles.bottomSheetContent}
            >
              <Text className="text-lg">Workout Details</Text>
              <Text className="mt-2">{currentWorkout} Day</Text>
              {currentExercises.length > 0 ? (
                currentExercises.map((exercise: string, index: number) => (
                  <Text key={index} className="text-lg">
                    - {exercise}
                  </Text>
                ))
              ) : (
                <Text>No exercises for today.</Text>
              )}
              <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </BottomSheetScrollView>
          </BottomSheet>
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  bottomSheetHandle: {
    backgroundColor: "#ccc",
    height: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  bottomSheetContent: {
    padding: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#f00",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});
