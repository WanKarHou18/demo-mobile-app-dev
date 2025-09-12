import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

import Header from "../../components/Header";

const seatRows = ["A", "B", "C", "D", "E"];
const seatsPerRow = 8;

// Dummy unavailable seats
const unavailableSeats = ["A3", "B5", "C2", "E7"];

const SeatBooking = ({ navigation }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSelectSeat = (seatId) => {
    if (unavailableSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const isSeatSelected = (seatId) => selectedSeats.includes(seatId);
  const isSeatUnavailable = (seatId) => unavailableSeats.includes(seatId);

  const seatPrice = 15;
  const total = selectedSeats.length * seatPrice;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Ticket Booking" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          <Text style={styles.title}>Select Seat</Text>

          {/* Legend */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: "#ccc" }]} />
              <Text style={styles.legendText}>Available</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: "#555" }]} />
              <Text style={styles.legendText}>Unavailable</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendBox, { backgroundColor: "#E50914" }]}
              />
              <Text style={styles.legendText}>Selected</Text>
            </View>
          </View>

          {/* Screen */}
          <View style={styles.screenContainer}>
            <View style={styles.screenImage} />
            <Text style={styles.screenText}>SCREEN</Text>
          </View>

          {/* Seat Grid */}
          <View style={styles.seatGrid}>
            {seatRows.map((row) => (
              <View key={row} style={styles.seatRow}>
                <Text style={styles.rowLabel}>{row}</Text>
                {Array.from({ length: seatsPerRow }, (_, i) => {
                  const seatId = `${row}${i + 1}`;
                  const isSelected = isSeatSelected(seatId);
                  const isUnavailable = isSeatUnavailable(seatId);
                  return (
                    <TouchableOpacity
                      key={seatId}
                      style={[
                        styles.seat,
                        isSelected && styles.seatSelected,
                        isUnavailable && styles.seatUnavailable,
                      ]}
                      onPress={() => handleSelectSeat(seatId)}
                      disabled={isUnavailable}
                    />
                  );
                })}
                <Text style={styles.rowLabel}>{row}</Text>
              </View>
            ))}
          </View>

          {/* Selected Seats Summary */}
          <View style={styles.summaryBox}>
            <Text style={styles.summaryText}>
              Selected: {selectedSeats.join(", ") || "-"}
            </Text>
            <Text style={styles.summaryText}>Subtotal: ${total}</Text>
          </View>
        </ScrollView>

        {/* Bottom Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={() => {
              // Proceed logic here
              navigation.navigate("FoodBeverage");
            }}
          >
            <Text style={styles.proceedText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SeatBooking;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendBox: {
    width: 20,
    height: 20,
    marginRight: 8,
    borderRadius: 4,
  },
  legendText: {
    color: "#fff",
    fontSize: 13,
  },
  screenContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  screenImage: {
    width: "80%",
    height: 20,
    backgroundColor: "#aaa",
    borderRadius: 10,
  },
  screenText: {
    color: "#fff",
    marginTop: 5,
    fontSize: 12,
    fontStyle: "italic",
  },
  seatGrid: {
    alignItems: "center",
  },
  seatRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  rowLabel: {
    color: "#fff",
    width: 20,
    textAlign: "center",
    fontSize: 12,
  },
  seat: {
    width: 25,
    height: 25,
    marginHorizontal: 4,
    borderRadius: 4,
    backgroundColor: "#ccc",
  },
  seatUnavailable: {
    backgroundColor: "#555",
  },
  seatSelected: {
    backgroundColor: "#E50914",
  },
  summaryBox: {
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "#1c1c1e",
    padding: 15,
    borderRadius: 10,
  },
  summaryText: {
    color: "#fff",
    fontSize: 14,
    marginVertical: 4,
  },
  buttonRow: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#555",
    paddingVertical: 12,
    marginRight: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  proceedButton: {
    flex: 1,
    backgroundColor: "#E50914",
    paddingVertical: 12,
    marginLeft: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: {
    color: "#fff",
    fontSize: 16,
  },
  proceedText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
