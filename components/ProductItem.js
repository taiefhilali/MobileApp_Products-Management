import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ item }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.pressable}       onPress={() => {
                    navigation.navigate("Info", { 
                        item, 
                        carouselImages: item.images 
                    });
                }}
>
      
        <Image
          style={styles.image}
          source={{ uri: item?.Image }}
        />

        <Text numberOfLines={1} style={styles.designation}>
          {item?.designation}
        </Text>

        <View style={styles.details}>
          <Text style={styles.price}>₹{item?.price}</Text>
          <Text style={styles.rating}>{item?.rating?.rate} ratings</Text>
        </View>

        <Pressable onPress={() => addItemToCart(item)} style={styles.cartButton}>
          {addedToCart ? (
            <Text>Added to Cart</Text>
          ) : (
            <Text>Add to Cart</Text>
          )}
        </Pressable>
      </Pressable>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15, // Creates rounded corners for the container
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden', // Ensures child elements stay within rounded borders
    margin: 10, // Adds some spacing around each item
    backgroundColor: '#fff', // Adds a white background
  },
  pressable: {
    marginHorizontal: 20,
    marginVertical: 25,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  designation: {
    width: 150,
    marginTop: 10,
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
  },
  cartButton: {
    backgroundColor: "#FFC72C",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
});
