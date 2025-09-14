import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useCart } from "../../hooks/useCart";

const PaymentSuccessScreen = () => {
  const navigation = useNavigation();
  const { resetCart } = useCart();

  return (
    <View style={styles.container}>
      {/* Circle check icon */}
      <View style={styles.iconContainer}>
        <FontAwesome name="check-circle" size={120} color="#4BB543" />
      </View>

      {/* Congratulations text */}
      <Text style={styles.congratsText}>Congratulations!</Text>

      {/* Spacer */}
      <View style={{ height: 20 }} />

      {/* Confirmation message */}
      <Text style={styles.messageText}>
        Your ticket purchase is successful, a confirmation has been sent to your
        e-mail
      </Text>

      {/* Buttons Row */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.mainMenuButton]}
          onPress={() => {
            resetCart();
            navigation.navigate("Home");
          }}
        >
          <FontAwesome
            name="arrow-left"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.buttonText}>Main Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.viewTicketButton]}
          onPress={() => {
            resetCart();
            navigation.navigate("Home");
          }}
        >
          <FontAwesome
            name="ticket"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.buttonText}>View Ticket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
  },
  congratsText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
  },
  messageText: {
    color: "#ccc",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  mainMenuButton: {
    backgroundColor: "#E50914",
  },
  viewTicketButton: {
    backgroundColor: "#1c1c1e",
    borderWidth: 1,
    borderColor: "#E50914",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
