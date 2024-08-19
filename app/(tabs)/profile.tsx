// import CustomDropdown from "@/components/CustomDropdown";
import Divider from "@/components/Divider";
import Colors from "@/constants/Colors";
import { UserDoc } from "@/constants/Interfaces";
import { useCombinedWorkoutData } from "@/context/CombinedWorkoutDataContext";
import { FIREBASE_APP } from "@/firebaseConfig";
import useFormattedDate from "@/hooks/useFormattedDate";
import useUpdateUserDoc from "@/hooks/useUpdateUserDoc";
import { Entypo, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";

export default function Profile() {
  const { userDoc, refetchUserData } = useCombinedWorkoutData();
  const {
    name: initialName,
    createdAt,
    email: initialEmail,
    unit: initialUnit,
  } = userDoc as UserDoc;
  const formattedSignUpDate = useFormattedDate(createdAt);
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  // const [unit, setUnit] = useState(initialUnit);

  const { updateUserDoc } = useUpdateUserDoc();

  const handleSignOut = async () => {
    try {
      await signOut(getAuth(FIREBASE_APP));
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateUserDoc({ name, email });
      await refetchUserData();
      Alert.alert("Success", "Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
      Alert.alert("Error", "There was an error updating your profile.");
    }
  };

  const handleCancel = () => {
    setName(initialName);
    setEmail(initialEmail);
    // setUnit(initialUnit);
    setIsEditing(false);
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center">
        <View className="flex-row  items-center justify-between w-full px-5">
          <View>
            <Text className="text-xl font-bold">Hey, {userDoc.name}</Text>
            <Text className="text-gray">
              Signed since {formattedSignUpDate}
            </Text>
          </View>

          {isEditing ? (
            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={handleSave}
                className="bg-secondary rounded items-center p-2"
              >
                <Feather name="check" size={18} color={Colors.background} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCancel}
                className="bg-primary rounded items-center p-2"
              >
                <Entypo name="cross" size={18} color={Colors.background} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleEditProfile}
              className="bg-primary rounded items-center p-2"
            >
              <Text className="text-background">Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>
        <Divider />
        <View className="gap-y-5 mx-5">
          <TextInput
            className="bg-lightGray rounded p-2 text-black"
            placeholder="Name"
            value={name}
            onChangeText={setName}
            keyboardType="default"
            editable={isEditing}
          />
          <TextInput
            className="bg-lightGray rounded p-2 text-black"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={isEditing}
          />
          {/* <View>
            <CustomDropdown
              selectedValue={unit}
              onValueChange={setUnit}
              options={["kg", "lbs"]}
              disabled={!isEditing}
            />
          </View> */}

          <TouchableOpacity
            onPress={handleSignOut}
            className={`bg-primary rounded items-center p-2 ${
              isEditing && "opacity-75"
            }`}
          >
            <Text className="text-background uppercase">Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
