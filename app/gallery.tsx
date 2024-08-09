import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import CardDeck from "@/components/CardDeck";
import { useCombinedWorkoutData } from "@/context/CombinedWorkoutDataContext";

interface ScheduleEntry {
  currentWorkout: string;
  exerciseSets: any[]; 
  photoUris: string[];
  status?: string;
}

interface Schedule {
  [date: string]: ScheduleEntry;
}

interface UserDoc {
  schedule: Schedule;
}

const Gallery = () => {
  const { userDoc } = useCombinedWorkoutData();
  const { schedule } = userDoc as UserDoc;
  const photosWithDates = Object.entries(schedule).flatMap(([date, entry]) => 
    entry.photoUris
      .map(uri => ({ uri, date }))
  );
  console.log(photosWithDates);

  return (
    <View className="flex-1 p-4 items-center justify-between">
      <CardDeck photos={photosWithDates} />
    </View>
  );
};

export default Gallery;
