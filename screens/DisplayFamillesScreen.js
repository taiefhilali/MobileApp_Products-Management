import React, { useState, useEffect } from "react";
import { FlatList, Pressable, Image, Text, View, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

const DisplayFamille = () => {
  const [familles, setFamilles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFamille, setSelectedFamille] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Fetch familles when the component mounts
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

  // Fetch products for the selected famille
  const fetchProductsForFamille = async (familleId) => {
    setLoadingProducts(true);
    try {
      const response = await axios.get(`http://10.0.2.2:5000/api/articles`);
      setProducts(response.data);
      setLoadingProducts(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoadingProducts(false);
    }
  };

  // Handle clicking on a famille item
  const handleFamilleClick = (famille) => {
    setSelectedFamille(famille);
    fetchProductsForFamille(famille.id);  // Assuming each famille has a unique 'id'
  };

  const renderFamilleItem = ({ item }) => (
    <Pressable style={styles.card} onPress={() => handleFamilleClick(item)}>
      <Image
        source={{ uri: "https://png.pngtree.com/element_our/20200702/ourlarge/pngtree-yellow-paint-dripping-from-top-to-bottom-image_2285367.jpg" }} // Replace with actual image URL
        style={styles.image}
      />
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{item.libelle}</Text>
      </View>
    </Pressable>
  );

  const renderProductItem = ({ item }) => (
    <View style={styles.productCard}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={familles}
        renderItem={renderFamilleItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Display products if a famille is selected */}
      {selectedFamille && (
        <View style={styles.productsContainer}>
          <Text style={styles.sectionTitle}>Products under {selectedFamille.libelle}</Text>
          {loadingProducts ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={products}
              renderItem={renderProductItem}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    margin: 10,
    height: 100,
    width: 150,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: -30,
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  textWrapper: {
    marginTop: -30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#757575',
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
  productsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productCard: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#555',
  },
});

export default DisplayFamille;
