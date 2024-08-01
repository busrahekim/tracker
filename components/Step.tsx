import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { StepData } from "@/constants/Steps";

interface StepProps {
  step: number;
  data: StepData;
  onSelect: (step: number, contentId: number) => void;
}

const Step = ({ step, data, onSelect }: StepProps) => {
  const [selectedContentId, setSelectedContentId] = useState<number | null>(
    null
  );

  const handleSelect = (contentId: number) => {
    setSelectedContentId(contentId);
    onSelect(step, contentId);
  };

  return (
    <View className="w-3/4">
      {data.content.map((item) => (
        <TouchableOpacity
          key={item.contentId}
          className={`mb-2 p-2 border rounded ${
            selectedContentId === item.contentId
              ? "border-secondary bg-secondary"
              : "bg-gray-100"
          }`}
          onPress={() => handleSelect(item.contentId)}
        >
          <Text
            className={`text-lg font-bold ${
              selectedContentId === item.contentId ? "text-white" : "text-black"
            }`}
          >
            {item.title}
          </Text>
          {item.description ? (
            <Text
              className={`text-sm ${
                selectedContentId === item.contentId
                  ? "text-blue-500"
                  : "text-gray"
              }`}
            >
              {item.description}
            </Text>
          ) : null}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Step;
