import { TouchableOpacity, Text, View, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import Loading from "@/components/Loading";
import Ribbon from "@/components/Ribbon";
import { useEffect, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomBottomSheet from "@/components/CustomBottomSheet";
import ScheduledWorkoutView from "@/components/ScheduledWorkoutView";
import { useCombinedWorkoutData } from "@/context/CombinedWorkoutDataContext";
import * as Notifications from "expo-notifications";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "@/firebaseConfig";
import { getAuth } from "firebase/auth";

export default function Home() {
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const [isModalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { userDoc, loading, currentWorkout, refetchUserData } =
    useCombinedWorkoutData();

  const currentDayName = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
  });

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
    };

    const scheduleNotification = async () => {
      if (currentWorkout !== "Off") {
        // Cancel all existing scheduled notifications to avoid duplicates
        await Notifications.cancelAllScheduledNotificationsAsync();

        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Workout Reminder",
            body: "Ready to hit your workout?",
            sound: "default",
          },
          trigger: {
            hour: 9,
            minute: 0,
            repeats: true,
          },
        });
      }
    };

    requestPermissions();
    scheduleNotification();
  }, [currentWorkout]);

  const showModal = () => {
    setModalVisible(true);
    bottomSheetRef.current?.expand();
  };

  const hideModal = () => {
    bottomSheetRef.current?.collapse();
    setTimeout(() => setModalVisible(false), 100);
  };

  const handleClick = () => {
    router.replace("/onboarding");
  };

  const handleSkipDay = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("No authenticated user found!");
        return;
      }

      const userDocRef = doc(FIRESTORE_DB, "users", user.uid);

      // current schedule
      const userDoc = await getDoc(userDocRef);
      const schedule = userDoc.data()?.schedule || {};

      const today = new Date().toISOString().split("T")[0];
      const newSchedule = { ...schedule };

      // Shift workouts by one day
      Object.keys(newSchedule).forEach((dateStr) => {
        const date = new Date(dateStr);
        if (date >= new Date(today)) {
          const nextDate = new Date(date);
          nextDate.setDate(nextDate.getDate() + 1);
          const nextDateStr = nextDate.toISOString().split("T")[0];
          newSchedule[nextDateStr] = newSchedule[dateStr];
          delete newSchedule[dateStr];
        }
      });

      // Setting today's workout to "Off"
      newSchedule[today] = {
        currentWorkout: "Off",
        exerciseSets: {},
        photoUris: [],
        status: "",
      };

      // Save the updated schedule
      await setDoc(userDocRef, { schedule: newSchedule }, { merge: true });
      await refetchUserData();
      Alert.alert("Workout schedule updated successfully.");
    } catch (error) {
      console.error("Error updating schedule: ", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingTop: headerHeight, flexGrow: 1 }}
        >
          <View className="gap-y-2 justify-center m-3">
            <Text className="text-3xl font-bold mb-3 text-black">
              {currentDayName}
            </Text>

            {currentWorkout !== "Off" ? (
              <View>
                <View className="w-full rounded-md p-3 border-b-2 border-r-2 overflow-hidden relative bg-white">
                  <Text className="text-2xl">Hi, buddy!</Text>
                  {userDoc?.workoutPlan ? (
                    <Text className="text-lg">Ready to hit some PR's?</Text>
                  ) : (
                    <>
                      <Text className="text-lg">
                        I would like to know better your workout schedule to
                        help out tracking. Why won't we start with that?
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
                {/* ScheduledWorkoutView */}
                <ScheduledWorkoutView showModal={showModal} />

                {/** Go off */}
                <View className="flex-row items-center justify-between mt-2">
                  <Text className="">
                    Don't you feel to do your workout today ?
                  </Text>
                  <TouchableOpacity
                    className="p-1 bg-primary rounded"
                    onPress={handleSkipDay}
                  >
                    <Text className="text-white text-center">Skip Workout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View className="w-full rounded-md p-3 border-b-2 border-r-2 overflow-hidden relative bg-white">
                <Text className="text-2xl">Hi, buddy!</Text>
                <Text className="text-lg">Looks like it's time to rest!</Text>
                <Ribbon />
              </View>
            )}
          </View>
        </ScrollView>

        {/* Overlay */}
        {isModalVisible && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 0,
            }}
          />
        )}
      </View>

      {/* Bottom Sheet */}
      {isModalVisible && (
        <CustomBottomSheet
          ref={bottomSheetRef}
          isVisible={isModalVisible}
          onClose={hideModal}
        />
      )}
    </GestureHandlerRootView>
  );
}
