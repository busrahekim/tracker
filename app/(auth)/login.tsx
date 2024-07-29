import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_APP } from "@/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import CustomHeader from "@/components/CustomHeader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

      console.log(user);

      router.replace("/(tabs)/home");
    } catch (error: any) {
      alert("login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center bg-background">
      <View className="flex-row items-end justify-center">
        <Image
          source={require("@/assets/images/t.png")}
          className="object-cover w-20 h-20"
        />
        <Text className="ml-[-25px] mb-1 text-3xl text-primary">rackky</Text>
      </View>

      <View className="mx-5 border-slate-400 border-b-2 p-5 ">
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            className="my-1 h-12 rounded border-2 border-t-0 border-l-0 p-2 bg-white"
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            className="my-1 h-12 rounded border-2 border-t-0 border-l-0 p-2 bg-white"
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
          {loading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <>
              <Pressable
                onPress={handleLogin}
                className="mt-2 justify-center flex items-center bg-primary p-2 rounded"
              >
                <Text className="text-white leading-5 -">Login</Text>
              </Pressable>
              <View className="flex flex-row items-center mt-4">
                <Text className="font-semibold text-primary">
                  Don't you have an account ?{" "}
                </Text>
                <Pressable
                  onPress={() => router.navigate("/signup")}
                  className="justify-center flex items-center"
                >
                  <Text className="underline text-secondary">
                    Create account
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Login;
