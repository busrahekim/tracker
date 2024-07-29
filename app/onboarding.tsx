import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import StepItem from "@/components/StepItem";

const Onboarding = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const router = useRouter();
    
    const steps = 3;
  
    const handleNext = () => {
      if (currentStep < steps) {
        setCurrentStep(currentStep + 1);
      }
    };
  
    const handleBack = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    };
  
    const handleFinish = () => {
      // Implement finish logic here
      console.log("Onboarding complete!");
    };
  
    return (
      <View className="flex-1 items-center justify-around">
        {/* Progress Bar */}
        <View className="flex-row justify-between mb-4 w-3/4">
          {[...Array(steps)].map((_, index) => (
            <View
              key={index}
              className={`h-2 flex-1 mx-1 rounded-full ${
                currentStep > index ? 'bg-secondary' : 'bg-gray-300'
              }`}
            />
          ))}
        </View>
  
        {/* Step Content */}
        <StepItem step={currentStep}/>
        <Text className="text-2xl">Step {currentStep}</Text>
  
        {/* Navigation Controls */}
        <View className="flex-row justify-between mt-4 w-3/4">
          {currentStep > 1 && (
            <TouchableOpacity onPress={handleBack} className="p-2">
              <Ionicons name="arrow-back" size={24} color="blue" />
            </TouchableOpacity>
          )}
          {currentStep < steps ? (
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
