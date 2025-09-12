import { View, Text, StyleSheet } from "react-native";
const DateVenueBooking = ({ route }) => {
  const { movie } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking for: {movie.name}</Text>
      {/* Implement calendar and venue selection here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
  },
  title: {
    color: "white",
    fontSize: 20,
    marginBottom: 20,
  },
});

export default DateVenueBooking;
