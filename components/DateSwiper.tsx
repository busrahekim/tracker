import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import Swiper from "react-native-swiper";
import moment from "moment";
import useWeeks from "@/hooks/useWeeks";

const { width } = Dimensions.get("window");


const DateSwiper = () => {
  const swiper = useRef<Swiper | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentWeekOffset, setCurrentWeekOffset] = useState<number>(0);

  const weeks = useWeeks(currentWeekOffset);

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

//   console.log(selectedDate.toISOString().split("T")[0]);
  

  return (
    <>
      <View style={styles.picker}>
        <Swiper
          index={1}
          ref={swiper}
          loop={false}
          showsPagination={false}
          onIndexChanged={handleIndexChange}
        >
          {weeks.map((dates, weekIndex) => (
            <View style={styles.itemRow} key={weekIndex}>
              {dates.map((item, dateIndex) => {
                const isActive =
                  selectedDate.toDateString() === item.date.toDateString();
                return (
                  <TouchableWithoutFeedback
                    key={dateIndex}
                    onPress={() => setSelectedDate(item.date)}
                  >
                    <View
                      style={[
                        styles.item,
                        isActive && {
                          backgroundColor: "#111",
                          borderColor: "#111",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.itemWeekday,
                          isActive && { color: "#fff" },
                        ]}
                      >
                        {item.weekday}
                      </Text>
                      <Text
                        style={[styles.itemDate, isActive && { color: "#fff" }]}
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
      <View style={styles.footerContainer}>
        <Text style={styles.subtitle}>{selectedDate.toDateString()}</Text>
        <View style={styles.placeholder}>
          <View style={styles.placeholderInset}>
            {/* Replace with your content */}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  header: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  footerContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },

  subtitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#999999",
    marginBottom: 12,
  },
  footer: {
    marginTop: "auto",
    paddingHorizontal: 16,
  },
  /** Item */
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#e3e3e3",
    flexDirection: "column",
    alignItems: "center",
  },
  itemRow: {
    width: width,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: "500",
    color: "#737373",
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
    backgroundColor: "transparent",
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: "#e5e7eb",
    borderStyle: "dashed",
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#007aff",
    borderColor: "#007aff",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});

export default DateSwiper;
