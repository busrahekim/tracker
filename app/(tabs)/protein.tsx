import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import Loading from "@/components/Loading";
import { useCombinedWorkoutData } from "@/context/CombinedWorkoutDataContext";
import PaywallPanel from "@/components/DialogPanels/PaywallPanel";
import ProteinIntakeGraph from "@/components/ProteinIntakeGraph";

const Protein = () => {
  const { userDoc, loading, error } = useCombinedWorkoutData();
  const [isPaywallVisible, setPaywallVisible] = useState(false);
  const [breakfastIntake, setBreakfastIntake] = useState("");
  const [lunchIntake, setLunchIntake] = useState("");
  const [dinnerIntake, setDinnerIntake] = useState("");

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

  const handleOpenPaywall = () => setPaywallVisible(true);
  const handleClosePaywall = () => setPaywallVisible(false);
  const handleBuyPremium = () => {
    // Handle the premium purchase logic here
    handleClosePaywall();
  };
  const handleBreakfastIntakeChange = (text: string) => {
    setBreakfastIntake(text);
  };

  const handleLunchIntakeChange = (text: string) => {
    setLunchIntake(text);
  };

  const handleDinnerIntakeChange = (text: string) => {
    setDinnerIntake(text);
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <View className="absolute">
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg font-bold mb-4">
            Track Your Daily Protein Intake
          </Text>
          <TextInput
            className="bg-lightGray rounded p-2 mb-4 w-full"
            placeholder="Breakfast (grams)"
            keyboardType="numeric"
            value={breakfastIntake}
            onChangeText={handleBreakfastIntakeChange}
          />
          <TextInput
            className="bg-lightGray rounded p-2 mb-4 w-full"
            placeholder="Lunch (grams)"
            keyboardType="numeric"
            value={lunchIntake}
            onChangeText={handleLunchIntakeChange}
          />
          <TextInput
            className="bg-lightGray rounded p-2 mb-4 w-full"
            placeholder="Dinner (grams)"
            keyboardType="numeric"
            value={dinnerIntake}
            onChangeText={handleDinnerIntakeChange}
          />
          <TouchableOpacity
            className="bg-primary rounded p-2 w-full"
            onPress={() => {}}
          >
            <Text className="text-white text-center">Save Intake</Text>
          </TouchableOpacity>
        </View>

        <ProteinIntakeGraph
          breakfastIntake={breakfastIntake}
          lunchIntake={lunchIntake}
          dinnerIntake={dinnerIntake}
        />
      </View>

      {!isPremium && (
        <View className="w-full h-full justify-center">
          <BlurView intensity={100} tint="light">
            <View className="w-full h-full justify-center items-center">
              <TouchableOpacity
                className="rounded bg-primary w-full justify-center items-center"
                onPress={handleOpenPaywall}
              >
                <Text className="text-lg text-white">Get Premium for $5</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      )}

      <PaywallPanel
        visible={isPaywallVisible}
        onDismiss={handleClosePaywall}
        onBuy={handleBuyPremium}
      />
    </View>
  );
};

export default Protein;
