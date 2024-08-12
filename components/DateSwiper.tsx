import React, { useRef, useState } from "react";
import { Dimensions, View, Text, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import moment from "moment";
import { SetData, UserDoc } from "@/constants/Interfaces";
import useWeeks from "@/hooks/useWeeks";
import { useCombinedWorkoutData } from "@/context/CombinedWorkoutDataContext";
import useGetDateString from "@/hooks/useGetDateString";
import AddDataDialogPanel from "./DialogPanels/AddDataDialogPanel";

const DateSwiper = () => {
  const swiper = useRef<Swiper | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentWeekOffset, setCurrentWeekOffset] = useState<number>(0);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [currentWorkoutDay, setCurrentWorkoutDay] = useState<string>("");
  const [allowedExercises, setAllowedExercises] = useState<string[]>([]);

  const weeks = useWeeks(currentWeekOffset);
  const { normalizeDate, formatDate } = useGetDateString();

  const selectedDateNormalized = normalizeDate(new Date(selectedDate));
  const selectedDateString = formatDate(selectedDateNormalized);

  const { userDoc, exercises } = useCombinedWorkoutData();
  const { schedule } = userDoc as UserDoc;
  
  const scheduledExerciseSetsForDate = Object.entries(schedule)
    .filter(([date, _]) => date === selectedDateString)
    .map(([date, workoutData]) => ({
      date,
      exerciseSets: workoutData.exerciseSets,
      day: workoutData.currentWorkout
    }));

  const exerciseSets = scheduledExerciseSetsForDate[0]?.exerciseSets || {};

  const handleIndexChange = (index: number) => {
    if (index === 1) return;

    const newIndex = index - 1;
    const newWeekOffset = currentWeekOffset + newIndex;

    setCurrentWeekOffset(newWeekOffset);
    setSelectedDate(moment(selectedDate).add(newIndex, "week").toDate());

    setTimeout(() => {
      swiper.current?.scrollTo(1, false);
    }, 100);
  };

  const handleAddData = () => {
    const workoutDay = scheduledExerciseSetsForDate[0].day;

    if (workoutDay === "Off") {
      console.log("No workout scheduled for this day.");
      return;
    }
    
    const allowedExercises = exercises?.find((ex) => ex.day === workoutDay)?.exercises || [];
    
    setAllowedExercises(allowedExercises);
    setCurrentWorkoutDay(workoutDay);
    setDialogVisible(true);
  };

  const handleSaveData = (updatedExercises: { [exercise: string]: SetData[] }) => {
    console.log("Saved data:", updatedExercises);
    // to be continued
  };

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
          <Text className="text-lg font-semibold text-gray">
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
            flexBasis: "auto",
          }}
          className="overflow-hidden rounded-lg"
        >
          {/* Mapping through exerciseSets */}
          {Object.keys(exerciseSets).length ? (
            Object.entries(exerciseSets).map(([exercise, sets], index) => (
              <View key={index} className="mb-2">
                <Text className="font-semibold text-lg text-primary mb-2">
                  {exercise}
                </Text>
                {(sets as SetData[]).map((set, setIndex) => (
                  <Text key={setIndex} className="text-gray mb-1">
                    {`Set ${setIndex + 1}: ${set.kg} kg x ${set.rep} reps`}
                  </Text>
                ))}
              </View>
            ))
          ) : (
            <Text className="text-gray">No data available</Text>
          )}
        </View>
      </View>
      
      {/* AddDataDialogPanel */}
      <AddDataDialogPanel
        visible={dialogVisible}
        onClose={() => setDialogVisible(false)}
        workoutDay={currentWorkoutDay}
        exercises={allowedExercises}
        onSave={handleSaveData}
      />
    </>
  );
};

export default DateSwiper;
