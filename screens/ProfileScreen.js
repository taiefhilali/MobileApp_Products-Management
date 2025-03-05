import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import sou9ekImage from '../assets/images/sou9ekbg.png'; // Adjust the path if necessary

const ProfileScreen = () => {
  const { userId } = useContext(UserType);
  const [ setOrders] = useState([]);
  const [ setLoading] = useState(true);
  const [user, setUser] = useState();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#f3c94a",
      },
      headerLeft: () => (
        <Image
          style={{ width: 230, height: 320, resizeMode: "contain" }}
          source={sou9ekImage}
        />
      ),
    });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
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

  const logout = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("Login");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8000/orders/${userId}`
        );
        const orders = response.data.orders;
        setOrders(orders);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <ScrollView style={styles.scrollContainer}>
      {/* <Text style={styles.welcomeText}>Bienvenue Monsieur/Madame : {user?.nom}</Text> */}

      <View style={styles.profileContainer}>
        {user ? (
          <View style={styles.card}>
            {/* Profile Image */}
            <View style={styles.imageContainer}>
              <Image source={{ uri: user.profileImage }} style={styles.image} />
            </View>

            {/* User Name */}
            <Text style={styles.name}>{user.nom} {user.prenom}</Text>

            {/* User Details */}
            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{user.email}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.label}>CIN:</Text>
                <Text style={styles.value}>{user.cin}</Text>
              </View>
            </View>
          </View>
        ) : (
          <Text style={styles.loadingText}>Loading user data...</Text>
        )}
      </View>

      <Pressable onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  profileContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
    padding: 20,
    marginBottom: 30,
  },
  card: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#333",
  },
  detailsContainer: {
    width: "100%",
    paddingTop: 16,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
