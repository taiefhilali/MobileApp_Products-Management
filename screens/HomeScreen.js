
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   Platform,
//   ScrollView,
//   Pressable,
//   TextInput,
//   Image,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import React, { useState, useEffect, useCallback, useContext } from "react";
// import { Feather } from "@expo/vector-icons";
// import { Ionicons } from "@expo/vector-icons";
// import { Entypo } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
// import axios from "axios";
// import ProductItem from "../components/ProductItem";
// import DropDownPicker from "react-native-dropdown-picker";
// import { useNavigation } from "@react-navigation/native";
// import { useSelector } from "react-redux";
// import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
// import { UserType } from "../UserContext";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const HomeScreen = () => {

//   const images = [
//     "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
//     "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
//     "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
//   ];
//   const deals = [
//     {
//       id: "20",
//       title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
//       oldPrice: 25000,
//       price: 19000,
//       image:
//         "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg",
//       carouselImages: [
//         "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
//         "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
//         "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
//         "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
//       ],
//       color: "Stellar Green",
//       size: "6 GB RAM 128GB Storage",
//     },
//     {
//       id: "30",
//       title:
//         "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
//       oldPrice: 74000,
//       price: 26000,
//       image:
//         "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg",
//       carouselImages: [
//         "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
//         "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
//         "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
//         "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
//       ],
//       color: "Cloud Navy",
//       size: "8 GB RAM 128GB Storage",
//     },
//     {
//       id: "40",
//       title:
//         "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
//       oldPrice: 16000,
//       price: 14000,
//       image:
//         "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg",
//       carouselImages: [
//         "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
//         "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
//         "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
//       ],
//       color: "Icy Silver",
//       size: "6 GB RAM 64GB Storage",
//     },
//     {
//       id: "40",
//       title:
//         "realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
//       oldPrice: 12999,
//       price: 10999,
//       image:
//         "https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg",
//       carouselImages: [
//         "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
//         "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
//         "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
//       ],
//     },
//   ];
//   const offers = [
//     {
//       id: "0",
//       title:
//         "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
//       offer: "72% off",
//       oldPrice: 7500,
//       price: 4500,
//       image:
//         "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
//       carouselImages: [
//         "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
//         "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
//         "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
//         "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
//       ],
//       color: "Green",
//       size: "Normal",
//     },
//     {
//       id: "1",
//       title:
//         "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
//       offer: "40%",
//       oldPrice: 7955,
//       price: 3495,
//       image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
//       carouselImages: [
//         "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
//         "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
//         "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
//       ],
//       color: "black",
//       size: "Normal",
//     },
//     {
//       id: "2",
//       title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
//       offer: "40%",
//       oldPrice: 7955,
//       price: 3495,
//       image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
//       carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
//       color: "black",
//       size: "Normal",
//     },
//     {
//       id: "3",
//       title:
//         "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
//       offer: "40%",
//       oldPrice: 24999,
//       price: 19999,
//       image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
//       carouselImages: [
//         "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
//         "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
//         "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
//       ],
//       color: "Norway Blue",
//       size: "8GB RAM, 128GB Storage",
//     },
//   ];
//   const [products, setProducts] = useState([]);
//   const navigation = useNavigation();
//   const [open, setOpen] = useState(false);
//   const [addresses, setAddresses] = useState([]);
//   const [category, setCategory] = useState("jewelery");
//   const { userId, setUserId } = useContext(UserType);
//   const [selectedAddress, setSelectedAdress] = useState("");

//   const [items, setItems] = useState([
//     { label: "Men's clothing", value: "men's clothing" },
//     { label: "jewelery", value: "jewelery" },
//     { label: "electronics", value: "electronics" },
//     { label: "women's clothing", value: "women's clothing" },
//   ]);
//   const [familles, setFamilles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [selectedFamille, setSelectedFamille] = useState(null);
//   const [loadingProducts, setLoadingProducts] = useState(false);
//   useEffect(() => {
//     console.log('Updated products state:', products);
//   }, [products]);
  


//   const fetchProductsForFamille = async (familleId) => {
//     setLoadingProducts(true); // Start loading indicator
//     try {

