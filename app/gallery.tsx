import { View, ScrollView, TouchableOpacity, Modal, Image } from "react-native";
import React, { useState } from "react";
import CardDeck from "@/components/CardDeck";
import { useCombinedWorkoutData } from "@/context/CombinedWorkoutDataContext";
import { UserDoc } from "@/constants/Interfaces";

// TODO:

interface PhotoEntry {
  uri: string;
  date: string;
}

const Gallery = () => {
  const { userDoc } = useCombinedWorkoutData();
  const { schedule } = userDoc as UserDoc;

  const [selectedDeck, setSelectedDeck] = useState<PhotoEntry[] | null>(null);

  const photosByDate: { [key: string]: PhotoEntry[] } = {};

  Object.entries(schedule).forEach(([date, entry]) => {
    if (!photosByDate[date]) {
      photosByDate[date] = [];
    }
    entry.photoUris.forEach((uri) => {
      photosByDate[date].push({ uri, date });
    });
  });

  const sortedDates = Object.keys(photosByDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const cardDecks = sortedDates.reduce((decks, date) => {
    const photos = photosByDate[date];
    const validPhotos = photos.filter((photo) => photo.uri.trim() !== "");

    if (validPhotos.length > 0) {
      const filledPhotos = [...photos];

      // If there are less than 3 photos, fill with empty slots
      while (filledPhotos.length < 3) {
        filledPhotos.push({ uri: "", date });
      }

      decks.push(filledPhotos);
    }

    return decks;
  }, [] as PhotoEntry[][]);

  const handleCardDeckPress = (deck: PhotoEntry[]) => {
    setSelectedDeck(deck);
  };

  const handleCloseModal = () => {
    setSelectedDeck(null);
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1">
        <View className="flex-row flex-wrap justify-start">
          {cardDecks.map((deck, index) => (
            <TouchableOpacity
              className="mb-20"
              key={index}
              onPress={() => handleCardDeckPress(deck)}
            >
              <CardDeck photos={deck} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selectedDeck && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={true}
          onRequestClose={handleCloseModal}
        >
          <View
            className="flex-1 justify-center items-center "
            style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
          >
            <TouchableOpacity
              className="absolute top-0 left-0 right-0 bottom-0"
              onPress={handleCloseModal}
            />
            <View className="flex-row">
              {selectedDeck.map((photo, index) => (
                <Image
                  key={index}
                  source={
                    photo.uri.trim()
                      ? { uri: photo.uri }
                      : require("@/assets/images/backgroundImage.jpg")
                  }
                  className="w-24 h-36 object-cover rounded-md bg-background border mx-2"
                />
              ))}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Gallery;
