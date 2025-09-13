import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { DottedLine } from "../components/DottedLine";
import Header from "../components/Header";
const BookingSummary = ({ navigation }) => {
  const movie = {
    image:
      "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_UF894,1000_QL80_.jpg",
    name: "Interstellar",
    categories: ["Action", "Sci-Fi"],
    duration: "2h 49m",
  };

  const booking = {
    cinema: "Mid Valley",
    date: "15 Sep 2025",
    seat: ["A1", "A2"],
    startTime: "8:00PM",
    endTime: "10:49PM",
  };

  const breakdown = {
    tickets: 5000,
    food: 5400,
    charges: 50,
  };

  const total = breakdown.tickets + breakdown.food + breakdown.charges;

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
              <Image source={{ uri: movie.image }} style={styles.movieImage} />
              <View style={styles.movieInfo}>
                <Text style={styles.movieName}>{movie.name}</Text>
                <View style={styles.tagsRow}>
                  {movie.categories.map((cat) => (
                    <View key={cat} style={styles.tag}>
                      <Text style={styles.tagText}>{cat}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.movieDuration}>{movie.duration}</Text>
              </View>
            </View>

            <DottedLine />

            {/* Bottom Row */}
            <View style={styles.ticketBottom}>
              <Text style={styles.infoText}>
                <Text style={styles.label}>Cinema:</Text> {booking.cinema}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.label}>Date:</Text> {booking.date}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.label}>Seats:</Text>{" "}
                {booking.seat.join(", ")}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.label}>Time:</Text> {booking.startTime} -{" "}
                {booking.endTime}
              </Text>
            </View>
          </View>
        </View>

        {/* Price Breakdown */}
        <View style={styles.priceBox}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tickets</Text>
            <Text style={styles.priceAmount}>RM {breakdown.tickets}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Food & Beverage</Text>
            <Text style={styles.priceAmount}>RM {breakdown.food}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Charges</Text>
            <Text style={styles.priceAmount}>RM {breakdown.charges}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, styles.totalLabel]}>
              Total Amount Payable
            </Text>
            <Text style={[styles.priceAmount, styles.totalAmount]}>
              RM {total}
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

export default BookingSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    position: "relative",
    padding: 20,
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
    height: 140,
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
    marginHorizontal: 20,
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
});
