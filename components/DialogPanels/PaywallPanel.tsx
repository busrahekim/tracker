import Colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Dialog, Portal, Button as PaperButton } from "react-native-paper";

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
    //TODO: Handle the payment logic here
    onBuy();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Get Premium</Dialog.Title>
        <Dialog.Content>
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
            />
            <TextInput
              className="bg-lightGray rounded p-2 mb-2"
              placeholder="CVV"
              keyboardType="numeric"
              maxLength={3}
              secureTextEntry
              value={cvv}
              onChangeText={handleCvvChange}
            />
            <TextInput
              className="bg-lightGray rounded p-2 mb-4"
              placeholder="Cardholder Name"
              value={name}
              onChangeText={setName}
            />
            <TouchableOpacity
              className="bg-primary rounded p-2"
              onPress={handleBuy}
            >
              <Text className="text-white text-center">Pay $5</Text>
            </TouchableOpacity>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <PaperButton onPress={onDismiss}>Cancel</PaperButton>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default PaywallPanel;
