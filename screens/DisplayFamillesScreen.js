import React, { useState, useEffect } from "react";
import { ScrollView, Pressable, Image, Text, View } from "react-native";
import axios from "axios";

const DisplayFamille = () => {
  const [familles, setFamilles] = useState([]);

  useEffect(() => {
    // Fetch data on component mount
    const fetchFamilles = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:8000/api/familles"); // Replace with your API endpoint
        setFamilles(response.data);
      } catch (error) {
        console.error("Error fetching familles:", error);
      }
    };

    fetchFamilles();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {familles.map((item, index) => (
        <Pressable
          key={index}
          style={{
            marginVertical: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 50, height: 50, resizeMode: "contain" }}
            source={{ uri: item.image }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              fontWeight: "500",
              marginTop: 5,
            }}
          >
            {item.name}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default DisplayFamille;
