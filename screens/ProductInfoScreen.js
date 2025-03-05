import React, { useState } from "react";
import { ScrollView, Text, View, Pressable, TextInput, ImageBackground, Dimensions, Image } from "react-native";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const ProductInfoScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const { item } = route.params;
  const { carouselImages } = route.params;
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const height = (width * 100) / 100;
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  return (
    <ScrollView
      style={{ marginTop: 55, flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      {/* Search Bar and Icons */}
      <View
            style={{
              backgroundColor: "#f3c94a",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 10,
              // marginTop:1
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 7,
                gap: 10,
                backgroundColor: "white",
                borderRadius: 30,
                height: 38,
                flex: 1,

              }}
            >
          <AntDesign style={{ paddingLeft: 10 }} name="search1" size={22} color="black" />
          <TextInput placeholder="Search" />
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>

      {/* Image Carousel */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {carouselImages?.map((image, index) => (
          <ImageBackground
            key={index}
            style={{ width, height, marginTop: 25, resizeMode: "contain" }}
            source={{ uri: image.Image }}  // Ensure `image.Image` exists and is valid
          >
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#C60C30",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  20% off
                </Text>
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <MaterialCommunityIcons name="share-variant" size={24} color="black" />
              </View>
            </View>

            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: "auto",
                marginLeft: 20,
                marginBottom: 20,
              }}
            >
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      {/* Product Details */}
      <View style={{ padding: 10 }}>
        {/* Product Image */}
        {item?.Image && (
          <Image
            source={{ uri: item.Image }}
            style={{ width: '100%', height: 200, resizeMode: 'contain', marginBottom: 10 }}
          />
        )}

        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          {item?.designation} {/* Product designation */}
        </Text>

        <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 ,marginLeft:320}}>
          {item?.prixDeVenteTTC} dt {/* Price */}
        </Text>

        {/* Divider */}
        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />



  

        {/* Divider */}
        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

        {/* Additional Info */}
        <View style={{ padding: 10 }}>
          {/* <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
            Totale : {item?.prixDeVenteTTC} dt 
          </Text>
        */}

          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
              alignItems: "center",
              gap: 5,
            }}
          >
        
          </View>
        </View>

        {/* Stock Status */}
        {/* <Text style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}>
          IN Stock
        </Text> */}

        {/* Add to Cart Button */}
        <Pressable
          onPress={() => addItemToCart(item)}
          style={{
            backgroundColor: "#FFC72C",
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        >
          {addedToCart ? (
            <Text>Ajouté au Panier</Text>
          ) : (
            <Text>Ajouter au Panier</Text>
          )}
        </Pressable>

        {/* Buy Now Button */}
        <Pressable
          style={{
            backgroundColor: "#FFAC1C",
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 10,
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <Text>Retour aux Familles</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ProductInfoScreen;
