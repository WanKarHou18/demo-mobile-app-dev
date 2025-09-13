import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const CustomPreloader = ({ size = "large", color = "#E50914" }) => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default CustomPreloader;

const styles = StyleSheet.create({
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});
