import { View, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const CustomAvatar = ({ uri, size = 48 }) => {
  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={[
            styles.image,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        />
      ) : (
        <FontAwesome name="user-circle" size={50} color="white" />
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
  placeholder: {
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CustomAvatar;
