import React from "react";
import { View, Text } from "react-native";

const CardDeck = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <View className="w-24 h-36 bg-background border rounded-md absolute justify-center items-center z-0 translate-x-0 translate-y-0">
        <Text className="text-lg">Card 1</Text>
      </View>
      <View className="w-24 h-36 bg-background border rounded-md absolute justify-center items-center z-10 translate-x-5 translate-y-5">
        <Text className="text-lg">Card 2</Text>
      </View>
      <View className="w-24 h-36 bg-background border rounded-md absolute justify-center items-center z-20 translate-x-10 translate-y-10">
        <Text className="text-lg">Card 3</Text>
      </View>
    </View>
  );
};

export default CardDeck;
