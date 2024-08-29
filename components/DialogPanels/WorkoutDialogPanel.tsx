import {
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { SetData } from "@/constants/Interfaces";
import { AntDesign } from "@expo/vector-icons";

interface WorkoutDialogProps {
  visible: boolean;
  onDismiss: () => void;
  exerciseTitle: string;
  initialSets: SetData[];
  onSaveSets: (sets: SetData[]) => void;
}

const WorkoutDialogPanel = ({
  visible,
  onDismiss,
  exerciseTitle,
  initialSets,
  onSaveSets,
}: WorkoutDialogProps) => {
  const [sets, setSets] = useState<SetData[]>([]);

  useEffect(() => {
    setSets(initialSets);
  }, [initialSets]);

  const addSet = () => {
    setSets([...sets, { kg: "", rep: "" }]);
  };

  const updateSet = (
    index: number,
    field: keyof { kg: string; rep: string },
    value: string
  ) => {
    const newSets = [...sets];
    newSets[index][field] = value;
    setSets(newSets);
  };

  const handleDeleteSet = (index: number) => {
    const newSets = sets.filter((_, setIndex) => setIndex !== index);
    setSets(newSets);
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
          <Text className="text-lg font-bold mb-2">{exerciseTitle}</Text>
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 16 }}
            className="gap-y-1"
          >
            <View className="">
              {/* Add two sets of inputs for each exercise */}
              {sets.map((set, setIndex) => (
                <View
                  key={setIndex}
                  className="flex flex-row justify-around gap-2 items-center mt-2"
                >
                  <Text className="flex-1 font-bold text-lg uppercase">{`Set ${
                    setIndex + 1
                  }`}</Text>
                  <TextInput
                    className="flex-1 bg-lightGray rounded p-1"
                    placeholder={`kg`}
                    placeholderTextColor={Colors.primary}
                    keyboardType="number-pad"
                    value={set.kg}
                    onChangeText={(text) => updateSet(setIndex, "kg", text)}
                  />
                  <TextInput
                    className="flex-1 bg-lightGray rounded p-1"
                    placeholder={`rep`}
                    placeholderTextColor={Colors.primary}
                    keyboardType="number-pad"
                    value={set.rep}
                    onChangeText={(text) => updateSet(setIndex, "rep", text)}
                  />
                  <TouchableOpacity onPress={() => handleDeleteSet(setIndex)}>
                    <AntDesign name="delete" size={24} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity onPress={addSet} className="items-start mt-2">
                <Text className="text-primary font-bold">+ Add set</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View className="flex-row justify-end">
            <TouchableOpacity onPress={() => onSaveSets(sets)}>
              <Text className="font-semibold">Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WorkoutDialogPanel;
