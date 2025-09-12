// third party
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// this project
import { Wrapper } from "./src/components/Context/Wrapper";

// Screens
import Splash from "./src/screens/Splash";
import Home from "./src/screens/Home";
import FoodBeverage from "./src/screens/FoodBeverage";

// Screens - Paymnet
import PaymentMethod from "./src/screens/Payment/PaymentMethod";
import PaymentSuccess from "./src/screens/Payment/PaymentSuccess";
import PaymentDebitCard from "./src/screens/Payment/PaymentDebitCard";

// Screens - Movies
import MovieDetail from "./src/screens/Movie/MovieDetail";

//Screens - Booking
import DateVenueBooking from "./src/screens/Booking/DateVenueBooking";
import SeatBooking from "./src/screens/Booking/SeatBooking";
import BookingSummary from "./src/screens/BookingSummary";

// Screens - Food Beverage

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Wrapper>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="MovieDetail" component={MovieDetail} />
          <Stack.Screen name="DateVenueBooking" component={DateVenueBooking} />
          <Stack.Screen name="SeatBooking" component={SeatBooking} />
          <Stack.Screen name="FoodBeverage" component={FoodBeverage} />
          <Stack.Screen name="BookingSummary" component={BookingSummary} />
          <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
          <Stack.Screen name="PaymentDebitCard" component={PaymentDebitCard} />
          <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
        </Stack.Navigator>
      </NavigationContainer>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
