import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dialog, Portal, Button as PaperButton } from "react-native-paper";
import { SetData } from "@/constants/Interfaces";
import { useCombinedWorkoutData } from "@/context/CombinedWorkoutDataContext";

interface AddDataDialogPanelProps {
  visible: boolean;
  onClose: () => void;
  workoutDay: string;
  exercises: string[];
  onSave: (updatedExercises: { [exercise: string]: SetData[] }) => void;
}

const AddDataDialogPanel: React.FC<AddDataDialogPanelProps> = ({
  visible,
  onClose,
  workoutDay,
  exercises,
  onSave,
}) => {
  const { exerciseSets, setExerciseSets } =
    useCombinedWorkoutData();

  const [exerciseData, setExerciseData] = useState<{
    [exercise: string]: SetData[];
  }>({});

  useEffect(() => {
    const initialData: { [exercise: string]: SetData[] } = {};
    exercises.forEach((exercise) => {
      initialData[exercise] = [{ kg: "", rep: "" }];
    });
    setExerciseData(initialData);
  }, [exercises]);

  const addSet = (exercise: string) => {
    setExerciseData((prevState) => ({
      ...prevState,
      [exercise]: [...prevState[exercise], { kg: "", rep: "" }],
    }));
  };

  const updateSet = (
    exercise: string,
    setIndex: number,
    field: keyof SetData,
    value: string
  ) => {
    const newSets = [...exerciseData[exercise]];
    newSets[setIndex][field] = value;
    setExerciseData((prevState) => ({
      ...prevState,
      [exercise]: newSets,
    }));
    setExerciseSets({ ...exerciseSets, [exercise]: newSets });
    
  };

  const handleSave = () => {
    onSave(exerciseData);
    onClose();
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onClose}
        style={{ maxHeight: "80%", backgroundColor: "white" }}
      >
        <Dialog.Title>{`Add Data for ${workoutDay} Day`}</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
            {Object.entries(exerciseData).map(([exercise, sets], index) => (
              <View key={index}>
                <Text className="font-semibold text-lg text-primary mt-2">
                  {exercise}
                </Text>
                {sets.map((set, setIndex) => (
                  <View
                    key={setIndex}
                    className="flex flex-row items-center mb-2 gap-x-2"
                  >
                    <Text className="flex-1 font-semibold">{`Set ${
                      setIndex + 1
                    }`}</Text>
                    <TextInput
                      className="flex-1 bg-lightGray rounded p-1"
                      placeholder="kg"
                      value={set.kg}
                      onChangeText={(text) =>
                        updateSet(exercise, setIndex, "kg", text)
                      }
                      keyboardType="numeric"
                    />
                    <TextInput
                      className="flex-1 bg-lightGray rounded p-1"
                      placeholder="reps"
                      value={set.rep}
                      onChangeText={(text) =>
                        updateSet(exercise, setIndex, "rep", text)
                      }
                      keyboardType="numeric"
                    />
                  </View>
                ))}
                <TouchableOpacity onPress={() => addSet(exercise)}>
                  <Text className="text-primary mb-2">+ Add Set</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <PaperButton onPress={onClose}>Cancel</PaperButton>
          <PaperButton onPress={handleSave}>Save</PaperButton>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AddDataDialogPanel;
