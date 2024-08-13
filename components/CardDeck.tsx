import { PhotoEntry } from "@/constants/Interfaces";
import React from "react";
import { View, Text, Image } from "react-native";

interface CardDeckProps {
  photos: PhotoEntry[];
}

const CardDeck = ({ photos }: CardDeckProps) => {

  if (photos.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No photos available</Text>
      </View>
    );
  }

   // consider valid uris
  //  const hasValidUri = photos.some(photo => photo.uri.trim() !== "");

  //  if (!hasValidUri) {
  //    // If no valid URIs, skip rendering this deck
  //    return null;
  //  }

  const dateText = photos[0].date;
  return (
    <View className="items-center p-4 h-36">
      <Text className="text-lg text-primary mb-5">{dateText}</Text>
      {photos.map((photo, index) => (
        <View
          key={index}
          className="w-24 h-36 items-center justify-center"
          style={{
            zIndex: (photos.length - index) * 10, // Stacking
            transform: [
              { translateX: index * 10 }, // X offset
              { translateY: index * -150 }, // Y offset
            ],
          }}
        >
          <Image
            source={
              photo.uri.trim()
                ? { uri: photo.uri }
                : require("@/assets/images/bg-empty.jpg")
            }
            className="w-24 h-36 object-cover rounded-md bg-background border"
          />
        </View>
      ))}
    </View>
  );
};

export default CardDeck;
