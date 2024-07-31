import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeTabHeader = () => {
  const { top } = useSafeAreaInsets();
  return (
    <BlurView intensity={80} tint={"extraLight"} style={{ paddingTop: top }} >
      <View className="flex flex-row items-center justify-around h-14 gap-2 px-5 bg-transparent">
        <Link
          href={"/(tabs)/profile" as `${string}:${string}`}
          asChild
        >
          <TouchableOpacity className="rounded-full bg-gray w-10 h-10 justify-center items-center">
            <Text className="text-white font-medium text-lg">A</Text>
          </TouchableOpacity>
        </Link>

        <View style={styles.searchSection}>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={20}
            color={Colors.dark}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={Colors.dark}
          />
        </View>
        <View className="rounded-full bg-lightGray w-10 h-10 justify-center items-center">
          <Ionicons name={"stats-chart"} size={20} color={Colors.dark} />
        </View>
        <View className="rounded-full bg-lightGray w-10 h-10 justify-center items-center">
          <Ionicons name={"card"} size={20} color={Colors.dark} />
        </View>
      </View>
    </BlurView>
  );
};
const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 30,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: Colors.lightGray,
    color: Colors.dark,
    borderRadius: 30,
  },
});
export default HomeTabHeader;
