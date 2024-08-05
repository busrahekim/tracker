import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { Dialog, Portal, Button as PaperButton } from "react-native-paper";

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
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Choose Image Source</Dialog.Title>
        <Dialog.Content className="gap-y-1">
          <TouchableOpacity onPress={onTakePhoto}>
            <Text className="text-lg text-primary">Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onChooseFromGallery}>
            <Text className="text-lg text-primary">Choose from gallery</Text>
          </TouchableOpacity>
        </Dialog.Content>
        <Dialog.Actions>
          <PaperButton onPress={onDismiss}>Cancel</PaperButton>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CustomizedDialog;
