import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useRef, useState } from "react";
import { DropdownProps } from "@/constants/Interfaces";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const CustomDropdown = ({
  selectedValue,
  onValueChange,
  options,
  disabled = false,
}: DropdownProps) => {
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef<View>(null);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setVisible(false);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setVisible((prev) => !prev);
    }
  };

  return (
    <View className="relative" ref={dropdownRef}>
      <TouchableOpacity
        className={`bg-lightGray rounded p-2 flex-row items-center justify-between`}
        onPress={toggleDropdown}
        accessibilityLabel="Select unit"
        accessibilityHint={`Current selection is ${selectedValue}`}
        disabled={disabled}
      >
        <Text>{`Current unit: ${selectedValue}`}</Text>
        <AntDesign name="caretdown" size={16} color={Colors.gray} />
      </TouchableOpacity>

      {visible && !disabled && (
        <View
          className="absolute top-full left-0 w-full bg-background rounded z-10 "
          style={{ elevation: 5 }}
        >
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="p-3 border-b-2 border-b-lightGray"
                onPress={() => handleSelect(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default CustomDropdown;
