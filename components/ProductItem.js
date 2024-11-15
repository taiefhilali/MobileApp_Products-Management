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
          <Text style={styles.price}> </Text>
          <Text style={styles.rating}>{item.prixDeVenteTTC} dt</Text>
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
    width: '44%', // Takes up 48% of the container width (with some margin to ensure 2 items per row)
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    margin: 5, // Adds space around the item (controls gap between items)
    backgroundColor: '#fff',
  },
  pressable: {
    marginHorizontal: 20,
    marginVertical: 25,
  },
  image: {
    width: '100%', // Full width of the item container
    height: 150,
    resizeMode: 'contain',
  },
  designation: {
    width: '100%',
    marginTop: 10,
    fontWeight: 'bold',
  },
  details: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  rating: {
    color: '#FFC72C',
    fontWeight: 'bold',
    marginRight: 80,
    fontSize: 14,
  },
  cartButton: {
    backgroundColor: '#FFC72C',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
});


