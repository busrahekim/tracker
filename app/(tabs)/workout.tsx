import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { useFetchDB } from "@/hooks/useFetchDB";
import Loading from "@/components/Loading";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useCombinedWorkoutData } from "@/context/CombinedWorkoutDataContext";

const Workout = () => {
  const headerHeight = useHeaderHeight();
  const { exercises, loading, error } = useCombinedWorkoutData();

  const handleEdit = () => {};

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
      className="p-3 flex-1"
    >
      {exercises && exercises.length > 0 ? (
        <>
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl">Current Workout Plan</Text>
            <TouchableOpacity
              onPress={handleEdit}
              className="rounded-full p-2 bg-primary"
            >
              <AntDesign name="edit" size={16} color={Colors.background} />
            </TouchableOpacity>
          </View>

          {exercises.map((workout) => (
            <View key={workout.day} className="gap-y-2 mt-2">
              <Text
                style={{ fontWeight: "bold", fontSize: 18, marginBottom: 5 }}
              >
                {workout.day.toUpperCase()}
              </Text>
              {workout.exercises.map((exercise: string, index: number) => (
                <Text key={index} style={{ marginLeft: 10 }}>
                  - {exercise}
                </Text>
              ))}
            </View>
          ))}
        </>
      ) : (
        <Text>YOU DO NOT HAVE A WORKOUT PLAN YET</Text>
      )}
    </ScrollView>
  );
};

export default Workout;
