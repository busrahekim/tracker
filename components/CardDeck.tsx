import React from "react";
import { View, Text, Image } from "react-native";

interface CardDeckProps {
  photos: { uri: string; date: string }[];
}

const CardDeck = ({ photos }: CardDeckProps) => {
  // consider empty uris
  const validPhotos = photos.filter((photo) => photo.uri.trim() !== "");

  if (validPhotos.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No photos available</Text>
      </View>
    );
  }

  const dateText = validPhotos[0].date;
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg text-primary mb-5">{dateText}</Text>
      {validPhotos.map((photo, index) => (
        <View
          key={index}
          className="w-24 h-36 items-center justify-center"
          style={{
            zIndex: (validPhotos.length - index) * 10, // Stacking
            transform: [
              { translateX: index * 10 }, // X offset
              { translateY: index * -150 }, // Y offset
            ],
          }}
        >
          <Image
            source={{ uri: photo.uri }}
            className="w-24 h-36 object-cover rounded-md bg-background border"
          />
        </View>
      ))}
    </View>
  );
};

export default CardDeck;
