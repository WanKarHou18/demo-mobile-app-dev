import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { usePayment } from "../../hooks/usePayment";
import { useEffect } from "react";

const PaymentMethodScreen = () => {
  const navigation = useNavigation();
  const { fetchPaymentMethodData, paymentMethod } = usePayment();

  const paymentMatch = {
    debit: {
      key: "debit",
      icon: <FontAwesome name="credit-card" size={24} color="#E50914" />,
      label: "Debit Card",
    },
    bank: {
      key: "bank",
      icon: <MaterialCommunityIcons name="bank" size={24} color="#E50914" />,
      label: "Bank Transfer",
    },
    crypto: {
      key: "wallet",
      icon: <Ionicons name="wallet" size={24} color="#E50914" />,
      label: "Crypto Wallets",
    },
  };

  const handleSelect = () => {
    navigation.navigate("PaymentDebitCard");
  };

  useEffect(() => {
    fetchPaymentMethodData();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title="Payment"
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.title}>
        How would you like to make the payment? Kindly select your preferred
        option
      </Text>

      {paymentMethod?.map((payment, idx) => (
        <View key={payment?.key}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleSelect()}
          >
            <View style={styles.icon}>{paymentMatch[payment?.key]?.icon}</View>
            <Text style={styles.optionText}>{payment?.name}</Text>
            <FontAwesome name="chevron-right" size={20} color="#999" />
          </TouchableOpacity>
          {idx < paymentMethod?.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
    </View>
  );
};

export default PaymentMethodScreen;

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
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  icon: {
    width: 30,
    alignItems: "center",
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#444",
  },
});
