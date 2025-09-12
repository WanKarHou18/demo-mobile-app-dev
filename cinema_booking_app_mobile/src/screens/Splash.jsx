// Third party
import { useEffect } from "react";
import { View, Image } from "react-native";
import { colors } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const Splash = () => {
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
    >
      <Image
        style={{ width: "70%", height: "100%", resizeMode: "contain" }}
        source={require("../../assets/cinema-splash.jpg")}
      />
    </View>
  );
};

export default Splash;
