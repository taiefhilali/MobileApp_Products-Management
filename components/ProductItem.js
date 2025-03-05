import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ item }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null); // To hold the countdown
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  // Function to calculate time remaining for the promotion
  const calculateTimeRemaining = (endDate) => {
    const now = new Date();
    const timeDiff = new Date(endDate) - now;

    if (timeDiff <= 0) {
      return 'Promotion expired';
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}j ${hours}h ${minutes}m restants`;
  };

  // Check if there is a promotion and calculate the time remaining if exists
  useEffect(() => {
    if (item.promotionPercentage && item.finDate) {
      const promotionEndDate = item.finDate;
      const remainingTime = calculateTimeRemaining(promotionEndDate);
      setTimeRemaining(remainingTime);
    }
  }, [item.promotionPercentage, item.finDate]);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        onPress={() => {
          navigation.navigate("Info", {
            item,
            carouselImages: item.images,
          });
        }}
      >
        {/* Promotion Badge */}
        {item.promotionPercentage >=0.1 && (
          <View style={styles.promotionBadge}>
            <Text style={styles.promotionBadgeText}>En Promotion</Text>
          </View>
        )}

        {/* Promotion countdown if promotion exists */}
        {timeRemaining && item.promotionPercentage && (
          <View style={styles.promotionContainer}>
            <Text style={styles.promotionText}>{timeRemaining}</Text>
          </View>
        )}

        {/* Product Image */}
        <Image
          style={styles.image}
          source={{ uri: item?.Image }}
        />
        <Text numberOfLines={1} style={styles.designation}>
          {item?.designation}
        </Text>

        <View style={styles.details}>
          <Text style={styles.rating}>{item.prixDeVenteTTC} dt</Text>
        </View>

        <Pressable onPress={() => addItemToCart(item)} style={styles.cartButton}>
          {addedToCart ? (
            <Text>Ajouté </Text>
          ) : (
            <Text>Ajouter Au Panier</Text>
          )}
        </Pressable>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "20%", // Width adjusted to display 2 items per row
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
    margin: 18, // Adds space around the item
    backgroundColor: "#fff",
    elevation: 5, // Adds shadow for better card visibility
  },
  pressable: {
    padding: 10, // Adds internal padding to make the content more spacious
  },
  image: {
    width: "100%", // Full width of the item container
    height: 150, // Fixed height for all images
    resizeMode: "contain", // Ensures the image scales proportionally without stretching
  },
  designation: {
    width: "100%",
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16, // Increased font size for better readability
    textAlign: "left", // Centers the text
  },
  details: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
  },
  rating: {
    color: "#FFC72C",
    fontWeight: "bold",
    fontSize: 14,
  },
  cartButton: {
    backgroundColor: "#FFC72C",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  promotionContainer: {
    position: "absolute",
    top: 5,
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "#808080", // Grey background for the countdown
    color: "white",
    padding: 5,
    borderRadius: 5,
    fontSize: 14,
    zIndex: 1,
  },
  promotionText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  promotionBadge: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "#FF6347", // Tomato color for the badge
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    zIndex: 1,
    marginTop: 140,
    marginLeft: 29,
    elevation: 1, // Adds a shadow for better visibility
  },
  promotionBadgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,

  },
});

export default ProductItem;
