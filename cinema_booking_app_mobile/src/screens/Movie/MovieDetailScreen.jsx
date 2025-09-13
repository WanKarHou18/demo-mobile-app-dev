import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../../components/Header";
import { useAllContext } from "../../context/allContext";
import { useCart } from "../../hooks/useCart";

const TABS = {
  DETAILS: "Details",
  REVIEWS: "Reviews",
};

const MovieDetailScreen = () => {
  const { selectedMovieToView } = useAllContext();
  const { updateCart, cart, resetCart } = useCart();
  const [activeTab, setActiveTab] = useState(TABS.DETAILS);
  const navigation = useNavigation();

  const handleBookTicket = () => {
    updateCart({
      ...cart,
      selectedMovie: selectedMovieToView,
    });
    navigation.navigate("DateVenueBooking");
  };

  useEffect(() => {
    console.log("md cart", cart);
  }, [cart]);

  return (
    <View style={styles.container}>
      <Header
        title={selectedMovieToView?.name}
        onBackPress={() => {
          resetCart();
          navigation.goBack();
        }}
      />
      {/* Placeholder Video */}

      <View style={styles.videoContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => Linking.openURL(selectedMovieToView?.video)}
        >
          <ImageBackground
            source={{ uri: selectedMovieToView?.photo }}
            style={styles.videoBackground}
            imageStyle={{ borderRadius: 10 }}
          >
            <View style={styles.overlay}>
              <Text style={styles.playButton}>▶</Text>
              <Text style={styles.videoText}>Trailer</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      {/* Bottom Modal Section */}
      <View style={styles.modalContainer}>
        {/* Top - Movie Overview */}
        <View style={styles.movieRow}>
          <Image
            source={{ uri: selectedMovieToView?.photo }}
            style={styles.movieImage}
          />
          <View style={styles.movieInfo}>
            <Text style={styles.movieName}>{selectedMovieToView?.name}</Text>
            <View style={styles.tagsContainer}>
              {selectedMovieToView?.tags?.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
            <View style={styles.releaseDateContainer}>
              <Text style={styles.releaseDateText}>
                Release Date: {selectedMovieToView?.releaseDate || "N/A"}
              </Text>
            </View>
            <Text style={styles.movieRating}>
              ⭐ {selectedMovieToView?.currStar} /{" "}
              {selectedMovieToView?.maxStar}
            </Text>
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
            <Text style={styles.description}>
              {selectedMovieToView?.description}
            </Text>
          )}

          <View style={styles.tabContent}>
            {activeTab === TABS.DETAILS && (
              <Text style={styles.description}>
                {selectedMovieToView?.description}
              </Text>
            )}

            {activeTab === TABS.REVIEWS && (
              <ScrollView style={styles.reviewsContainer}>
                {selectedMovieToView?.reviews?.length > 0 ? (
                  selectedMovieToView.reviews.map((review, index) => (
                    <View key={index} style={styles.reviewItem}>
                      <Text style={styles.reviewUser}>{review.user}</Text>
                      <Text style={styles.reviewRating}>
                        {"⭐".repeat(review.rating)}
                      </Text>
                      <Text style={styles.reviewComment}>{review.comment}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noReviews}>No reviews available.</Text>
                )}
              </ScrollView>
            )}
          </View>
        </View>

        {/* Book Ticket Button */}
        <TouchableOpacity style={styles.bookButton} onPress={handleBookTicket}>
          <Text style={styles.bookButtonText}>🎟 Book Ticket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  // Style - Video Trailer
  videoContainer: {
    height: "40%",
    width: "100%",
    marginBottom: 16,
    borderRadius: 10,
    overflow: "hidden",
  },

  videoBackground: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  playButton: {
    fontSize: 36,
    color: "#fff",
  },

  videoText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
    fontWeight: "500",
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
    marginBottom: 10,
  },
  movieImage: {
    width: 100,
    height: 140,
    borderRadius: 10,
  },
  movieInfo: {
    marginLeft: 15,
    gap: 6,
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

  // Style - Book Ticket Button
  bookButton: {
    backgroundColor: "#E50914",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  bookButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  //Styles - Tags for categories
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

  reviewsContainer: {
    height: 200,
    paddingVertical: 10,
  },

  reviewItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  reviewUser: {
    fontWeight: "bold",
    marginBottom: 4,
  },

  reviewRating: {
    color: "#FFD700",
    marginBottom: 4,
  },

  reviewComment: {
    fontStyle: "italic",
  },

  noReviews: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#888",
  },

  // Style - Release Date Style
  releaseDateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    marginRight: 6,
  },

  releaseDateText: {
    fontSize: 14,
    color: "#444",
    fontWeight: "500",
  },
});

export default MovieDetailScreen;
