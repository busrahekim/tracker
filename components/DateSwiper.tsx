import React, { useRef, useState } from "react";
import {
  Dimensions,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";
import moment from "moment";
import { SetData, UserDoc } from "@/constants/Interfaces";
import useWeeks from "@/hooks/useWeeks";
import { useCombinedWorkoutData } from "@/context/CombinedWorkoutDataContext";
import useGetDateString from "@/hooks/useGetDateString";

const normalizeDate = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const DateSwiper = () => {
  const swiper = useRef<Swiper | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentWeekOffset, setCurrentWeekOffset] = useState<number>(0);

  const weeks = useWeeks(currentWeekOffset);
  const { selectedDateNormalized, selectedDateString } =
    useGetDateString(selectedDate);
  console.log(selectedDateString);

  const { userDoc } = useCombinedWorkoutData();
  const { schedule } = userDoc as UserDoc;

  const scheduledExercisesForDate = Object.entries(schedule)
    .filter(([date, workoutData]) => date === selectedDateString)
    .map(([date, workoutData]) => ({
      date,
      exerciseSets: workoutData.exerciseSets,
    }));
  console.log(scheduledExercisesForDate);

  // Filter non-empty exerciseSets
  const nonEmptyExerciseSets = Object.entries(schedule)
    .filter(
      ([date, workoutData]) => Object.keys(workoutData.exerciseSets).length > 0
    )
    .map(([date, workoutData]) => ({
      date,
      exerciseSets: workoutData.exerciseSets,
    }));

  const selectedDateData = nonEmptyExerciseSets.find(
    (entry) => entry.date === selectedDateString
  );

  const handleIndexChange = (index: number) => {
    if (index === 1) {
      return;
    }

    const newIndex = index - 1;
    const newWeekOffset = currentWeekOffset + newIndex;

    setCurrentWeekOffset(newWeekOffset);
    setSelectedDate(moment(selectedDate).add(newIndex, "week").toDate());

    setTimeout(() => {
      swiper.current?.scrollTo(1, false);
    }, 100);
  };

  //TODO: user is allowed to previous data only for corresponding workout day
  // if that day was "Push" and forget, user can only add data for "Push" exercises
  const handleAddData = () => {};

  return (
    <>
      <View className="flex-1 max-h-20 flex-row py-3 items-center">
        <Swiper
          index={1}
          ref={swiper}
          loop={false}
          showsPagination={false}
          onIndexChanged={handleIndexChange}
        >
          {weeks.map((dates, weekIndex) => (
            <View
              style={{
                width: Dimensions.get("window").width,
              }}
              className="flex-row items-start justify-between px-3"
              key={weekIndex}
            >
              {dates.map((item, dateIndex) => {
                const itemDateNormalized = normalizeDate(item.date);
                const isActive =
                  formatDate(selectedDateNormalized) ===
                  formatDate(itemDateNormalized);

                return (
                  <TouchableWithoutFeedback
                    key={dateIndex}
                    onPress={() => setSelectedDate(item.date)}
                  >
                    <View
                      className={`flex-1 h-12 mx-1 border rounded-lg border-gray flex-col items-center ${
                        isActive && "bg-primary border-primary"
                      }`}
                    >
                      <Text
                        className={`text-sm font-semibold text-gray ${
                          isActive && "text-background"
                        }`}
                      >
                        {item.weekday}
                      </Text>
                      <Text
                        className={`font-semibold text-lg text-primary ${
                          isActive && "text-background"
                        } `}
                      >
                        {item.date.getDate()}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          ))}
        </Swiper>
      </View>
      <View className="flex-1 p-4">
        <View className="flex flex-row items-center justify-between mb-2">
          <Text className="text-lg font-semibold  text-gray">
            {selectedDate.toDateString()}
          </Text>
          <TouchableOpacity
            className="bg-primary rounded p-1"
            onPress={handleAddData}
          >
            <Text className="font-semibold text-background">Add Data</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 0,
            height: 400,
            marginTop: 0,
            padding: 0,
            backgroundColor: "transparent",
          }}
        >
          <View
            style={{
              borderWidth: 4,
              borderColor: "#e5e7eb",
              borderStyle: "dashed",
              borderRadius: 9,
              flexGrow: 1,
              flexShrink: 1,
              flexBasis: 0,
            }}
          >
            {/* Display the exerciseSets if there is data for the selectedDate */}
            {selectedDateData ? (
              <View>
                {Object.entries(selectedDateData.exerciseSets).map(
                  ([exerciseName, sets], index) => (
                    <View key={index} className="mb-2">
                      <Text className="font-semibold text-lg text-primary">
                        {exerciseName}
                      </Text>
                      {(sets as SetData[]).map((set, setIndex) => (
                        <Text key={setIndex}>
                          Set {setIndex + 1}: {set.kg} kg x {set.rep} reps
                        </Text>
                      ))}
                    </View>
                  )
                )}
              </View>
            ) : (
              <Text className="text-gray text-center">No exercise data</Text>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default DateSwiper;
