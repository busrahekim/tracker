import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import { FIREBASE_APP } from "@/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import { BlurView } from "expo-blur";
import CustomHeader from "@/components/CustomHeader";
import { Ionicons } from "@expo/vector-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

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
    <View className="flex-1 justify-center bg-background">
      <Image
        source={require("@/assets/images/backgroundImage.jpg")}
        className="object-cover w-full h-full absolute"
      />

      <CustomHeader onBackPress={router.back} />

      <BlurView intensity={50} tint="systemMaterialLight" className="mx-3">
        <View className="py-10">
          <View className="flex-row items-end justify-center">
            <Image
              source={require("@/assets/images/t.png")}
              className="object-cover w-20 h-20"
            />
            <Text className="ml-[-25px] mb-1 text-3xl text-black">- RACK</Text>
          </View>

          <View className="mx-5 border-primary border-b-2 p-5">
            <View className="space-y-2">
              <TextInput
                className="rounded border-2 border-t-0 border-l-0 p-2"
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
                value={email}
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                blurOnSubmit={false}
              />
              <View className="flex-row items-center rounded border-2 border-t-0 border-l-0 p-2">
                <TextInput
                  className="flex-1"
                  placeholder="Password"
                  autoCapitalize="none"
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  secureTextEntry={!showPassword}
                  ref={passwordInputRef}
                  returnKeyType="done"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {loading ? (
              <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
              <>
                <TouchableOpacity
                  onPress={handleLogin}
                  className="mt-2 justify-center flex items-center bg-black p-2 rounded"
                >
                  <Text className="text-white leading-2">LOG IN</Text>
                </TouchableOpacity>
                <View className="flex flex-row items-center mt-4">
                  <Text className="text-black">
                    Don't have an account?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => router.navigate("/signup")}
                    className="justify-center flex items-center"
                  >
                    <Text className="underline font-semibold text-gray">
                      Create account
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            
          </View>
        </View>
      </BlurView>
    </View>
  );
};

export default Login;
