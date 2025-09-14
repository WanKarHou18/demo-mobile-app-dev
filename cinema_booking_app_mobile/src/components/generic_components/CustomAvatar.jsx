import { View, Image, StyleSheet, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const CustomAvatar = ({ uri, size = 48 }) => {
  const borderRadius = Platform.OS === "ios" ? size / 2 : size / 2.5;

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius,
          ...Platform.select({
            android: { elevation: 4 },
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
            },
          }),
        },
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={[styles.image, { width: size, height: size, borderRadius }]}
        />
      ) : (
        <FontAwesome
          name="user-circle"
          size={Platform.OS === "ios" ? size : size - 4}
          color="white"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    overflow: "hidden",
    backgroundColor: "#2c2c2e",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
  },
});

export default CustomAvatar;