//       console.log("User ID retrieved from AsyncStorage:", userId);
//       console.log("Token retrieved from AsyncStorage:", token);
//       console.log("Retrieved Token:", token);

//       // Fetch products using familleId, userId, and token
//       const response = await axios.get(
//         `http://10.0.2.2:5000/api/articles/${familleId}`
//         // {
//         //   // params: { userId }, // Include userId as a query parameter
//         //   headers: {
//         //     Authorization: `Bearer ${token}`, // Include token in the headers
//         //   },
//         // }
//       );
  
//       setProducts(response.data || []); // Update products state
//       console.log('Updated products state:', response.data); // Check fetched data
//     } catch (error) {
//       console.error("Error fetching products:", error.response ? error.response.data : error.message);
//       Alert.alert("Error", "Failed to fetch products. Please try again later.");
//     } finally {
//       setLoadingProducts(false); // End loading indicator
//     }
//   };
//   const fetchAllArticles = async () => {
//     setLoadingProducts(true);
//     try {
//       // const token = await AsyncStorage.getItem("authToken");

//       // Fetch articles and pass familleId as a query parameter
//       const response = await axios.get(
//         `http://10.0.2.2:5000/api/articles/all`,
//         {
//           params: { familleId: selectedFamille }, 
//           // headers: {
//           //   Authorization: `Bearer ${token}`, // Include token in the headers
//           // },// Include userId
//         }
//       );
      
  
//       // Filter articles by familleId (just in case it's needed again)
//       const filteredProducts = selectedFamille
//         ? response.data.filter(product => product.familleId === selectedFamille)
//         : response.data;
  
//       setProducts(filteredProducts || []);
//       console.log('Updated products state:', filteredProducts); // Debugging state update
//     } catch (error) {
//       console.error("Error fetching products:", error.response ? error.response.data : error.message);
//       Alert.alert("Error", "Failed to fetch products. Please try again later.");
//     } finally {
//       setLoadingProducts(false);
//     }
//   };
  
  
  
//   const handleFamillePress = (famille) => {
//     setSelectedFamille(famille);
//     fetchProductsForFamille(famille.id);  // Assuming `id` is the identifier for the famille
//   };  
//   // Fetch familles on component mount
//   useEffect(() => {
//     const fetchFamilles = async () => {
//       try {
//         const response = await axios.get("http://10.0.2.2:5000/api/familles");
//         setFamilles(response.data);
//       } catch (error) {
//         console.error("Error fetching familles:", error);
//         Alert.alert("Error", "Could not fetch familles");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFamilles();
//   }, []);

//   const onGenderOpen = useCallback(() => {
//     setCompanyOpen(false);
//   }, []);

//   const cart = useSelector((state) => state.cart.cart);
//   const [modalVisible, setModalVisible] = useState(false);
//   useEffect(() => {
//     if (userId) {
//       fetchAddresses();
//     }
//   }, [userId, modalVisible]);
//   const fetchAddresses = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/addresses/${userId}`
//       );
//       const { addresses } = response.data;

//       setAddresses(addresses);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   return (
//     <>
//       <SafeAreaView
//         style={{
//           paddinTop: Platform.OS === "android" ? 40 : 0,
//           flex: 1,
//           backgroundColor: "white",
//         }}
//       >
//         <ScrollView>
//           <View
//             style={{
//               backgroundColor: "#f3c94a",
//               padding: 10,
//               flexDirection: "row",
//               alignItems: "center",
//               borderRadius: 10,
//               marginTop: 30
//             }}
//           >
//             <Pressable
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 marginHorizontal: 7,
//                 gap: 10,
//                 backgroundColor: "white",
//                 borderRadius: 3,
//                 height: 38,
//                 flex: 1,
//                 borderRadius: 30

//               }}
//             >
//               <AntDesign
//                 style={{ paddingLeft: 10 }}
//                 name="search1"
//                 size={22}
//                 color="black"
//               />
//               <TextInput placeholder="Search " />
//             </Pressable>

