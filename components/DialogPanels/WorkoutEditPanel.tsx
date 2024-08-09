import Colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { Modal, Portal, Button, TextInput, List } from "react-native-paper";

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
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={{
          backgroundColor: "white",
          padding: 15,
          margin: 20,
          borderRadius: 10,
        }}
      >
        <ScrollView>
          <TextInput
            label="Workout Name"
            value={workout}
            onChangeText={setWorkout}
            className="mb-2 bg-lightGray"
            disabled
          />

          <List.Section>
            <List.Subheader className="text-lg font-bold">
              Exercises
            </List.Subheader>
            {exercises.map((exercise, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <TextInput
                  key={index}
                  label={`Exercise ${index + 1}`}
                  value={exercise}
                  onChangeText={(text) =>
                    setExercises((prev) =>
                      prev.map((ex, i) => (i === index ? text : ex))
                    )
                  }
                  className="flex-1 bg-lightGray"
                />
                <TouchableOpacity
                  onPress={() => handleDeleteExercise(index)}
                  className="ml-2"
                >
                  <AntDesign name="delete" size={24} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            ))}
            <Button
              icon="plus"
              mode="contained"
              onPress={handleAddExercise}
              className="mt-2 bg-primary"
            >
              Add Exercise
            </Button>
          </List.Section>

          <Button
            mode="contained"
            onPress={handleSave}
            className="mt-2 bg-secondary"
          >
            Save Changes
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default WorkoutEditPanel;
