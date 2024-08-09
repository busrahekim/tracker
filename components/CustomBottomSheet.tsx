import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { forwardRef } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import WorkoutTrackView from "./WorkoutTrackView";
import { useSaveWorkoutData } from "@/hooks/useSaveWorkoutData";
import { useCombinedWorkoutData } from "@/context/CombinedWorkoutDataContext";

interface CustomBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  //   ref: React.Ref<BottomSheet>;
}

const CustomBottomSheet = forwardRef<BottomSheet, CustomBottomSheetProps>(
  ({ isVisible, onClose }, ref) => {
    if (!isVisible) return null;

    const { currentWorkout } = useCombinedWorkoutData();
    const { saveWorkoutData } = useSaveWorkoutData();

    const handleFinish = () => {
      const currentDate = new Date().toISOString().split("T")[0];
      saveWorkoutData(currentDate, currentWorkout);
      onClose();
    };

    return (
      <BottomSheet
        ref={ref}
        index={0} // hide the sheet initially
        snapPoints={["82%", "85%", "90%"]}
        onClose={onClose}
        enablePanDownToClose={true} // Enable this prop to allow closing
        backgroundStyle={styles.bottomSheetBackground}
        handleStyle={styles.bottomSheetHandle}
        style={{ zIndex: 2 }}
      >
        <BottomSheetScrollView
          contentContainerStyle={{
            padding: 20,
          }}
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-bold uppercase">
              {currentWorkout}
            </Text>
            <TouchableOpacity onPress={handleFinish} className="">
              <Text className="text-primary font-bold text-center text-lg">
                Finish
              </Text>
            </TouchableOpacity>
          </View>

          <WorkoutTrackView />
          {/* {currentExercises.length > 0 ? (
          currentExercises.map((exercise: string, index: number) => (
            <Text key={index} className="text-lg">
              - {exercise}
            </Text>
          ))
        ) : (
          <Text>No exercises for today.</Text>
        )} */}
          {/* <TouchableOpacity
            onPress={onClose}
            className="mt-5 bg-primary p-2 rounded-md"
          >
            <Text className="text-white text-center text-lg">Finish</Text>
          </TouchableOpacity> */}
        </BottomSheetScrollView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetHandle: {
    backgroundColor: "#e9ecef",
    height: 25,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default CustomBottomSheet;
