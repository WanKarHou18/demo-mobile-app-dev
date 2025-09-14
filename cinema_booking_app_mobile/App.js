// third party
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";

// this project
import { AllContextProvider } from "./src/context/allContext";

// Screens
import SplashScreen from "./src/screens/SplashScreen";
import HomeScreen from "./src/screens/HomeScreen";
import FoodBeverageScreen from "./src/screens/FoodBeverageScreen";

// Screens - Paymnet
import PaymentMethodScreen from "./src/screens/Payment/PaymentMethodScreen";
import PaymentSuccessScreen from "./src/screens/Payment/PaymentSuccessScreen";
import PaymentDebitCardScreen from "./src/screens/Payment/PaymentDebitCardScreen";

// Screens - Movies
import MovieDetailScreen from "./src/screens/Movie/MovieDetailScreen";

//Screens - Booking
import DateVenueBookingScreen from "./src/screens/Booking/DateVenueBookingScreen";
import SeatBookingScreen from "./src/screens/Booking/SeatBookingScreen";
import BookingSummaryScreen from "./src/screens/BookingSummaryScreen";

import store from "./src/redux/store";
// Screens - Food Beverage

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <AllContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
            <Stack.Screen
              name="DateVenueBooking"
              component={DateVenueBookingScreen}
            />
            <Stack.Screen name="SeatBooking" component={SeatBookingScreen} />
            <Stack.Screen name="FoodBeverage" component={FoodBeverageScreen} />
            <Stack.Screen
              name="BookingSummary"
              component={BookingSummaryScreen}
            />
            <Stack.Screen
              name="PaymentMethod"
              component={PaymentMethodScreen}
            />
            <Stack.Screen
              name="PaymentDebitCard"
              component={PaymentDebitCardScreen}
            />
            <Stack.Screen
              name="PaymentSuccess"
              component={PaymentSuccessScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AllContextProvider>
    </Provider>
  );
}
