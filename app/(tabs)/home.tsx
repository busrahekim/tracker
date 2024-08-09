import { TouchableOpacity, Text, View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import Loading from "@/components/Loading";
import Ribbon from "@/components/Ribbon";
import { useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomBottomSheet from "@/components/CustomBottomSheet";
import ScheduledWorkoutView from "@/components/ScheduledWorkoutView";
import { useCombinedWorkoutData } from "@/context/CombinedWorkoutDataContext";

export default function Home() {
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const [isModalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { userDoc, loading, currentWorkout } = useCombinedWorkoutData();

  const currentDayName = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
  });

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
              <>
                <View className="w-full rounded-md p-3 border-b-2 border-r-2 overflow-hidden relative bg-white">
                  <Text className="text-2xl">Hi, buddy!</Text>
                  {!userDoc?.workoutPlan ? (
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
              </>
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
