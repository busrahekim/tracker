import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { FIREBASE_APP, FIRESTORE_DB } from "@/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import CustomHeader from "@/components/CustomHeader";
import { BlurView } from "expo-blur";
import AuthForm from "@/components/AuthForm";
import ActionButton from "@/components/ActionButton";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = async () => {
    setLoading(true);

    const auth = getAuth(FIREBASE_APP);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // user data to Firestore
      await setDoc(doc(FIRESTORE_DB, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });

      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center bg-background">
      <Image
        source={require("@/assets/images/backgroundImage.jpg")}
        className="object-cover w-full h-full absolute"
      />

      <CustomHeader onBackPress={router.back} />
      <BlurView intensity={50} tint="systemMaterialLight" className="py-5">
        <View className="flex-row items-end justify-center">
          <Image
            source={require("@/assets/images/t.png")}
            className="object-cover w-20 h-20"
          />
          <Text className="ml-[-25px] mb-1 text-3xl text-black">- RACK</Text>
        </View>
        <View className="p-5">
          <AuthForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            passwordInputRef={passwordInputRef}
          />

          {loading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <ActionButton onPress={handleSignUp} title={"SIGN UP"} />
          )}
        </View>
      </BlurView>
    </View>
  );
};

export default SignUp;
