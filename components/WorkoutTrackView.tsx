import { View, Text } from "react-native";
import React from "react";
import { useData } from "@/context/DataContext";

const WorkoutTrackView = () => {
  const { currentExercises, currentWorkout } = useData();

  return (
    <View>
      {/* Image Insert*/}
      {/* Exercise Inputs*/}
      {/* Finish Button*/}
    </View>
  );
};

export default WorkoutTrackView;
