import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

import CustomDropdown from "../../components/generic_components/CustomDropdown";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import { useBooking } from "../../hooks/useBooking";
import { useCart } from "../../hooks/useCart";

const DateVenueBooking = () => {
  const navigation = useNavigation();
  const { data, fetchData } = useBooking();
  const { updateCart, cart, resetCart } = useCart();

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title="Ticket Booking" />
        <ScrollView contentContainerStyle={{ paddingBottom: 120, flexGrow: 1 }}>
          <Text style={styles.title}>Kindly select as appropriate</Text>

          {/* Location Dropdown */}

          <CustomDropdown
            label="Location"
            options={data?.state}
            selectedValue={selectedLocation}
            onValueChange={setSelectedLocation}
          />

          <CustomDropdown
            label="Cinema Location"
            options={data?.cinema}
            selectedValue={selectedCinema}
            onValueChange={setSelectedCinema}
          />

          {/* Date Selection */}
          <Text style={styles.label}>Date</Text>

          {/* Time Selection */}
          <Text style={styles.label}>Available Time</Text>
          <View style={styles.timeRow}>
            {data?.availableTime?.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeTag,
                  selectedTime === time && styles.timeSelected,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time && { color: "white" },
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Seat Legend */}
          <Text style={styles.label}>Sample of Seat</Text>
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
        </ScrollView>

        {/* Bottom Buttons - Fixed */}
        <View style={styles.fixedButtonRow}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              resetCart();
              navigation.goBack();
            }}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={() => {
              updateCart({
                ...cart,
                selectedCinema,
                selectedLocation,
                selectedDate,
                selectedTime,
              });
              navigation.navigate("SeatBooking");
            }}
          >
            <Text style={styles.proceedText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DateVenueBooking;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollContainer: {
    paddingBottom: 100, // leave space for fixed buttons
  },
  title: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
  },
  label: {
    color: "#aaa",
    marginBottom: 5,
    marginTop: 15,
    fontSize: 14,
  },
  timeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  timeTag: {
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    margin: 5,
  },
  timeSelected: {
    backgroundColor: "#E50914",
  },
  timeText: {
    color: "#fff",
    fontSize: 13,
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
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

  fixedButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: "#000",
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
