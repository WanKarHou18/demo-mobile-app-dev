import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SearchBar = ({ searchText, setSearchText, setSortAsc }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Movies..."
        placeholderTextColor="#aaa"
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity
        style={styles.sortIcon}
        onPress={() => {
          setSortAsc((prev) => !prev);
        }}
      >
        <FontAwesome name="sort" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 10,
    position: "relative",
  },
  searchInput: {
    height: 40,
    flex: 1,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    color: "white",
  },
  sortIcon: {
    position: "absolute",
    right: 10,
    paddingBottom: 5,
  },
});

export default SearchBar;
