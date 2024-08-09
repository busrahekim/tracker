import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useCombinedWorkoutData } from "@/context/CombinedWorkoutDataContext";

interface ScheduledWorkoutViewProps {
  showModal: () => void;
}

const ScheduledWorkoutView = ({ showModal }: ScheduledWorkoutViewProps) => {
  const {
    currentExercises,
    currentWorkout,
    currentWorkoutDescription,
    userDoc,
  } = useCombinedWorkoutData();

  const today = new Date().toISOString().split("T")[0];

  // Retrieve today's schedule entry from userDoc.schedule
  const todaySchedule = userDoc.schedule ? userDoc.schedule[today] : undefined;

  // Get today's workout status
  const workoutStatus = todaySchedule ? todaySchedule.status : undefined;

  return (
    <View className="flex-1">
      <View className="bg-primary rounded-md items-center my-2 p-4">
        <View className="flex-row items-center justify-between w-full gap-2">
          <Text className="text-white text-xl">{currentWorkout} Day</Text>
          <TouchableOpacity
            onPress={showModal}
            className={`rounded-full px-3 py-2 ${workoutStatus === "done" ? "bg-secondary" : "bg-lightGray"}`}
            disabled={workoutStatus === "done"}
          >
            <Text className={` uppercase ${workoutStatus === "done" ? "text-white" : "text-primary"}`}>
              {workoutStatus === "done" ? "Done" : "Start"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-lightGray text-lg my-2">
          {currentWorkoutDescription}
        </Text>
        <View className="flex flex-row items-center justify-around w-full">
          <View className="flex flex-row gap-1">
            <MaterialCommunityIcons
              name="arm-flex-outline"
              size={18}
              color={Colors.lightGray}
            />
            <Text className="text-white text-">
              {currentExercises.length} exercises
            </Text>
          </View>
          <View className="flex flex-row gap-1">
            <Ionicons name="timer-outline" size={18} color={Colors.lightGray} />
            <Text className="text-white text-">
              ~{currentExercises.length * 10} min
            </Text>
          </View>
          <View className="flex flex-row gap-1">
            <SimpleLineIcons name="fire" size={18} color={Colors.lightGray} />
            <Text className="text-white text-">
              ~{currentExercises.length * 50} kcal
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ScheduledWorkoutView;
