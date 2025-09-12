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
import Payment from "./src/screens/Payment/Payment";
import PaymentMethod from "./src/screens/Payment/PaymentMethod";
import PaymentSuccess from "./src/screens/Payment/PaymentSuccess";
import DateVenueBooking from "./src/screens/Booking/DateVenueBooking";

// Movies
import MovieDetail from "./src/screens/Movie/MovieDetail";
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
          <Stack.Screen name="FoodBeverage" component={FoodBeverage} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
          <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
          <Stack.Screen name="DateVenueBooking" component={DateVenueBooking} />
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
