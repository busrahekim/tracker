import { View } from "react-native";
import React from "react";
import CardDeck from "@/components/CardDeck";
import { useCombinedWorkoutData } from "@/context/CombinedWorkoutDataContext";
import { UserDoc } from "@/constants/Interfaces";

// TODO: collects all photos in one card deck, modify it
// when its clicked cards should be displayed on whole screen with back opacity

const Gallery = () => {
  const { userDoc } = useCombinedWorkoutData();
  const { schedule } = userDoc as UserDoc;
  const photosWithDates = Object.entries(schedule).flatMap(([date, entry]) =>
    entry.photoUris.map((uri) => ({ uri, date }))
  );

  return (
    <View className="flex-1 p-4 items-center justify-between">
      <CardDeck photos={photosWithDates} />
    </View>
  );
};

export default Gallery;