//             <Feather name="mic" size={24} color="black" />
//           </View>
//           <ScrollView>
//             <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
//               {familles.map((item, index) => (
//                 <Pressable
//                   key={index}
//                   style={{
//                     width: '48%',  // Ensures two items fit per row
//                     marginBottom: 20,  // Adds margin at the bottom to separate rows
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}
//                   onPress={() => {
//                     console.log("Selected famille ID:", item.id);  // Log the selected famille ID
//                     setSelectedFamille(item.id);  // Update selected famille
//                     fetchAllArticles();
//                     // fetchProductsForFamille(item.id);  // Fetch products for this famille
//                   }}
//                 >
//                   <View
//                     style={{
//                       width: 100,
//                       height: 100,
//                       borderRadius: 50,  // Creates the circle behind the image
//                       backgroundColor: 'gray',  // Set the background color to gray
//                       justifyContent: 'center',  // Center the image inside the circle
//                       alignItems: 'center',  // Center the image inside the circle
//                       borderWidth: 1,
//                     }}
//                   >
//                     <Image
//                       style={{
//                         width: 90,  // Make the image slightly smaller than the circle
//                         height: 90,
//                         borderRadius: 45,  // Half of the new width/height to make the image circular
//                         resizeMode: 'cover',
//                       }}
//                       source={{ uri: item.Image }}
//                     />
//                   </View>

//                   <Text
//                     style={{
//                       textAlign: "center",
//                       marginTop: 5,  // Fixes duplicate marginTop
//                       fontSize: 20,
//                       fontWeight: "500",
//                     }}
//                   >
//                     {item?.libelle}
//                   </Text>
//                 </Pressable>
//               ))}
//             </View>
//           </ScrollView>




//           <Text
//             style={{
//               height: 1,
//               borderColor: "#D0D0D0",
//               borderWidth: 2,
//               marginTop: 15,
//             }}
//           />

    
//           {selectedFamille && (
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           flexWrap: 'wrap',
//           marginTop: 20,
//         }}
//       >
//         {loadingProducts ? (
//           <ActivityIndicator size="large" color="#0000ff" />
//         ) : products.length > 0 ? (
//           products.map((item, index) => (
//             <ProductItem item={item} key={index} />
//           ))
//         ) : (
//           <Text>No products available</Text>
//         )}
//       </View>
//     )}

//         </ScrollView>

//       </SafeAreaView>

//       <BottomModal
//         onBackdropPress={() => setModalVisible(!modalVisible)}
//         swipeDirection={["up", "down"]}
//         swipeThreshold={200}
//         modalAnimation={
//           new SlideAnimation({
//             slideFrom: "bottom",
//           })
//         }
//         onHardwareBackPress={() => setModalVisible(!modalVisible)}
//         visible={modalVisible}
//         onTouchOutside={() => setModalVisible(!modalVisible)}
//       >
//         <ModalContent style={{ width: "100%", height: 400 }}>
//           <View style={{ marginBottom: 8 }}>
//             <Text style={{ fontSize: 16, fontWeight: "500" }}>
//               Choose your Location
//             </Text>

//             <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
//               Select a delivery location to see product availabilty and delivery
//               options
//             </Text>
//           </View>

//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             {/* already added addresses */}
//             {addresses?.map((item, index) => (
//               <Pressable
//                 onPress={() => setSelectedAdress(item)}
//                 style={{
//                   width: 140,
//                   height: 140,
//                   borderColor: "#D0D0D0",
//                   borderWidth: 1,
//                   padding: 10,
//                   justifyContent: "center",
//                   alignItems: "center",
//                   gap: 3,
//                   marginRight: 15,
//                   marginTop: 10,
//                   backgroundColor: selectedAddress === item ? "#FBCEB1" : "white"
//                 }}
//               >
//                 <View
//                   style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
//                 >
//                   <Text style={{ fontSize: 13, fontWeight: "bold" }}>
//                     {item?.name}
//                   </Text>
//                   <Entypo name="location-pin" size={24} color="red" />
//                 </View>

//                 <Text
//                   numberOfLines={1}
//                   style={{ width: 130, fontSize: 13, textAlign: "center" }}
//                 >
//                   {item?.houseNo},{item?.landmark}
//                 </Text>

