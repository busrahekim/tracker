import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface ProteinIntakeGraphProps {
  breakfastIntake: string;
  lunchIntake: string;
  dinnerIntake: string;
}

const ProteinIntakeGraph = ({
  breakfastIntake,
  lunchIntake,
  dinnerIntake,
}: ProteinIntakeGraphProps) => {
  const breakfast = parseInt(breakfastIntake, 10) || 0;
  const lunch = parseInt(lunchIntake, 10) || 0;
  const dinner = parseInt(dinnerIntake, 10) || 0;

  // Maximum value for scaling the bars
  const maxIntake = Math.max(breakfast, lunch, dinner, 100);
  return (
    <View className="flex-1 justify-center items-center mt-4">
      <Text className="text-lg font-bold mb-2">
        Protein Intake Visualization
      </Text>
      <View style={styles.graphContainer}>
        <View
          style={[
            styles.bar,
            {
              height: `${(breakfast / maxIntake) * 100}%`,
              backgroundColor: "blue",
            },
          ]}
        >
          <Text style={styles.barLabel}>Breakfast</Text>
        </View>
        <View
          style={[
            styles.bar,
            {
              height: `${(lunch / maxIntake) * 100}%`,
              backgroundColor: "green",
            },
          ]}
        >
          <Text style={styles.barLabel}>Lunch</Text>
        </View>
        <View
          style={[
            styles.bar,
            {
              height: `${(dinner / maxIntake) * 100}%`,
              backgroundColor: "red",
            },
          ]}
        >
          <Text style={styles.barLabel}>Dinner</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  graphContainer: {
    width: "100%",
    height: 200, // Set the height of the graph container
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  bar: {
    width: 50,
    borderRadius: 5,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 5,
  },
  barLabel: {
    color: "white",
    fontWeight: "bold",
  },
});
export default ProteinIntakeGraph;
