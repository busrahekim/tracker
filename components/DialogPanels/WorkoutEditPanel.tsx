import React, { useState } from "react";
import { ScrollView } from "react-native";
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
          />

          <List.Section>
            <List.Subheader className="text-lg font-bold">Exercises</List.Subheader>
            {exercises.map((exercise, index) => (
              <TextInput
                key={index}
                label={`Exercise ${index + 1}`}
                value={exercise}
                onChangeText={(text) =>
                  setExercises((prev) =>
                    prev.map((ex, i) => (i === index ? text : ex))
                  )
                }
                className="mb-2 bg-lightGray"
              />
            ))}
            <Button
              icon="plus"
              mode="contained"
              onPress={() => setExercises([...exercises, ""])}
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
