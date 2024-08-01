import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import useUserDoc from "@/hooks/useUserDoc";
import Loading from "@/components/Loading";

const Protein = () => {
  const { userDoc, loading, error } = useUserDoc();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-bold text-red-500">{error}</Text>
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
              <TouchableOpacity className="rounded bg-secondary w-full justify-center items-center">
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
