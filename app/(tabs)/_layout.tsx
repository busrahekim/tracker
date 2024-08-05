import React from "react";
import { Tabs } from "expo-router";
import { View } from "react-native";
import Colors from "@/constants/Colors";
import {
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import TabHeader from "@/components/TabHeader";

export default function TabLayout() {
  return (
    <Tabs
      // screenOptions={{
      //   tabBarActiveTintColor: Colors.primary,
      //   tabBarBackground: () => (
      //     <BlurView
      //       intensity={100}
      //       tint="light"
      //       className="flex-1  "
      //     />
      //   ),
      //   tabBarStyle: {
      //     backgroundColor: "transparent",
      //     elevation: 0,
      //     borderTopWidth: 0,
      //     position: "absolute",
      //     bottom: 0,
      //     left: 0,
      //     right: 0,
      //   },

      // headerShown: true,
      // }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.lightGray,
          position: "absolute",
          bottom: 10,
          justifyContent: "center",
          alignSelf: "center",
          height: 60,
          marginHorizontal: 10,
          padding: 2,
          borderRadius: 10,
        },
        tabBarShowLabel: false,
        tabBarInactiveTintColor: Colors.gray,
        tabBarActiveTintColor: Colors.lightGray,
        headerTransparent: true,
        header: () => <TabHeader />,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Track",
          tabBarIcon: ({ size, color, focused }) => (
            <View
              className={`p-3  ${focused ? "bg-primary rounded-full" : ""}`}
            >
              <Fontisto name="date" size={size} color={color} />
            </View>
          ),
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors.dark}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
          // headerTransparent: true,
          // header: () => <HomeTabHeader />,
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          title: "",
          tabBarIcon: ({ size, color, focused }) => (
            <View
              className={`p-3 ${focused ? "bg-primary  rounded-full" : ""}`}
            >
              <MaterialCommunityIcons
                name="eight-track"
                size={size}
                color={color}
              />
            </View>
          ),
          // headerTransparent: true,
          // header: () => <HomeTabHeader />,
        }}
      />
      <Tabs.Screen
        name="protein"
        options={{
          title: "",
          tabBarIcon: ({ size, color, focused }) => (
            <View className={`p-3 ${focused ? "bg-primary rounded-full" : ""}`}>
              <MaterialCommunityIcons name="food-apple-outline" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ size, color, focused }) => (
            <View className={`p-3 ${focused ? "bg-primary rounded-full" : ""}`}>
              <Ionicons name="person-outline" size={size} color={color} />
            </View>
          ),
          tabBarButton: () => null
        }}
      />
    </Tabs>
  );
}
