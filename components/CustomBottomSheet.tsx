import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { forwardRef } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import WorkoutTrackView from "./WorkoutTrackView";
import { useData } from "@/context/DataContext";

interface CustomBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  //   ref: React.Ref<BottomSheet>;
}

const CustomBottomSheet = forwardRef<BottomSheet, CustomBottomSheetProps>(
  ({ isVisible, onClose }, ref) => {
    if (!isVisible) return null;

    const { currentWorkout } = useData();

    return (
      <BottomSheet
        ref={ref}
        index={0} // hide the sheet initially
        snapPoints={["82%", "85%", "90%"]}
        onClose={onClose}
        enablePanDownToClose={true} // Enable this prop to allow closing
        backgroundStyle={styles.bottomSheetBackground}
        handleStyle={styles.bottomSheetHandle}
      >
        <BottomSheetScrollView
          contentContainerStyle={{
            padding: 20,
          }}
        >
          <Text className="text-xl font-bold uppercase">{currentWorkout}</Text>
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
          <TouchableOpacity
            onPress={onClose}
            className="mt-5 bg-primary p-2 rounded-md"
          >
            <Text className="text-white text-center text-lg">Finish</Text>
          </TouchableOpacity>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  bottomSheetHandle: {
    backgroundColor: "#e9ecef",
    height: 25,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default CustomBottomSheet;
