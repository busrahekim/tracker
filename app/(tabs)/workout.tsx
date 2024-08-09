import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import Loading from "@/components/Loading";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useCombinedWorkoutData } from "@/context/CombinedWorkoutDataContext";
import WorkoutEditPanel from "@/components/DialogPanels/WorkoutEditPanel";
import { FIRESTORE_DB } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const Workout = () => {
  const headerHeight = useHeaderHeight();
  const { exercises, loading, error } = useCombinedWorkoutData();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [isEditPanelVisible, setEditPanelVisible] = useState(false);

  const handleEdit = () => {
    if (selectedDay) {
      setEditPanelVisible(true);
    }
  };

  const toggleCircleColor = (day: string) => {
    setSelectedDay((prevDay) => (prevDay === day ? null : day));
  };

  const handleSaveWorkout = async (workout: string, newExercises: string[]) => {    
    try {
      const workoutRef = doc(
        FIRESTORE_DB,
        "workoutPlans",
        "PPL",
        "exercises",
        `${workout.toLowerCase()}Day`
      );
      await updateDoc(workoutRef, {
        exercises: newExercises,
      });

      console.log("Saved workout:", workout, newExercises);
      setEditPanelVisible(false);
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  const currentWorkout = exercises?.find(
    (workout) => workout.day === selectedDay
  );

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: headerHeight,
        paddingBottom: 100,
      }}
      className="p-3 flex-1"
    >
      {exercises && exercises.length > 0 ? (
        <>
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl">Current Workout Plan</Text>
            <TouchableOpacity
              onPress={handleEdit}
              className={`p-2 ${selectedDay ? " bg-primary rounded-full" : ""}`}
              disabled={!selectedDay}
            >
              <AntDesign
                name="edit"
                size={18}
                color={selectedDay ? Colors.background : Colors.gray}
              />
            </TouchableOpacity>
          </View>

          {exercises.map((workout) => (
            <View
              key={workout.day}
              className="rounded-lg bg-background p-2 gap-y-2 mt-2"
            >
              <View className="flex-row items-center justify-between">
                <Text className="font-bold text-lg ml-2">
                  {workout.day.toUpperCase()}
                </Text>
                <TouchableOpacity
                  onPress={() => toggleCircleColor(workout.day)}
                  className={`w-6 h-6 rounded-xl ${
                    selectedDay === workout.day ? "bg-primary" : "bg-lightGray"
                  }`}
                />
              </View>
              {workout.exercises.map((exercise: string, index: number) => (
                <Text key={index} className="ml-2">
                  - {exercise}
                </Text>
              ))}
            </View>
          ))}
        </>
      ) : (
        <Text>YOU DO NOT HAVE A WORKOUT PLAN YET</Text>
      )}

      {/* WorkoutEditPanel component */}
      {currentWorkout && (
        <WorkoutEditPanel
          visible={isEditPanelVisible}
          onClose={() => setEditPanelVisible(false)}
          currentWorkout={currentWorkout.day}
          currentExercises={currentWorkout.exercises}
          onSave={handleSaveWorkout}
        />
      )}
    </ScrollView>
  );
};

export default Workout;
