import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { Link } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useUserDoc from "@/hooks/useUserDoc";

const HomeTabHeader = () => {
  const { top } = useSafeAreaInsets();
  const { userDoc } = useUserDoc();

  const firstLetterOfName = userDoc?.name.charAt(0) || "";

  //TODO:RoundedBtn component either with icon or letter

  return (
    <BlurView intensity={80} tint={"extraLight"} style={{ paddingTop: top }}>
      <View className="flex flex-row items-center justify-around gap-2 mx-2">
        <Link href={"/(tabs)/profile" as `${string}:${string}`} asChild>
          <TouchableOpacity className="rounded-full bg-gray w-10 h-10 justify-center items-center">
            <Text className="text-white font-medium text-lg">
              {firstLetterOfName}
            </Text>
          </TouchableOpacity>
        </Link>

        <View className="flex-1 flex-row justify-center items-center rounded-full bg-lightGray">
          <Ionicons
            style={{ padding: 10 }}
            name="search"
            size={20}
            color={Colors.dark}
          />
          <TextInput
          className="flex-1 text-black bg-lightGray rounded-full p-3 pl-0"
            placeholder="Search"
            placeholderTextColor={Colors.dark}
          />
        </View>
        <View className="rounded-full bg-lightGray w-10 h-10 justify-center items-center">
          <Ionicons name={"stats-chart"} size={20} color={Colors.dark} />
        </View>
        <View className="rounded-full bg-lightGray w-10 h-10 justify-center items-center">
          {/* <Ionicons name={"card"} size={20} color={Colors.dark} /> */}
          <MaterialCommunityIcons name="view-gallery-outline" size={20} color={Colors.dark} />
        </View>
      </View>
    </BlurView>
  );
};

export default HomeTabHeader;
