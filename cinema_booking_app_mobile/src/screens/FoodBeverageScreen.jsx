import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

import Header from "../components/Header";
import { useFoodBeverage } from "../hooks/useFoodBeverage";
import { useCart } from "../hooks/useCart";

const TABS = {
  FOOD: "Food / Snacks",
  BEVERAGE: "Beverages",
};

const FoodBeverageScreen = () => {
  const navigation = useNavigation();
  const { data, fetchData } = useFoodBeverage();
  const { updateCart, cart } = useCart();

  const [activeTab, setActiveTab] = useState(TABS.FOOD);
  const [selectedItems, setSelectedItems] = useState(
    cart?.foodBeverage?.filter((item) => item?.id)
  );

  const [beverageItems, setBeverageItems] = useState();
  const [foodItems, setFoodItems] = useState([]);

  const itemsToDisplay = activeTab === TABS.FOOD ? foodItems : beverageItems;

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedItems.includes(item.id);
    return (
      <TouchableOpacity
        style={[
          styles.card,
          isSelected && { borderColor: "#E50914", borderWidth: 2 },
        ]}
        onPress={() => toggleSelect(item.id)}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.description}>$ {item?.price}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setBeverageItems(data?.filter((item) => item?.type === "beverage"));
      setFoodItems(data?.filter((item) => item?.type === "food"));
    }
  }, [data]);

  // useEffect(() => {
  //   console.log("fb cart", cart);
  // }, [cart]);

  return (
    <View style={styles.container}>
      <Header
        title="Beverages & Food"
        onSkip={() => {
          updateCart({
            ...cart,
            foodBeverage: [],
            foodBeveragePrice: 0,
          });
          navigation.navigate("BookingSummary");
        }}
        showSkip
        onBackPress={() => {
          // Clear this screen data in slice - cart
          updateCart({
            ...cart,
            foodBeverage: [],
            foodBeveragePrice: 0,
          });
          navigation.goBack();
        }}
      />
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

      {/* Item Grid */}
      <FlatList
        data={itemsToDisplay}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderItem}
        contentContainerStyle={styles.grid}
      />

      {/* Proceed Button */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => {
            const combinedFoodBeverageArr = [...beverageItems, ...foodItems];
            const resultSelectedItems = combinedFoodBeverageArr.filter((item) =>
              selectedItems.includes(item.id)
            );
            const foodBeveragePrice = resultSelectedItems?.reduce(
              (sum, item) => sum + item?.price,
              0
            );
            updateCart({
              ...cart,
              foodBeverage: resultSelectedItems,
              foodBeveragePrice,
            });
            navigation.navigate("BookingSummary");
          }}
        >
          <Text style={styles.proceedText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FoodBeverageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#111",
    paddingVertical: 10,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#1c1c1e",
  },
  activeTab: {
    backgroundColor: "#E50914",
  },
  tabText: {
    color: "#aaa",
    fontSize: 14,
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  grid: {
    padding: 10,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#1c1c1e",
    borderRadius: 12,
    padding: 12,
    margin: 8,
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
    resizeMode: "contain",
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  description: {
    color: "#aaa",
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  proceedButton: {
    backgroundColor: "#E50914",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  proceedText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
