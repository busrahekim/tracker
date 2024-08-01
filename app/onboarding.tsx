import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useState } from "react";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Step from "@/components/Step";
import { StepData } from "@/constants/Steps";
import { FIRESTORE_DB } from "@/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "@/constants/Colors";
import Loading from "@/components/Loading";
import { useFetchDB } from "@/hooks/useFetchDB";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedContent, setSelectedContent] = useState<
    Record<number, number>
  >({});
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { loading, stepsData } = useFetchDB();

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleNext = () => {
    if (!selectedContent[currentStep]) {
      alert("Please select an option to proceed.");
      return;
    }

    if (stepsData && currentStep < stepsData.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // const handleFinish = async () => {
  //   const auth = getAuth();
  //   const user = auth.currentUser;

  //   if (!user) {
  //     console.error("No authenticated user found!");
  //     return;
  //   }

  //   if (!stepsData) {
  //     console.error("Steps data is not available.");
  //     return;
  //   }

  //   const userDocRef = doc(FIRESTORE_DB, "users", user.uid);
  //   const formattedDate = selectedDate
  //     ? selectedDate.toISOString().split("T")[0]
  //     : "";

  //   try {
  //     await setDoc(
  //       userDocRef,
  //       {
  //         workoutPlan:
  //           stepsData[0]?.content.find(
  //             (c) => c.contentId === selectedContent[1]
  //           )?.title || "",
  //         unit:
  //           stepsData[1]?.content.find(
  //             (c) => c.contentId === selectedContent[2]
  //           )?.title || "",
  //         frequency:
  //           stepsData[2]?.content.find(
  //             (c) => c.contentId === selectedContent[3]
  //           )?.title || "",
  //         startDate: formattedDate,
  //       },
  //       { merge: true }
  //     );
  //     router.replace("/(tabs)/home");
  //   } catch (error) {
  //     console.error("Error updating document: ", error);
  //   }
  // };


  const handleFinish = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) {
      console.error("No authenticated user found!");
      return;
    }
  
    if (!stepsData) {
      console.error("Steps data is not available.");
      return;
    }
  
    const userDocRef = doc(FIRESTORE_DB, "users", user.uid);
    const formattedDate = selectedDate
      ? selectedDate.toISOString().split("T")[0]
      : "";
  
    // Determine the workout plan and frequency
    const workoutPlan = stepsData[0]?.content.find(
      (c) => c.contentId === selectedContent[1]
    )?.title || "";
    const frequency = stepsData[2]?.content.find(
      (c) => c.contentId === selectedContent[3]
    )?.title || "";
  
    // Generate workout schedule
    const schedule = generateWorkoutSchedule(formattedDate, workoutPlan, frequency);
  
    try {
      await setDoc(
        userDocRef,
        {
          workoutPlan,
          unit: stepsData[1]?.content.find(
            (c) => c.contentId === selectedContent[2]
          )?.title || "",
          frequency,
          startDate: formattedDate,
          schedule, // Save the generated schedule
        },
        { merge: true }
      );
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  
  const generateWorkoutSchedule = (startDate: string, workoutPlan: string, frequency: string) => {
    const schedule: { [date: string]: string } = {};
    const start = new Date(startDate);
    const days = frequency === "6-days a week" ? 6 : 3; // Adjust based on frequency
    
    // Define workout days
    const workoutDays = ["Push", "Pull", "Leg", "Off"];
  
    let currentDate = start;
    let dayIndex = 0;
    while (Object.keys(schedule).length < 30) { // Generate schedule for 30 days as an example
      const dateString = currentDate.toISOString().split("T")[0];
      schedule[dateString] = workoutDays[dayIndex % workoutDays.length];
      currentDate.setDate(currentDate.getDate() + 1);
      dayIndex += 1;
    }
    
    return schedule;
  };

  const handleSelect = (step: number, contentId: number) => {
    setSelectedContent({ ...selectedContent, [step]: contentId });
  };

  const currentStepData: StepData | undefined = stepsData?.find(
    (step) => step.id === currentStep
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 items-center justify-around">
      {/* Progress Bar */}
      <View className="w-3/4">
        <View className="flex-row justify-between mb-2">
          {stepsData?.map((_, index) => (
            <View key={index} className="flex-1 mx-1">
              <View
                className={`h-2 w-full rounded-full ${
                  currentStep > index ? "bg-secondary" : "bg-lightGray"
                }`}
              />
            </View>
          ))}
        </View>

        {/* Current Step Title */}
        <Text className="ml-1 text-lg mt-2">
          {stepsData?.[currentStep - 1]?.stepTitle}
        </Text>
      </View>

      {/* Current Step Content */}
      {currentStep === 4 ? (
        <>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Fontisto name="date" size={24} color={Colors.dark} />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display="calendar"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
          {selectedDate && (
            <Text className="mt-4">
              Selected Date: {selectedDate.toLocaleDateString("en-GB")}
            </Text>
          )}
        </>
      ) : (
        currentStepData && (
          <Step
            step={currentStep}
            data={currentStepData}
            onSelect={handleSelect}
          />
        )
      )}

      {/* Navigation Controls */}
      <View className="flex-row justify-between mt-4 w-3/4">
        {currentStep > 1 && (
          <TouchableOpacity onPress={handleBack} className="p-2">
            <Ionicons name="arrow-back" size={24} color="blue" />
          </TouchableOpacity>
        )}
        {currentStep < (stepsData?.length || 0) ? (
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
