import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanCart,
  decrementQuantity,
  incementQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";
import io from 'socket.io-client';

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const total = cart
    ?.map((item) => item.prixDeVenteTTC * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();
  const increaseQuantity = (item) => {
    dispatch(incementQuantity(item));
  };
  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };
  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };


  const socket = io('http://10.0.2.2:3000'); // Replace with your backend URL

  useEffect(() => {
    // Listen for responses from the backend
    socket.on('orderSuccess', (data) => {
      console.log('Order placed successfully, order ID:', data.orderId);
      console.log('Before cleaning cart:', cart); // Log before dispatch
      dispatch(cleanCart());
      console.log('After cleaning cart:', cart); // Log after dispatch
    });

    socket.on('orderError', (error) => {
      console.error('Order error:', error.message);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleOrderPlacement = () => {
    // Prepare data for the order
    const orderData = {
      userId: 1, // Static user ID for testing purposes
      articles: cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.prixDeVenteTTC,
      })),
    };
console.log('===========orderDataorderData=========================');
console.log(orderData);
console.log('====================================');
    // Emit the 'placeOrder' event to the backend
    socket.emit('placeOrder', orderData);
  };
 return (
    <ScrollView style={{ marginTop: 55, flex: 1, backgroundColor: "white" }}>
      <View style={styles.searchContainer}>
        <Pressable style={styles.searchInput}>
          <AntDesign style={styles.searchIcon} name="search1" size={22} color="black" />
          <TextInput placeholder="Search" />
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>

      <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalText}>Subtotal :</Text>
        <Text style={styles.totalText}>{total} dt</Text>
      </View>
{/* 
      <Pressable onPress={() => navigation.navigate("Confirm")} style={styles.proceedButton}>
        <Text>Proceed to Buy ({cart.length}) items</Text>
      </Pressable> */}
       <Pressable style={styles.proceedButton} onPress={handleOrderPlacement}>
        <Text>Commander {cart.length} Article(s)</Text>
      </Pressable>
      <Text style={styles.separator} />

      <View style={styles.cartItemsContainer}>
        {cart?.map((item, index) => (
          <View style={styles.cartItem} key={index}>
            <Pressable style={styles.itemContainer}>
              <View>
                <Image style={styles.itemImage} source={{ uri: item?.Image }} />
              </View>

              <View style={styles.itemDetails}>
                <View style={styles.badgeContainer}>
                  <Text style={styles.badge}>{item.marque?.libelle}</Text>
                  <Text style={styles.badge}>{item.famille?.libelle}</Text>
                </View>

                <Text numberOfLines={3} style={styles.itemDesignation}>
                  {item?.designation}
                </Text>
                <Text style={styles.itemPrice}>{item?.prixDeVenteTTC} dt</Text>
              </View>
            </Pressable>

            <View style={styles.quantityContainer}>
              <Pressable onPress={() => decreaseQuantity(item)} style={styles.quantityButton}>
                <AntDesign name="minus" size={24} color="black" />
              </Pressable>
              <Pressable style={styles.quantityDisplay}>
                <Text>{item?.quantity}</Text>
              </Pressable>
              <Pressable onPress={() => increaseQuantity(item)} style={styles.quantityButton}>
                <Feather name="plus" size={24} color="black" />
              </Pressable>
              <Pressable onPress={() => deleteItem(item)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>X</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: "#f3c94a",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: "white",
    borderRadius: 30,
    height: 38,
    flex: 1,
  },
  searchIcon: { paddingLeft: 10 },
  subtotalContainer: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  subtotalText: { fontSize: 18, fontWeight: "400" },
  totalText: { fontSize: 20, fontWeight: "bold", color: "#333" },
  proceedButton: {
    backgroundColor: "#FFC72C",
    padding: 12,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  separator: {
    height: 1,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    marginVertical: 15,
    marginHorizontal: 10,
  },
  cartItemsContainer: { marginHorizontal: 10 },
  cartItem: {
    backgroundColor: "white",
    marginVertical: 8,
    borderBottomColor: "#F0F0F0",
    borderBottomWidth: 1,
    padding: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: "row",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  itemImage: { width: 100, height: 100, resizeMode: "contain", borderRadius: 10 },
  itemDetails: { flex: 1, paddingLeft: 12, justifyContent: "center" },
  badgeContainer: { flexDirection: "row", gap: 8, marginBottom: 4 },
  badge: {
    backgroundColor: "#EAEAEA",
    color: "#555",
    fontSize: 12,
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 6,
  },
  itemDesignation: { fontWeight: "bold", fontSize: 16, color: "#333" },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginTop: 6,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
    marginBottom: -38,
  },
  quantityButton: {
    backgroundColor: "#D8D8D8",
    padding: 2,
    borderRadius: 6,
  },
  quantityDisplay: {
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  deleteButton: {
    position: "absolute",
    right: 5,
    top:-16,
  },
  deleteButtonText: { color: "#F07C5D", fontSize: 18, fontWeight: "bold" },
});

export default CartScreen;