import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";

const TABS = {
  DETAILS: "Details",
  REVIEWS: "Reviews",
};

const MovieDetail = ({ route }) => {
  const { movie } = route.params;
  const [activeTab, setActiveTab] = useState(TABS.DETAILS);
  const navigation = useNavigation();

  const handleBookTicket = () => {
    navigation.navigate("DateVenueBooking", { movie });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title={movie.name} />

      {/* Placeholder Video */}
      <View style={styles.videoContainer}>
        <TouchableOpacity style={styles.playButton}>
          <Text style={{ color: "white", fontSize: 40 }}>▶</Text>
        </TouchableOpacity>
        <Text style={styles.videoText}>Trailer</Text>
      </View>

      {/* Bottom Modal Section */}
      <View style={styles.modalContainer}>
        {/* Top - Movie Overview */}
        <View style={styles.movieRow}>
          <Image source={{ uri: movie.photo }} style={styles.movieImage} />
          <View style={styles.movieInfo}>
            <Text style={styles.movieName}>{movie.name}</Text>
            <View style={styles.tagsContainer}>
              {["Action", "Sci-Fi"].map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.movieRating}>⭐ 4.5/5</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {Object.values(TABS).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === TABS.DETAILS && (
            <Text style={styles.description}>{movie.description}</Text>
          )}
          {activeTab === TABS.REVIEWS && (
            <Text style={styles.reviews}>⭐⭐⭐⭐⭐ Amazing movie!</Text>
          )}
        </View>

        {/* Book Ticket Button */}
        <TouchableOpacity style={styles.bookButton} onPress={handleBookTicket}>
          <Text style={styles.bookButtonText}>🎟 Book Ticket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  videoContainer: {
    height: "40%",
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    backgroundColor: "#444",
    borderRadius: 50,
    padding: 20,
  },
  videoText: {
    color: "#fff",
    marginTop: 10,
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "60%",
    backgroundColor: "#222",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  movieRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  movieImage: {
    width: 100,
    height: 140,
    borderRadius: 10,
  },
  movieInfo: {
    marginLeft: 15,
    justifyContent: "space-between",
  },
  movieName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  movieCategory: {
    color: "#aaa",
  },
  movieRating: {
    color: "gold",
  },
  tabsContainer: {
    flexDirection: "row",
    marginVertical: 15,
    justifyContent: "center",
  },
  tab: {
    marginHorizontal: 15,
    paddingBottom: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "white",
  },
  tabText: {
    color: "#aaa",
    fontSize: 16,
  },
  activeTabText: {
    color: "white",
    fontWeight: "bold",
  },
  tabContent: {
    minHeight: 100,
  },
  description: {
    color: "white",
    fontSize: 14,
    lineHeight: 22,
  },
  reviews: {
    color: "white",
    fontSize: 14,
    fontStyle: "italic",
  },
  bookButton: {
    backgroundColor: "#E50914",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 50,
  },
  bookButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 5,
  },
  tag: {
    backgroundColor: "#444",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 5,
  },
  tagText: {
    color: "#fff",
    fontSize: 12,
  },
});

export default MovieDetail;
