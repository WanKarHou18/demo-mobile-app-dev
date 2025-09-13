import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";

const PaymentDebitCardScreen = () => {
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  const handlePay = () => {
    navigation.navigate("PaymentSuccess");
  };

  return (
    <View style={styles.container}>
      <Header
        title="Card Payment"
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.title}>Please enter your card details</Text>
      {/* Card Number */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter card Number"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
          maxLength={19}
        />
      </View>

      {/* Row: Expiry Date & CVV */}
      <View style={styles.row}>
        <View style={[styles.inputGroup, styles.halfInput]}>
          <Text style={styles.label}>Expiry Date</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/YY"
            placeholderTextColor="#888"
            value={expiryDate}
            onChangeText={setExpiryDate}
            maxLength={5}
          />
        </View>

        <View style={[styles.inputGroup, styles.halfInput]}>
          <Text style={styles.label}>CVV2</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter CVV"
            placeholderTextColor="#888"
            keyboardType="numeric"
            secureTextEntry
            value={cvv}
            onChangeText={setCvv}
            maxLength={4}
          />
        </View>
      </View>

      {/* Custom Checkbox */}
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setSaveCard(!saveCard)}
        activeOpacity={0.8}
      >
        <View style={[styles.checkbox, saveCard && styles.checkboxChecked]}>
          {saveCard && <FontAwesome name="check" size={16} color="#fff" />}
        </View>
        <Text style={styles.checkboxLabel}>
          Save card info for future transactions
        </Text>
      </TouchableOpacity>

      {/* Pay Button */}
      <TouchableOpacity style={styles.payButton} onPress={handlePay}>
        <Text style={styles.payButtonText}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentDebitCardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: "#aaa",
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    backgroundColor: "#1c1c1e",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 1,
    marginRight: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#E50914",
    borderRadius: 4,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#E50914",
  },
  checkboxLabel: {
    color: "#fff",
    fontSize: 15,
  },
  payButton: {
    backgroundColor: "#E50914",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: "auto",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
