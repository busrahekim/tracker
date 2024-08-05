import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { forwardRef } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

interface CustomBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  currentWorkout: string;
  currentExercises: string[];
//   ref: React.Ref<BottomSheet>; 
}

const CustomBottomSheet = forwardRef<BottomSheet, CustomBottomSheetProps>(
    ({ isVisible, onClose, currentWorkout, currentExercises }, ref) => {
      if (!isVisible) return null;

 
  return (
    <BottomSheet
      ref={ref}
      index={0} // hide the sheet initially
      snapPoints={["50%", "75%", "90%"]}
      onClose={onClose}
      enablePanDownToClose={true} // Enable this prop to allow closing
      backgroundStyle={styles.bottomSheetBackground}
      handleStyle={styles.bottomSheetHandle}
    >
      <BottomSheetScrollView contentContainerStyle={styles.bottomSheetContent}>
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
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

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

export default CustomBottomSheet;
