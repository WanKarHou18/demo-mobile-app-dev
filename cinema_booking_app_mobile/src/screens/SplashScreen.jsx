// Third party
import { useEffect } from "react";
import { View } from "react-native";
import { colors } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const nav = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      nav.replace("Home");
    }, 1000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    />
  );
};

export default SplashScreen;
