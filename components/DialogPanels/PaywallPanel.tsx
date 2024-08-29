import Colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";

interface PaywallPanelProps {
  visible: boolean;
  onDismiss: () => void;
  onBuy: () => void;
}

const PaywallPanel = ({ visible, onDismiss, onBuy }: PaywallPanelProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(formatted);
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 4);
    const formatted = cleaned.match(/.{1,2}/g)?.join("/") || "";
    setExpiryDate(formatted);
  };

  const handleCardNumberChange = (text: string) => {
    formatCardNumber(text);
  };

  const handleExpiryDateChange = (text: string) => {
    formatExpiryDate(text);
  };

  const handleCvvChange = (text: string) => {
    setCvv(text.replace(/\D/g, "").slice(0, 3));
  };

  const handleBuy = () => {
    //TODO:
    onBuy();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View
        className="flex-1 justify-center items-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          className="bg-background rounded-md p-5"
          style={{
            width: "90%",
          }}
        >
          <Text className="text-lg font-bold mb-2">Get Premium</Text>
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 16 }}
            className="gap-y-1"
          >
            <View className="p-4">
              <Text className="text-lg mb-2">Payment Details</Text>
              <View className="flex-row items-center bg-lightGray rounded justify-between mb-2">
                <TextInput
                  className=" text-black bg-lightGray rounded pr-0 p-2"
                  placeholder="Card Number"
                  keyboardType="numeric"
                  maxLength={19}
                  value={cardNumber}
                  onChangeText={handleCardNumberChange}
                  placeholderTextColor={Colors.primary}
                />
                <AntDesign
                  name="creditcard"
                  size={24}
                  color={Colors.gray}
                  style={{ paddingRight: 10 }}
                />
              </View>

              <TextInput
                className="bg-lightGray rounded p-2 mb-2"
                placeholder="Expiry Date (MM/YY)"
                keyboardType="numeric"
                maxLength={5}
                value={expiryDate}
                onChangeText={handleExpiryDateChange}
                placeholderTextColor={Colors.primary}
              />
              <TextInput
                className="bg-lightGray rounded p-2 mb-2"
                placeholder="CVV"
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
                value={cvv}
                onChangeText={handleCvvChange}
                placeholderTextColor={Colors.primary}
              />
              <TextInput
                className="bg-lightGray rounded p-2 mb-4"
                placeholder="Cardholder Name"
                value={name}
                onChangeText={setName}
                placeholderTextColor={Colors.primary}
              />
              <TouchableOpacity
                className="bg-primary rounded p-2"
                onPress={handleBuy}
              >
                <Text className="text-white text-center">Pay $5</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View className="flex-row justify-end">
            <TouchableOpacity onPress={onDismiss}>
              <Text className="font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PaywallPanel;
