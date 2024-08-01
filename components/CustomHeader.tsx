import { TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CustomHeaderProps {
  onBackPress: () => void;
}

const CustomHeader = ({ onBackPress }: CustomHeaderProps) => {
  const { top } = useSafeAreaInsets();
  return (
    <TouchableOpacity
      onPress={onBackPress}
      className="absolute left-2"
      style={{ top: top }}
    >
      <Ionicons name="arrow-back" size={34} color={Colors.dark} />
    </TouchableOpacity>
  );
};

export default CustomHeader;
