import Colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";

interface WorkoutEditPanelProps {
  visible: boolean;
  onClose: () => void;
  currentWorkout: string;
  currentExercises: string[];
  onSave: (workout: string, exercises: string[]) => void;
}

const WorkoutEditPanel: React.FC<WorkoutEditPanelProps> = ({
  visible,
  onClose,
  currentWorkout,
  currentExercises,
  onSave,
}) => {
  const [workout, setWorkout] = useState(currentWorkout);
  const [exercises, setExercises] = useState(currentExercises);

  useEffect(() => {
    setWorkout(currentWorkout);
    setExercises(currentExercises);
  }, [currentWorkout, currentExercises]);

  const handleDeleteExercise = (index: number) => {
    if (exercises.length === 1) {
      Alert.alert(
        "Cannot Delete",
        "You must have at least one exercise.",
        [{ text: "OK" }],
        { cancelable: true }
      );
      return;
    }
    setExercises((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddExercise = () => {
    if (exercises.length >= 7) {
      Alert.alert(
        "Limit Reached",
        "A workout can have a maximum of 7 exercises.",
        [{ text: "OK" }],
        { cancelable: true }
      );
      return;
    }
    setExercises([...exercises, ""]);
  };

  const handleSave = () => {
    onSave(workout, exercises);
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View
        className="flex-1 justify-center items-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          className="bg-background rounded-md p-5"
          style={{
            width: "90%",
          }}
        >
          <Text className="text-lg font-bold mb-2">
            Workout Name: {workout}
          </Text>

          <Text className="text-lg font-bold mb-2">Exercises</Text>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
            {exercises.map((exercise, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <TextInput
                  key={index}
                  placeholder={`Exercise ${index + 1}`}
                  value={exercise}
                  onChangeText={(text) =>
                    setExercises((prev) =>
                      prev.map((ex, i) => (i === index ? text : ex))
                    )
                  }
                  className="flex-1 rounded p-2 bg-lightGray"
                  placeholderTextColor={Colors.primary}
                />
                <TouchableOpacity
                  onPress={() => handleDeleteExercise(index)}
                  className="ml-2"
                >
                  <AntDesign name="delete" size={20} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              onPress={handleAddExercise}
              className="mt-2 p-2 rounded bg-primary items-center justify-center"
            >
              <Text className="text-background"> + Add Exercise</Text>
            </TouchableOpacity>
          </ScrollView>

          <View className="flex-row justify-end mt-4">
            <TouchableOpacity onPress={onClose} className="p-2 rounded">
              <Text className="font-semibold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              className="p-2 ml-2 rounded bg-secondary"
            >
              <Text className="text-white font-semibold">Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WorkoutEditPanel;
