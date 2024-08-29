import { Text, TouchableOpacity, Modal, View, ScrollView } from "react-native";
import React from "react";

interface CustomizedDialogProps {
  visible: boolean;
  onDismiss: () => void;
  onTakePhoto: () => void;
  onChooseFromGallery: () => void;
}

const CustomizedDialog = ({
  visible,
  onDismiss,
  onTakePhoto,
  onChooseFromGallery,
}: CustomizedDialogProps) => {
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
          <Text className="text-lg font-bold mb-2">Choose Image Source</Text>
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 16 }}
            className="gap-y-1"
          >
            <TouchableOpacity onPress={onTakePhoto}>
              <Text className="text-lg text-primary">Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onChooseFromGallery}>
              <Text className="text-lg text-primary">Choose from gallery</Text>
            </TouchableOpacity>
          </ScrollView>
          <View className="flex-row justify-end">
            <TouchableOpacity onPress={onDismiss}>
              <Text className="font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomizedDialog;
