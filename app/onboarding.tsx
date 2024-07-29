import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Step from "@/components/Step";
import Steps, { StepData } from "@/constants/Steps";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < Steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  //   TODO: Finish logic, loading screen...
  const handleFinish = () => {
    router.replace("/(tabs)/home");
    console.log("Onboarding complete!");
  };

  // seems like not necessary
  const handleSelect = (step: number, contentId: number) => {
    console.log(`Selected content ${contentId} on step ${step}`);
  };

  const currentStepData: StepData | undefined = Steps.find(
    (step) => step.id === currentStep
  );

  return (
    <View className="flex-1 items-center justify-around">
      {/* Progress Bar */}
      <View className="w-3/4">
        {/* Progress Bar */}
        <View className="flex-row justify-between mb-2">
          {Steps.map((_, index) => (
            <View key={index} className="flex-1 mx-1">
              <View
                className={`h-2 w-full rounded-full ${
                  currentStep > index ? "bg-secondary" : "bg-gray-300"
                }`}
              />
            </View>
          ))}
        </View>

        {/* Current Step Title */}
        <Text className="ml-1 text-lg mt-2">
          {Steps[currentStep - 1]?.stepTitle}
        </Text>
      </View>

      {/* Step Content */}
      {currentStepData ? (
        <Step
          step={currentStep}
          data={currentStepData}
          onSelect={handleSelect}
        />
      ) : (
        <Text className="text-2xl">Step {currentStep}</Text>
      )}

      {/* Navigation Controls */}
      <View className="flex-row justify-between mt-4 w-3/4">
        {currentStep > 1 && (
          <TouchableOpacity onPress={handleBack} className="p-2">
            <Ionicons name="arrow-back" size={24} color="blue" />
          </TouchableOpacity>
        )}
        {currentStep < Steps.length ? (
          <TouchableOpacity onPress={handleNext} className="p-2 ml-auto">
            <Ionicons name="arrow-forward" size={24} color="blue" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleFinish} className="p-2 ml-auto">
            <Text className="text-lg text-secondary font-bold">Finish</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Onboarding;
