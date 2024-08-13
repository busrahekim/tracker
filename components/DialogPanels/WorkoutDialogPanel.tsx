import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Dialog, Portal, Button as PaperButton } from "react-native-paper";
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
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{exerciseTitle}</Dialog.Title>
        <Dialog.Content className="gap-y-1">
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
                  placeholderTextColor={Colors.dark}
                  keyboardType="number-pad"
                  value={set.kg}
                  onChangeText={(text) => updateSet(setIndex, "kg", text)}
                />
                <TextInput
                  className="flex-1 bg-lightGray rounded p-1"
                  placeholder={`rep`}
                  placeholderTextColor={Colors.dark}
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
        </Dialog.Content>
        <Dialog.Actions>
          <PaperButton onPress={() => onSaveSets(sets)}>Done</PaperButton>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default WorkoutDialogPanel;
