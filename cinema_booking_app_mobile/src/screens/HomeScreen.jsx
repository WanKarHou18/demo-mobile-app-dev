// HomeScreen.js
import { useState, useEffect, useMemo } from "react";
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
import { useProfile } from "../hooks/useProfile";
import CustomAvatar from "../components/generic_components/CustomAvatar";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { movies, loading, error, fetchData } = useMovie();
  const { profile, fetchProfileInfoData } = useProfile();

  const { setSelectedMovieToView } = useAllContext();
  const [searchText, setSearchText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [sortAsc, setSortAsc] = useState(false);

  const filteredMovies = useMemo(() => {
    if (!movies) return [];

    let result = movies;
    if (searchText) {
      result = movies.filter((movie) =>
        movie.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    const sortable = [...result];

    sortable.sort((a, b) =>
      sortAsc
        ? a?.name?.localeCompare(b?.name)
        : b?.name?.localeCompare(a?.name)
    );

    return sortable;
  }, [movies, searchText, sortAsc]);

  useEffect(() => {
    fetchData();
    fetchProfileInfoData();
  }, []);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    }
  }, [error]);

  return (
    <View style={styles.container} testID="home-screen">
      {loading && <CustomPreloader testID="preloader" />}

      <View style={styles.profileSection} testID="profile-section">
        <CustomView
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 15,
          }}
        >
          <CustomAvatar
            uri={profile?.photo}
            size={60}
            testID="avatar-component"
          />
          <Text style={styles.username} testID="username-text">
            Hello, {profile?.name}
          </Text>
        </CustomView>

        <View style={styles.profileTextContainer}>
          <TouchableOpacity
            style={styles.notificationIcon}
            testID="notification-button"
          >
            <FontAwesome name="bell" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <SearchBar
        testID="search-bar"
        searchText={searchText}
        setSearchText={setSearchText}
        setSortAsc={setSortAsc}
      />

      <FlatList
        testID="movie-list"
        data={filteredMovies}
        numColumns={2}
        keyExtractor={(item) => `movie_list-${item.id}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            testID={`movie-card-${item.id}`}
            style={styles.movieItem}
            onPress={() => {
              setSelectedMovieToView(item);
              navigation.navigate("MovieDetail");
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={styles.movieImage}
              testID={`movie-image-${item.id}`}
            />
            <Text style={styles.movieTitle} testID={`movie-title-${item.id}`}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <CustomAlert
        testID="error-alert"
        visible={showAlert}
        message={error}
        onClose={() => {
          setShowAlert(false);
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
