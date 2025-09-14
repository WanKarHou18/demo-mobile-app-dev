import React, { useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { DottedLine } from "../components/DottedLine";
import Header from "../components/Header";
import { useCart } from "../hooks/useCart";
import { useBooking } from "../hooks/useBooking";
const BookingSummaryScreen = ({ navigation }) => {
  const { cart } = useCart();
  const { bookingSetting } = useBooking();

  const totalAmount = useMemo(() => {
    return (
      (bookingSetting?.serviceChargePercent || 0) +
      cart?.foodBeveragePrice +
      cart?.ticketPrice
    );
  }, [cart, bookingSetting]);

  // useEffect(() => {
  //   console.log("bs cart", cart);
  // }, [cart]);

  return (
    <View style={styles.container}>
      <Header
        title="Booking Summary"
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        {/* Ticket Container */}
        <View style={styles.ticketWrapper}>
          <View style={styles.ticketContainer}>
            {/* Ticket Cutouts */}
            <View style={styles.cutoutLeft} />
            <View style={styles.cutoutRight} />

            {/* Top Row */}
            <View style={styles.ticketTop}>
              <Image
                source={{ uri: cart?.selectedMovie?.photo }}
                style={styles.movieImage}
              />
              <View style={styles.movieInfo}>
                <Text style={styles.movieName}>
                  {cart?.selectedMovie?.name}
                </Text>
                <View style={styles.tagsRow}>
                  {cart?.selectedMovie?.tags?.map((cat) => (
                    <View key={cat} style={styles.tag}>
                      <Text style={styles.tagText}>{cat}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.movieDuration}>
                  {cart?.selectedMovie?.duration}
                </Text>
              </View>
            </View>

            <DottedLine />

            {/* Bottom Row */}
            <View style={styles.ticketBottom}>
              <Text style={styles.infoText}>
                <Text style={styles.label}>Location:</Text>{" "}
                {cart?.selectedLocation || "-"}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.label}>Cinema:</Text>{" "}
                {cart?.selectedCinema || "-"}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.label}>Date:</Text>{" "}
                {cart?.selectedDate || "-"}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.label}>Seats:</Text>{" "}
                {cart?.selectedSeats?.join(", ")}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.label}>Time Start:</Text>{" "}
                {cart?.selectedTime || "-"}
              </Text>
            </View>
          </View>
        </View>

        {/* Price Breakdown */}
        <View style={styles.priceBox}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tickets</Text>
            <Text style={styles.priceAmount}>$ {cart?.ticketPrice}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Food & Beverage</Text>
            <Text style={styles.priceAmount}>$ {cart?.foodBeveragePrice}</Text>
          </View>

          {/* Show food item names if any */}
          {Array.isArray(cart?.foodBeverage) &&
            cart?.foodBeverage?.length > 0 && (
              <View style={styles.foodList}>
                {cart?.foodBeverage?.map((item) => (
                  <Text key={item.id} style={styles.foodItemText}>
                    • {item.name}
                  </Text>
                ))}
              </View>
            )}

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Charges</Text>
            <Text style={styles.priceAmount}>
              $ {bookingSetting?.serviceChargePercent || 0}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, styles.totalLabel]}>
              Total Amount Payable
            </Text>
            <Text style={[styles.priceAmount, styles.totalAmount]}>
              ${totalAmount}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Button */}
      <TouchableOpacity
        style={styles.proceedButton}
        onPress={() => navigation.navigate("PaymentMethod")}
      >
        <Text style={styles.proceedText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingSummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    position: "relative",
    padding: 15,
  },
  ticketWrapper: {
    marginTop: 20,
    alignItems: "center",
  },
  ticketContainer: {
    width: "100%",
    backgroundColor: "#1c1c1e",
    borderRadius: 20,
    padding: 20,
    overflow: "hidden",
    position: "relative",
    marginBottom: 30,
  },
  cutoutLeft: {
    position: "absolute",
    top: "45%",
    left: -20,
    width: 40,
    height: 40,
    backgroundColor: "#000",
    borderRadius: 20,
    zIndex: 1,
  },
  cutoutRight: {
    position: "absolute",
    top: "45%",
    right: -20,
    width: 40,
    height: 40,
    backgroundColor: "#000",
    borderRadius: 20,
    zIndex: 1,
  },
  ticketTop: {
    flexDirection: "row",
    marginBottom: 12,
  },
  movieImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  movieInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  movieName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 6,
  },
  tag: {
    backgroundColor: "#E50914",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    color: "#fff",
    fontSize: 12,
  },
  movieDuration: {
    color: "#ccc",
    fontSize: 13,
  },
  ticketBottom: {
    marginTop: 4,
  },
  infoText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
  label: {
    color: "#aaa",
  },
  priceBox: {
    backgroundColor: "#1c1c1e",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 5,
    marginBottom: 100,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  priceLabel: {
    color: "#ccc",
    fontSize: 15,
  },
  priceAmount: {
    color: "#fff",
    fontSize: 15,
  },
  divider: {
    borderBottomColor: "#555",
    borderBottomWidth: 1,
    marginVertical: 12,
  },
  totalLabel: {
    fontWeight: "bold",
    color: "#fff",
  },
  totalAmount: {
    fontWeight: "bold",
    color: "#fff",
  },
  proceedButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#E50914",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    zIndex: 10,
  },
  proceedText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Style - Food Item display
  foodList: {
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 10,
  },
  foodItemText: {
    color: "#aaa",
    fontSize: 13,
    marginLeft: 10,
  },
});
