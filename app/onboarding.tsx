import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Step from "@/components/Step";
import { StepData } from "@/constants/Steps";
import { FIRESTORE_DB } from "@/firebaseConfig";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "@/constants/Colors";
import Loading from "@/components/Loading";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedContent, setSelectedContent] = useState<
    Record<number, number>
  >({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [stepsData, setStepsData] = useState<StepData[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  };

  useEffect(() => {
    const fetchStepsFromFirestore = async () => {
      const stepsRef = collection(FIRESTORE_DB, "steps");
      const stepsSnapshot = await getDocs(stepsRef);

      const steps = [];

      for (const stepDoc of stepsSnapshot.docs) {
        const stepData = stepDoc.data();
        const contentRef = collection(stepDoc.ref, "content");
        const contentSnapshot = await getDocs(contentRef);

        const contentData = contentSnapshot.docs.map((doc) => doc.data());

        steps.push({ ...stepData, content: contentData });
      }

      setStepsData(steps as StepData[]);
      setLoading(false);
    };

    fetchStepsFromFirestore();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleNext = () => {
    if (currentStep < stepsData.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const userDoc = doc(FIRESTORE_DB, "users", user.uid);

      const formattedDate = selectedDate
        ? selectedDate.toISOString().split("T")[0]
        : "";

      try {
        await setDoc(
          userDoc,
          {
            workoutPlan:
              stepsData[0].content.find(
                (c) => c.contentId === selectedContent[1]
              )?.title || "",
            unit:
              stepsData[1].content.find(
                (c) => c.contentId === selectedContent[2]
              )?.title || "",
            frequency:
              stepsData[2].content.find(
                (c) => c.contentId === selectedContent[3]
              )?.title || "",
            startDate: formattedDate,
          },
          { merge: true }
        );
        setLoading(false);
        router.replace("/(tabs)/home");
      } catch (error) {
        console.error("Error updating document: ", error);
        setLoading(false);
      }
    }
  };

  const handleSelect = (step: number, contentId: number) => {
    setSelectedContent({ ...selectedContent, [step]: contentId });
  };

  const currentStepData: StepData | undefined = stepsData.find(
    (step) => step.id === currentStep
  );

  return (
    <View className="flex-1 items-center justify-around">
      {/* Progress Bar */}
      <View className="w-3/4">
        <View className="flex-row justify-between mb-2">
          {stepsData.map((_, index) => (
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
          {stepsData[currentStep - 1]?.stepTitle}
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
              Selected Date: {selectedDate.toLocaleDateString()}
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
        {currentStep < stepsData.length ? (
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
