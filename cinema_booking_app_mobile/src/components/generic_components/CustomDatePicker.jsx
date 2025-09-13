// components/CustomDatePicker.js
import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const CustomDatePicker = ({ label = "Select Date", onConfirm }) => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const showPicker = () => setPickerVisible(true);
  const hidePicker = () => setPickerVisible(false);

  const handleConfirm = (date) => {
    setSelectedDate(date);
    onConfirm && onConfirm(date);
    hidePicker();
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Pressable onPress={showPicker} style={styles.dateButton}>
        <Text style={styles.dateText}>
          {selectedDate
            ? selectedDate.toLocaleDateString()
            : "Tap to pick a date"}
        </Text>
      </Pressable>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hidePicker}
      />
    </View>
  );
};

export default CustomDatePicker;
const styles = StyleSheet.create({
  datePickerContainer: {
    marginBottom: 15,
  },
  label: {
    color: "#aaa",
    marginBottom: 5,
    fontSize: 14,
  },
  dateButton: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 6,
    backgroundColor: "#1c1c1e",
  },
  dateText: {
    color: "#fff",
    fontSize: 16,
  },
});
