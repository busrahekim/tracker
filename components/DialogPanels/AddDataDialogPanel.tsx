import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SetData } from "@/constants/Interfaces";
import { useCombinedWorkoutData } from "@/context/CombinedWorkoutDataContext";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

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
  const { exerciseSets, setExerciseSets } = useCombinedWorkoutData();

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

  const handleDeleteSet = (exercise: string, setIndex: number) => {
    Alert.alert("Delete Set", "Are you sure you want to delete this set?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          const newSets = exerciseData[exercise].filter(
            (_, index) => index !== setIndex
          );
          setExerciseData((prevState) => ({
            ...prevState,
            [exercise]: newSets,
          }));
          setExerciseSets({ ...exerciseSets, [exercise]: newSets });
        },
      },
    ]);
  };

  const handleSave = () => {
    onSave(exerciseData);
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
            maxHeight: "80%",
          }}
        >
          <Text className="text-lg font-bold mb-2">
            Add Data for {workoutDay} Day
          </Text>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
            {Object.entries(exerciseData).map(([exercise, sets], index) => (
              <View key={index}>
                <Text className="text-lg font-semibold text-primary mt-2">
                  {exercise}
                </Text>
                {sets.map((set, setIndex) => (
                  <View
                    key={setIndex}
                    className="flex-row items-center mb-2 gap-x-2"
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
                      placeholderTextColor={Colors.primary}
                    />
                    <TextInput
                      className="flex-1 bg-lightGray rounded p-1"
                      placeholder="reps"
                      value={set.rep}
                      onChangeText={(text) =>
                        updateSet(exercise, setIndex, "rep", text)
                      }
                      keyboardType="numeric"
                      placeholderTextColor={Colors.primary}
                    />
                    <TouchableOpacity
                      onPress={() => handleDeleteSet(exercise, setIndex)}
                    >
                      <AntDesign
                        name="delete"
                        size={18}
                        color={Colors.primary}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
                <TouchableOpacity onPress={() => addSet(exercise)}>
                  <Text className="text-primary mb-2">+ Add Set</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <View className="flex-row justify-end gap-x-2">
            <TouchableOpacity onPress={onClose}>
              <Text className="font-semibold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text className="font-semibold text-green-500">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddDataDialogPanel;
