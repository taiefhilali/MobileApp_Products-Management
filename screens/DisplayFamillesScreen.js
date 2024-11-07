import React, { useState, useEffect } from "react";
import { FlatList, Pressable, Image, Text, View, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

const DisplayFamille = () => {
  const [familles, setFamilles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFamilles = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:5000/api/familles");
        setFamilles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching familles:", error);
        setLoading(false);
      }
    };

    fetchFamilles();
  }, []);

  const renderItem = ({ item }) => (
    <Pressable style={styles.card}>
      <Image
        source={{ uri: "https://png.pngtree.com/element_our/20200702/ourlarge/pngtree-yellow-paint-dripping-from-top-to-bottom-image_2285367.jpg" }} // Replace with actual image URL
        style={styles.image}
      />
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{item.libelle}</Text>
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={familles}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    height: 100,
    width: 150, // Set a fixed width for the card (make it smaller)
    borderRadius: 20,
    backgroundColor: '#FFFFFF', // White background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center', // Center the content inside the card
  },
  image: {
    marginTop:-30,
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  textWrapper: {
    marginTop:-30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background for text area
    paddingVertical: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#757575', // Gray color for text
  },
  row: {
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
  },
});

export default DisplayFamille;
