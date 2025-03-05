
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Pressable, FlatList } from 'react-native';
import {  Feather, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from 'date-fns'; // For formatting time (install date-fns library)

const HomeScreen = () => {
  const [familles, setFamilles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [deals, setDeals] = useState([]);
  const [user, setUser] = useState();
  const [ setArticles] = useState([]); // New state for articles
  const [products, setProducts] = useState([]);
  const [currentTime, setCurrentTime] = useState(format(new Date(), 'HH:mm'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(format(new Date(), 'HH:mm'));
    }, 1000); // Update time every second

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);
  useEffect(() => {
    axios.get('http://10.0.2.2:5000/api/articles/all')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => setLoading(false));
  }, []);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve user data from AsyncStorage (or localStorage for web)
        const userData = await AsyncStorage.getItem("userDetails"); // Adjust key name as needed
        if (userData) {
          setUser(JSON.parse(userData)); // Parse JSON if stored as a string
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  useEffect(() => {
    const fetchDeals = async () => {
      const userToken = await AsyncStorage.getItem('authToken'); // Assuming 'userToken' is stored upon login

      try {
        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];

        // Make the API request to fetch articles with promotion code and sorted by datedebut in descending order
        const response = await axios.get(`http://10.0.2.2:5000/api/articles/all`, {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'

          },

          params: {
            debutDate: today,
            sortOrder: 'desc' // You can add this if the API allows sorting by a field
          }
        });

        // Set the fetched deals in the state
        setDeals(response.data);
      } catch (error) {
        console.error('Error fetching deals:', error.response ? error.response.data : error.message);
      }
    };

    fetchDeals();
  }, []);
  useEffect(() => {
    // Fetch articles for the new section
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:5000/api/articles/all"); // Adjust to your API endpoint
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };   
     fetchArticles();
  }, []);
  const fetchFamilles = async () => {
    setLoading(true);
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
  useEffect(() => {
    fetchFamilles(); // Initial fetch

    const interval = setInterval(() => {
      fetchFamilles(); // Refresh data every 20 seconds
    }, 20000);

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#f3c94a" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
      {/* Time */}
      <Text style={styles.time}>{currentTime}</Text>

      {/* Icons */}
      <View style={styles.icons}>
        <Feather name="wifi" size={20} color="white" />
        <Ionicons name="battery-full" size={20} color="white" style={styles.iconSpacing} />
        <Feather name="bell" size={20} color="white" style={styles.iconSpacing} />
      </View>

      {/* Greeting and Avatar */}
      <View style={styles.greetingContainer}>
        {/* User Avatar */}
        {user?.Image ? (
          <Image source={{ uri: user.Image }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{user?.nom?.charAt(0)}</Text>
          </View>
        )}
        <Text style={styles.greeting}>Bienvenue, {user?.nom}</Text>
      </View>
    </View>


      <Image
        source={{ uri: 'https://img.freepik.com/vecteurs-premium/service-livraison-ligne-smartphone-commande-ligne-site-web-marketing-numerique-entrepot-avion-camion-boite-colis-concept-pour-site-web-banniere-illustration-vectorielle-isometrique_473922-134.jpg' }}
        style={styles.trendingImage}
      />

      {/* Categories Section */}
      <Text style={styles.dealscontainer}>Familles</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryCarousel}>
        <FlatList
          data={familles}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          renderItem={({ item }) => (
            <Pressable
              style={styles.categoryItem}
              onPress={() => navigation.navigate("Products", { familleId: item.id, familleName: item.libelle })}
            >
              <View style={styles.imageBackground}>
                <Image
                  source={{ uri: item.Image && item.Image !== '' ? item.Image : 'https://example.com/placeholder-image.png' }}
                  style={styles.categoryImage}
                />
              </View>
              <Text style={styles.categoryText}>{item.libelle}</Text>
            </Pressable>
          )}
        />
      </ScrollView>




      {/* Promotion Banner */}
      <View style={styles.promoBanner}>
        <Text style={styles.promoText}>Articles on promotion</Text>
        <TouchableOpacity style={styles.shopNow}><Text style={styles.shopNowText}>Swipe Now</Text></TouchableOpacity>
      </View>

      <View style={styles.dealscontainer}>
        <Text style={styles.dealssectionTitle}>Deals of Today</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            data={deals}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            renderItem={({ item }) => (
              <View style={[styles.dealCard, { marginRight: 10 }]}>
                <Image
                  source={{ uri: item.Image && item.Image !== '' ? item.Image : 'https://example.com/placeholder-image.png' }}
                  style={styles.dealImage}
                />
                <View>
                  <Text style={styles.dealTitle}>{item.designation}</Text>
                  <Text style={styles.price}>{item.prixDeVenteTTC}DT</Text>
                  <Text style={styles.promo}>Ends Today at {new Date(item.finDate).toLocaleTimeString()}</Text>
                </View>
              </View>
            )}
          />

        </ScrollView>


      </View>
      <View style={styles.articlesSection}>
      <Text style={styles.sectionTitle}>Featured Articles</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.articleCard}>
              <Image
                source={{ uri: item.Image && item.Image !== '' ? item.Image : 'https://example.com/placeholder-image.png' }}
                style={styles.articleImage}
              />
              <Text style={styles.articleTitle}>{item.designation}</Text>
              <Text style={styles.articleDescription}>{item.prixDeVenteTTC}DT</Text>
            </View>
          )}
        />
      </ScrollView>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#3b3b3b', // Dark background for contrast
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5, // Add shadow for depth
  },
  time: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginLeft: 15,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
  },
  location: { color: 'white', fontSize: 14 },
  searchBar: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, marginTop: 10, padding: 8 },
  searchIcon: { marginRight: 5 },
  searchInput: { flex: 1 },
  categoryCarousel: { marginTop: 15, paddingHorizontal: 10 },
  promoBanner: { backgroundColor: '#f3c94a', margin: 15, padding: 20, borderRadius: 10, alignItems: 'center' },
  promoText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  shopNow: { marginTop: 10, backgroundColor: 'white', padding: 8, borderRadius: 5 },
  shopNowText: { color: '#f3c94a', fontWeight: 'bold' },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20 },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 15 },
  gridImage: { width: '30%', height: 80, borderRadius: 10, marginBottom: 10 },
  trendingImage: { width: '90%', height: 250, alignSelf: "center", borderRadius: 10, marginVertical: 10, marginTop: 30 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#00c08d', padding: 15, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  categoryItem: {
    alignItems: 'center',
    marginRight: 15
  },
  imageBackground: {
    width: 120,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    width: 90,
    height: 90,
    borderRadius: 30,
  },
  categoryText: {
    fontSize: 12,
    marginTop: 5
  },
  dealscontainer: { padding: 20 },
  dealssectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  dealstrendingImage: { width: '100%', height: 150, marginBottom: 10, borderRadius: 10 },
  dealCard: { flexDirection: 'row', padding: 10, backgroundColor: '#fff', marginBottom: 10, borderRadius: 10, elevation: 3 },
  dealImage: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  dealTitle: { fontSize: 16, fontWeight: 'bold' },
  price: { color: 'green', fontSize: 14 },
  promo: { color: 'red', fontSize: 12 },
  articlesSection: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
 
  articleCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  articleImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  articleDescription: {
    fontSize: 14,
    color: '#888',
    marginTop: 3,
  },


});

export default HomeScreen;
