import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import Loading from "@/components/Loading";
import { useCombinedWorkoutData } from "@/context/CombinedWorkoutDataContext";

// TODO: protein page -> get premium -> open paywall
// protein screen need to be implemented for the premium users

const Protein = () => {
  const { userDoc, loading, error } = useCombinedWorkoutData();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-bold text-red-500">{error.message}</Text>
      </View>
    );
  }

  const isPremium = userDoc?.isPremium || false;

  return (
    <View className="flex-1 justify-center items-center p-4">
      <View className="absolute">
        <Text className="text-lg">
          Welcome to the Protein Tab - Exclusive Content for Premium Users!
        </Text>
      </View>

      {isPremium === false ? (
        <View className="w-full h-full justify-center">
          <BlurView intensity={100} tint="light">
            <View className="w-full h-full justify-center items-center">
              <TouchableOpacity className="rounded bg-primary w-full justify-center items-center">
                <Text className="text-lg text-white">Get Premium for $5</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      ) : (
        <Text className="text-lg font-bold">
          Welcome to the Protein Tab - Exclusive Content for Premium Users!
        </Text>
      )}
    </View>
  );
};

export default Protein;