//                 <Text
//                   numberOfLines={1}
//                   style={{ width: 130, fontSize: 13, textAlign: "center" }}
//                 >
//                   {item?.street}
//                 </Text>
//                 <Text
//                   numberOfLines={1}
//                   style={{ width: 130, fontSize: 13, textAlign: "center" }}
//                 >
//                   India, Bangalore
//                 </Text>
//               </Pressable>
//             ))}

//             <Pressable
//               onPress={() => {
//                 setModalVisible(false);
//                 navigation.navigate("Address");
//               }}
//               style={{
//                 width: 140,
//                 height: 140,
//                 borderColor: "#D0D0D0",
//                 marginTop: 10,
//                 borderWidth: 1,
//                 padding: 10,
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Text
//                 style={{
//                   textAlign: "center",
//                   color: "#0066b2",
//                   fontWeight: "500",
//                 }}
//               >
//                 Add an Address or pick-up point
//               </Text>
//             </Pressable>
//           </ScrollView>

//           <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
//             <View
//               style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
//             >
//               <Entypo name="location-pin" size={22} color="#0066b2" />
//               <Text style={{ color: "#0066b2", fontWeight: "400" }}>
//                 Enter an Indian pincode
//               </Text>
//             </View>

//             <View
//               style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
//             >
//               <Ionicons name="locate-sharp" size={22} color="#0066b2" />
//               <Text style={{ color: "#0066b2", fontWeight: "400" }}>
//                 Use My Currect location
//               </Text>
//             </View>

//             <View
//               style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
//             >
//               <AntDesign name="earth" size={22} color="#0066b2" />

//               <Text style={{ color: "#0066b2", fontWeight: "400" }}>
//                 Deliver outside India
//               </Text>
//             </View>
//           </View>
//         </ModalContent>
//       </BottomModal>
//     </>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({});

import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Pressable, Image, ActivityIndicator, Alert, TextInput } from 'react-native';
import axios from 'axios';
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [familles, setFamilles] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentHour = new Date().getHours();

  let timeIcon;
  if (currentHour < 12) {
    timeIcon = '🌤️'; // Daytime
  } else if (currentHour < 18) {
    timeIcon = '⛅'; // Afternoon
  } else if (currentHour < 21) {
    timeIcon = '🌕'; // Evening
  } else {
    timeIcon = '🌙'; // Night
  }
  useEffect(() => {
    const fetchFamilles = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:5000/api/familles");
        setFamilles(response.data);
      } catch (error) {
        console.error("Error fetching familles:", error);
        Alert.alert("Error", "Could not fetch familles");
      } finally {
        setLoading(false);
      }
    };

    fetchFamilles();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView>

<View
      style={{
        backgroundColor: "#f3c94a",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 30,
        marginTop: 40,
        height: 60,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#000',
          textAlign: 'center',
          flex: 1,
          fontFamily: 'Arial', // You can change this to any custom font if needed
          letterSpacing: 1.5, // Optional: Add some letter spacing
          paddingHorizontal: 10, // Optional: Adjust padding for better alignment
        }}
      >
        Choisissez une famille ....
      </Text>

      <Text style={{ fontSize: 24, marginLeft: 'auto' }}>
        {timeIcon}
      </Text>
    </View>

 <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 30 }}>
  {familles.map((item, index) => (
    <Pressable
      key={index}
      style={{
        width: '48%',
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20,
      }}
      onPress={() =>
        navigation.navigate('Products', {
          familleId: item.id,
          familleName: item.libelle,
        })
      }
    >
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: 'gray',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2, // Adjust the border width as needed
          borderColor: '#f3c94a', // Set the border color
        }}
      >
        <Image
          style={{
            width: 90,
            height: 90,
            borderRadius: 45,
            resizeMode: 'cover',
          }}
          source={{ uri: item.Image }}
        />
      </View>
      <Text
        style={{
          textAlign: 'center',
          marginTop: 5,
          fontSize: 20,
          fontWeight: '500',
        }}
      >
        {item.libelle}
      </Text>
    

          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
