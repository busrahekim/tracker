import React from "react";
import { Tabs } from "expo-router";
import { Platform, TouchableOpacity, View, Text } from "react-native";
import Colors from "@/constants/Colors";
import { Fontisto, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import TabHeader from "@/components/TabHeader";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors.lightGray,
            paddingVertical: Platform.OS === "ios" ? 20 : 10,
            height: 70,
            marginHorizontal: 10,
            paddingHorizontal: 2,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
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
                style={{
                  height: 45,
                  width: 45,
                  backgroundColor: focused ? Colors.primary : "",
                  borderRadius: 25,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Fontisto name="date" size={size} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="workout"
          options={{
            title: "",
            tabBarIcon: ({ size, color, focused }) => (
              <View
                style={{
                  height: 45,
                  width: 45,
                  backgroundColor: focused ? Colors.primary : "",
                  borderRadius: 25,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="eight-track"
                  size={size}
                  color={color}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="protein"
          options={{
            title: "",
            tabBarIcon: ({ size, color, focused }) => (
              <View
                style={{
                  height: 45,
                  width: 45,
                  backgroundColor: focused ? Colors.primary : "",
                  borderRadius: 25,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="food-apple-outline"
                  size={size}
                  color={color}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "",
            tabBarIcon: ({ size, color, focused }) => (
              <View
                className={`p-3 ${focused ? "bg-primary rounded-full" : ""}`}
              >
                <Ionicons name="person-outline" size={size} color={color} />
              </View>
            ),
            tabBarButton: () => null,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
