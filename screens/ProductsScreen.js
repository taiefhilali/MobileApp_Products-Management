import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Alert, Pressable } from 'react-native';
import axios from 'axios';
import ProductItem from '../components/ProductItem';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the arrow icon

const ProductsScreen = ({ route }) => {
  const { familleId, familleName } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://10.0.2.2:5000/api/articles/${familleId}`);
        setProducts(response.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        Alert.alert("Error", "Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [familleId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      {/* Yellow Back Button */}
      <Pressable
        onPress={() => navigation.goBack()} // Navigates to the previous screen
        style={{
          backgroundColor: '#FFC72C',
          padding: 10,
          borderRadius: 20,
          marginBottom: 20,
          width: 100,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          flexDirection: 'row', // To place the icon and text side by side
          alignItems: 'center', // Vertically center the icon and text
          justifyContent: 'center',
        }}
      >
        {/* Back Arrow Icon */}
        <Ionicons name="arrow-back" size={20} color="white" />
        
        {/* Back Text */}
        <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 5 }}>Back</Text>
      </Pressable>
    <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginTop: 10,
          }}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : products.length > 0 ? (
            products.map((item, index) => (
              <ProductItem item={item} key={index} />
            ))
          ) : (
            <Text>No products available</Text>
          )}
        </View>
        </ScrollView>
  );
};

export default ProductsScreen;
