import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { useData } from "@/context/DataContext";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";

const WorkoutTrackView = () => {
  const { currentExercises, currentWorkout } = useData();
  const [photoUris, setPhotoUris] = useState<string[]>(Array(3).fill(""));

  const pickImage = async (index: number) => {
    Alert.alert(
      "Select Image",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: () => takePhoto(index),
        },
        {
          text: "Choose from Gallery",
          onPress: () => chooseFromGallery(index),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };  

  const takePhoto = async (index: number) => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUris((prevUris) =>
        prevUris.map((uri, i) => (i === index ? result.assets[0].uri : uri))
      );
    }
  };

  const chooseFromGallery = async (index: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setPhotoUris((prevUris) =>
        prevUris.map((uri, i) => (i === index ? result.assets[0].uri : uri))
      );
    }
  };

  return (
    <View className="mt-2">
      {/* Image Insert*/}
      <View className="flex flex-row justify-around gap-2">
        {photoUris.map((photoUri, index) => (
          <TouchableOpacity
            key={index}
            className="w-28 h-28 rounded-md bg-lightGray items-center justify-center"
            onPress={() => pickImage(index)}
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

      {/* Exercise Inputs*/}
      {/* Finish Button*/}
    </View>
  );
};

export default WorkoutTrackView;
