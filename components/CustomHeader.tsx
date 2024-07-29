import {
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
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
    <SafeAreaView>
      <View className="relative w-full h-64">
        <Image
          className="w-full absolute h-full object-cover"
          source={require("@/assets/images/topVector2.png")}
        />
        <TouchableOpacity
          onPress={onBackPress}
          className="absolute left-2"
          style={{ top: top }}
        >
          <Ionicons name="arrow-back" size={34} color={Colors.dark} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;
