import { Text, TouchableOpacity } from "react-native";
import React from "react";

interface ActionButtonProps {
  onPress: () => void;
  title: string;
}

const ActionButton = ({ onPress, title }: ActionButtonProps) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        className="mt-2 justify-center flex items-center bg-black p-2 rounded"
      >
        <Text className="text-white leading-2">{title}</Text>
      </TouchableOpacity>
    </>
  );
};

export default ActionButton;
