import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { useData } from "@/context/DataContext";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import CustomizedDialog from "./CustomizedDialogPanel";

const WorkoutTrackView = () => {
  const { currentExercises, currentWorkout } = useData();
  const [photoUris, setPhotoUris] = useState<string[]>(Array(3).fill(""));
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openDialog = (index: number) => {
    setSelectedIndex(index);
    setDialogVisible(true);
  };

  const closeDialog = () => setDialogVisible(false);

  const chooseFromGallery = async () => {
    if (selectedIndex === null) return;

    try {
      // Request media library permissions
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "You need to grant permissions to access the photo library."
        );
        return;
      }

      // Launch image picker
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setPhotoUris((prevUris) =>
          prevUris.map((uri, i) =>
            i === selectedIndex ? result.assets[0].uri : uri
          )
        );
      }
    } catch (error) {
      console.error("Error choosing from gallery:", error);
      Alert.alert(
        "Error",
        "An error occurred while choosing the image. Please try again."
      );
    }
    closeDialog();
  };
  
  const takePhoto = async () => {
    if (selectedIndex === null) return;

    try {
      // Request camera permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "You need to grant permissions to access the camera."
        );
        return;
      }

      // Launch camera
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setPhotoUris((prevUris) =>
          prevUris.map((uri, i) =>
            i === selectedIndex ? result.assets[0].uri : uri
          )
        );
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert(
        "Error",
        "An error occurred while taking the photo. Please try again."
      );
    }
    closeDialog();
  };

  return (
    <View className="mt-2">
      {/* Image Insert*/}
      <View className="flex flex-row justify-around gap-2">
        {photoUris.map((photoUri, index) => (
          <TouchableOpacity
            key={index}
            className="w-28 h-28 rounded-md bg-lightGray items-center justify-center"
            onPress={() => openDialog(index)}
          >
            {photoUri ? (
              <Image
                source={{ uri: photoUri }}
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <MaterialIcons
                  name="add-photo-alternate"
                  size={24}
                  color={Colors.gray}
                />
                <Text>Add photo</Text>
              </>
            )}
          </TouchableOpacity>
        ))}
      </View>
      {/* Custom Dialog */}
      <CustomizedDialog
        visible={dialogVisible}
        onDismiss={closeDialog}
        onTakePhoto={takePhoto}
        onChooseFromGallery={chooseFromGallery}
      />
      {/* Exercise Inputs*/}
      {/* Finish Button*/}
    </View>
  );
};

export default WorkoutTrackView;
