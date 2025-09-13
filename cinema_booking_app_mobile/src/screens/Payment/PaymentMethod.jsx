import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";

const PaymentMethod = () => {
  const navigation = useNavigation();
  const options = [
    {
      key: "debit",
      icon: <FontAwesome name="credit-card" size={24} color="#E50914" />,
      label: "Debit Card",
    },
    {
      key: "bank",
      icon: <MaterialCommunityIcons name="bank" size={24} color="#E50914" />,
      label: "Bank Transfer",
    },
    {
      key: "wallet",
      icon: <Ionicons name="wallet" size={24} color="#E50914" />,
      label: "Crypto Wallets",
    },
  ];

  const handleSelect = (key) => {
    if (key === "debit") {
      navigation.navigate("PaymentDebitCard");
    }
    // Handle option selection here
    console.log("Selected payment:", key);
    // Navigate or do something else
  };

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

      {options.map(({ key, icon, label }, idx) => (
        <View key={key}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleSelect(key)}
          >
            <View style={styles.icon}>{icon}</View>
            <Text style={styles.optionText}>{label}</Text>
            <FontAwesome name="chevron-right" size={20} color="#999" />
          </TouchableOpacity>
          {idx < options.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
    </View>
  );
};

export default PaymentMethod;

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
