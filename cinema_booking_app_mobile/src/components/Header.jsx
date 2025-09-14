import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const Header = ({ title, onBackPress, showSkip = false, onSkip }) => {
  return (
    <View style={styles.container}>
      {/* Left: Back button */}
      <TouchableOpacity onPress={onBackPress} style={styles.left}>
        <FontAwesome
          name="chevron-left"
          size={24}
          color="white"
          onPress={onBackPress}
        />
      </TouchableOpacity>

      {/* Center: Title */}
      <Text style={styles.titleText}>{title || ""}</Text>

      {/* Right: Optional Skip */}
      {showSkip ? (
        <TouchableOpacity onPress={onSkip} style={styles.right}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.right} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    flexDirection: "row",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  left: {
    position: "absolute",
    left: 20,
    justifyContent: "center",
    height: "100%",
    width: "10%",
  },
  right: {
    position: "absolute",
    right: 20,
    justifyContent: "center",
    height: "100%",
  },
  skipText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Header;
