import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { FIREBASE_APP } from "@/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import { BlurView } from "expo-blur";
import CustomHeader from "@/components/CustomHeader";
import { Ionicons } from "@expo/vector-icons";
import AuthForm from "@/components/AuthForm";
import ActionButton from "@/components/ActionButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordInputRef = useRef<TextInput>(null);

  const handleLogin = async () => {
    setLoading(true);
    const auth = getAuth(FIREBASE_APP);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      router.replace("/(tabs)/home");
    } catch (error: any) {
      alert("login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center">
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
            <View>
              <ActionButton onPress={handleLogin} title={"LOG IN"} />
              <View className="flex flex-row items-center mt-4">
                <Text className="text-black">Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => router.navigate("/signup")}
                  className="justify-center flex items-center"
                >
                  <Text className="underline font-semibold text-black">
                    Create account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </BlurView>
    </View>
  );
};

export default Login;
