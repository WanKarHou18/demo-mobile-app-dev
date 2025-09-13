import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import CustomView from "../components/generic_components/CustomView";
import SearchBar from "../components/SearchBar";
import { useMovie } from "../hooks/useMovie";
import CustomPreloader from "../components/generic_components/CustomPreloader";
import CustomAlert from "../components/generic_components/CustomAlert";
import { useAllContext } from "../context/allContext";

const HomeScreen = () => {
  // State for search input
  const navigation = useNavigation();
  const { movies, loading, error, fetchData } = useMovie();
  const { setSelectedMovieToView } = useAllContext();
  const [searchText, setSearchText] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // Filter movies based on search text
  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      {loading && <CustomPreloader />}
      <View style={styles.profileSection}>
        <CustomView
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <FontAwesome name="user-circle" size={50} color="white" />
          <Text style={styles.username}>Hello, John Doe</Text>
        </CustomView>
        <View style={styles.profileTextContainer}>
          <TouchableOpacity style={styles.notificationIcon}>
            <FontAwesome name="bell" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <FlatList
        data={filteredMovies}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.movieItem}
            onPress={() => {
              setSelectedMovieToView(item);
              navigation.navigate("MovieDetail");
            }}
          >
            <Image source={{ uri: item.photo }} style={styles.movieImage} />
            <Text style={styles.movieTitle}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <CustomAlert
        visible={showAlert}
        message={error}
        onClose={() => {
          setShowAlert(false);
          setError(null);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Black background
    padding: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  profileTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginRight: 10,
  },
  notificationIcon: {
    marginLeft: 10,
  },
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
  },
  movieItem: {
    flex: 1,
    margin: 5,
    backgroundColor: "#333",
    borderRadius: 8,
    alignItems: "center",
    padding: 10,
    elevation: 3,
  },
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  movieTitle: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default HomeScreen;
