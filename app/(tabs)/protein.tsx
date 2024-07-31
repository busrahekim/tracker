import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "@/firebaseConfig";
import { BlurView } from "expo-blur";

const Protein = () => {
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userDocRef = doc(FIRESTORE_DB, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setIsPremium(userDoc.data()?.isPremium || false);
          } else {
            console.log("No such document!");
          }
        } else {
          console.log("No authenticated user found!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center p-4">
      <View className="absolute">
        <Text className="text-lg">
          Welcome to the Protein Tab - Exclusive Content for Premium Users!
        </Text>
      </View>

      {isPremium === false ? (
        <View className="w-full h-full justify-center">
          <BlurView intensity={100} tint="light">
            <View className="w-full h-full justify-center items-center">
              <TouchableOpacity className="rounded bg-secondary w-full justify-center items-center">
                <Text className="text-lg text-white">Get Premium for $5</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      ) : (
        <Text className="text-lg font-bold">
          Welcome to the Protein Tab - Exclusive Content for Premium Users!
        </Text>
      )}
    </View>
  );
};

export default Protein;
