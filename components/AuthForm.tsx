import { View, TouchableOpacity, TextInput } from "react-native";
import React, { MutableRefObject, useRef, useState } from "react";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface AuthFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  passwordInputRef: MutableRefObject<TextInput | null>;
}

const AuthForm = ({
  email,
  setEmail,
  password,
  setPassword,
  passwordInputRef,
}: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="space-y-3">
      <View className="flex-row items-center rounded border-2 border-t-0 border-l-0 p-2">
        <TextInput
          className="flex-1"
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          value={email}
          returnKeyType="next"
          onSubmitEditing={() => passwordInputRef.current?.focus()}
          blurOnSubmit={false}
        />
      </View>

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
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthForm;
