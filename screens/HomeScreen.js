
import React, { useEffect,useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet,ActivityIndicator, Pressable } from 'react-native';
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [familles, setFamilles] = useState([]);
 const [loading, setLoading] = useState(false);
 const navigation = useNavigation();

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
        <Text style={styles.time}>11:00 A.M</Text>
        <View style={styles.icons}>
          <Feather name="wifi" size={20} color="white" />
          <Ionicons name="battery-full" size={20} color="white" style={styles.iconSpacing} />
          <Feather name="bell" size={20} color="white" style={styles.iconSpacing} />
        </View>
        <Text style={styles.greeting}>Hi Usman!</Text>
        <Text style={styles.location}>COMSATS University Islamabad</Text>
        <View style={styles.searchBar}>
          <FontAwesome name="search" size={16} color="gray" style={styles.searchIcon} />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>
      </View>

      {/* Categories Carousel */}



      {/* Categories Section */}
      <Text style={styles.sectionTitle}>Familles</Text>
<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryCarousel}>
  {familles.map((famille, index) => (
    <Pressable
      key={index}
      style={styles.categoryItem}
      onPress={() => navigation.navigate("Products", { familleId: famille.id, familleName: famille.libelle })} // Pass familleId
    >
      {/* Circular Background */}
      <View style={styles.imageBackground}>
        <Image source={{ uri: famille.Image }} style={styles.categoryImage} />
      </View>
      <Text style={styles.categoryText}>{famille.libelle}</Text>
    </Pressable>
  ))}
</ScrollView>

      {/* Promotion Banner */}
      <View style={styles.promoBanner}>
        <Text style={styles.promoText}>Articles on promotion</Text>
        <TouchableOpacity style={styles.shopNow}><Text style={styles.shopNowText}>Swipe Now</Text></TouchableOpacity>
      </View>



      {/* Trending Section */}
      <Text style={styles.sectionTitle}>Deals of Today</Text>
      <Image 
  source={{ uri: 'https://img.freepik.com/free-photo/top-view-fruits-vegetables-diet-foods-arrangement_23-2148674262.jpg' }} 
  style={styles.trendingImage} 
/>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#f3c94a', padding: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  time: { color: 'white', fontSize: 14 },
  icons: { flexDirection: 'row', position: 'absolute', right: 20, top: 15 },
  iconSpacing: { marginLeft: 10 },
  greeting: { color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  location: { color: 'white', fontSize: 14 },
  searchBar: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, marginTop: 10, padding: 8 },
  searchIcon: { marginRight: 5 },
  searchInput: { flex: 1 },
  categoryCarousel: { marginTop: 15, paddingHorizontal: 10 },
  promoBanner: { backgroundColor: '#f3c94a', margin: 15, padding: 20, borderRadius: 10, alignItems: 'center' },
  promoText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  shopNow: { marginTop: 10, backgroundColor: 'white', padding: 8, borderRadius: 5 },
  shopNowText: { color: '#f3c94a', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 15, marginTop: 20 },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 15 },
  gridImage: { width: '30%', height: 80, borderRadius: 10, marginBottom: 10 },
  trendingImage: { width: '90%', height: 150, alignSelf: 'center', borderRadius: 10, marginVertical: 10 },
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


});

export default HomeScreen;
