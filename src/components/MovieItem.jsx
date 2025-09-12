import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const MovieItem = ({ movie }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.photo }} style={styles.image} />
      <Text style={styles.title}>{movie.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  title: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default MovieItem;
