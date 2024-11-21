import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For React Native
// Use `localStorage` if it's a web environment

const UserProfileHeader = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve user data from AsyncStorage (or localStorage for web)
        const userData = await AsyncStorage.getItem("loggedInUser"); // Adjust key name as needed
        if (userData) {
          setUser(JSON.parse(userData)); // Parse JSON if stored as a string
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
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
      {user ? (
        <>
          <Image
            source={{ uri: user.image }} // Replace `user.image` with the actual key
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              marginRight: 10,
            }}
          />
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {user.firstName} {user.lastName}
          </Text>
        </>
      ) : (
        <Text style={{ fontSize: 16 }}>Loading user...</Text>
      )}
    </View>
  );
};

export default UserProfileHeader;
