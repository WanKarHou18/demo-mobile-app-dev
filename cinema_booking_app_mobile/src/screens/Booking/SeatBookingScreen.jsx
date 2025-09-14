import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import io from "socket.io-client";

import Header from "../../components/Header";
import { useCart } from "../../hooks/useCart";
import { useBooking } from "../../hooks/useBooking";
import { useAllContext } from "../../context/allContext";
import CustomToast from "../../components/generic_components/CustomToast";
import { BASE_URL, LAPTOP_IPV4, LOCAL_HOST } from "../../constants/Config";

// Setup constants
const seatRows = ["A", "B", "C", "D", "E"];
const seatsPerRow = 8;
const hallId = "hall_1";

const SeatBookingScreen = ({ navigation }) => {
  const { updateCart, cart } = useCart();
  const { bookingSetting } = useBooking();
  const { errorMessage, setErrorMessage, isVisibleToast, setIsVisibleToast } =
    useAllContext();

  const [myLockedSeats, setMyLockedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatStatus, setSeatStatus] = useState({});

  // Socket connection (memoized)
  const socket = useMemo(
    () => io(`${LOCAL_HOST}:3000`, { transports: ["websocket"] }),
    []
  );

  // Handle socket connection
  useEffect(() => {
    socket.on("connecting", () => {
      console.log("Socket is connecting...");
    });

    // Fires when the connection is established
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });
    socket.emit("join_hall", hallId);

    // Initial seat state
    socket.on("seat_state", (data) => {
      setSeatStatus(data);
    });

    // Real-time updates
    socket.on("seat_state_update", ({ seatId, status }) => {
      setSeatStatus((prev) => ({
        ...prev,
        [seatId]: status,
      }));
    });

    return () => {
      socket.off("seat_state");
      socket.off("seat_state_update");
      socket.disconnect();
    };
  }, [socket]);

  // Seat selection handler
  const handleSelectSeat = (seatId) => {
    const currentStatus = seatStatus[seatId] || "vacant";

    if (currentStatus === "booked") return;

    if (selectedSeats.includes(seatId)) {
      // Unselect seat
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
      setMyLockedSeats(myLockedSeats.filter((seat) => seat !== seatId));
      socket.emit("release_seat", { hallId, seatId });
    } else {
      // Select seat
      setSelectedSeats([...selectedSeats, seatId]);
      setMyLockedSeats([...myLockedSeats, seatId]);
      socket.emit("select_seat", { hallId, seatId });
    }
  };

  const isSeatSelected = (seatId) => selectedSeats.includes(seatId);
  const isSeatUnavailable = (seatId) => {
    const status = seatStatus[seatId];
    const isLockedByMe = myLockedSeats.includes(seatId);
    return status === "booked" || (status === "locked" && !isLockedByMe);
  };

  const totalPrice = useMemo(() => {
    return bookingSetting?.ticketPrice * selectedSeats.length;
  }, [selectedSeats]);

  const validate = () => {
    if (selectedSeats.length === 0) {
      setErrorMessage("Seat cannot be empty");
      setIsVisibleToast(true);
      return false;
    }
    return true;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Ticket Booking"
        onBackPress={() => {
          updateCart({
            ...cart,
            selectedSeats: [],
            ticketPrice: 0,
            totalPrice: 0,
          });
          navigation.goBack();
        }}
      />
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
            <Text style={styles.summaryText}>Subtotal: ${totalPrice}</Text>
          </View>
        </ScrollView>

        {/* Bottom Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              selectedSeats.forEach((seatId) => {
                socket.emit("release_seat", { hallId, seatId });
              });

              updateCart({
                ...cart,
                selectedSeats: [],
                ticketPrice: 0,
                totalPrice: 0,
              });

              navigation.goBack();
            }}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={() => {
              const valid = validate();
              if (valid) {
                selectedSeats.forEach((seatId) => {
                  socket.emit("book_seat", { hallId, seatId });
                });
                updateCart({
                  ...cart,
                  selectedSeats,
                  ticketPrice: totalPrice,
                });
                navigation.navigate("FoodBeverage");
              }
            }}
          >
            <Text style={styles.proceedText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomToast
        visible={isVisibleToast}
        message={errorMessage}
        onHide={() => {
          setIsVisibleToast(false);
          setErrorMessage("");
        }}
      />
    </SafeAreaView>
  );
};

export default SeatBookingScreen;

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
