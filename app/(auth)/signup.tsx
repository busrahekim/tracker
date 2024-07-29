import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { FIREBASE_APP, FIRESTORE_DB } from "@/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      console.log(user);

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
            className="my-1 h-12 rounded border-2 border-t-0 border-l-0  p-2 bg-white"
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
              <TouchableOpacity
                onPress={handleSignUp}
                className="mt-2 justify-center flex items-center bg-primary p-2 rounded"
              >
                <Text className="text-white leading-5">Create Account</Text>
              </TouchableOpacity>
            </>
          )}
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default SignUp;
