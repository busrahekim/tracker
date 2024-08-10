import React, { useRef, useState } from 'react';
import { Dimensions, View, Text, TouchableWithoutFeedback } from 'react-native';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import { SetData, UserDoc } from '@/constants/Interfaces';
import useWeeks from '@/hooks/useWeeks';
import { useCombinedWorkoutData } from '@/context/CombinedWorkoutDataContext';

const normalizeDate = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const DateSwiper = () => {
  const swiper = useRef<Swiper | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentWeekOffset, setCurrentWeekOffset] = useState<number>(0);

  const weeks = useWeeks(currentWeekOffset);

  const { userDoc } = useCombinedWorkoutData();
  const { schedule } = userDoc as UserDoc;

  // Filter non-empty exerciseSets
  const nonEmptyExerciseSets = Object.entries(schedule)
    .filter(([date, workoutData]) => Object.keys(workoutData.exerciseSets).length > 0)
    .map(([date, workoutData]) => ({
      date,
      exerciseSets: workoutData.exerciseSets,
    }));

  const selectedDateNormalized = normalizeDate(new Date(selectedDate));
  const selectedDateString = formatDate(selectedDateNormalized);
  
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
                const isActive = formatDate(selectedDateNormalized) === formatDate(itemDateNormalized);

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
        <Text className="text-lg font-semibold mb-2 text-gray">
          {selectedDate.toDateString()}
        </Text>
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
