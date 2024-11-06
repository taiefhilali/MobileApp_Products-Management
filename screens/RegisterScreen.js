import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons, AntDesign, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

const RegisterScreen = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  const [tel1, setTel1] = useState("");
  const [tel2, setTel2] = useState("");
  const [cin, setCin] = useState("");
  const [profileImage, setProfileImage] = useState(null); // Updated to null for handling file URIs
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  // Function to handle image selection
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission required", "Please enable permissions to access images.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri); // Set the selected image URI
    }
  };

  const handleRegister = async () => {
    const formData = new FormData();

    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("email", email);
    formData.append("adresse", adresse);
    formData.append("ville", ville);
    formData.append("tel1", tel1);
    formData.append("tel2", tel2);
    formData.append("cin", cin);
    formData.append("password", password);

    // Check if an image was selected, then add it to formData
    if (profileImage) {
      const uriParts = profileImage.split(".");
      const fileType = uriParts[uriParts.length - 1];

      formData.append("profileImage", {
        uri: profileImage,
        name: `profile.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    try {
      const response = await axios.post("http://10.0.2.2:5000/api/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      Alert.alert("Registration successful", "You have been registered successfully");
      setNom(""); setPrenom(""); setEmail(""); setAdresse(""); setVille("");
      setTel1(""); setTel2(""); setCin(""); setProfileImage(null); setPassword("");
    } catch (error) {
      Alert.alert("Registration Error", "An error occurred while registering");
      console.log("registration failed", error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image style={styles.logo} source={require("../assets/images/sou9ek.png")} />
      </View>

      <KeyboardAvoidingView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Register to your Account</Text>
        </View>

        {/* Two-Column Layout for Input Fields */}
        <View style={styles.form}>
          <View style={styles.row}>
            <TextInputField icon="ios-person" value={nom} onChangeText={setNom} placeholder="Nom" />
            <TextInputField icon="ios-person" value={prenom} onChangeText={setPrenom} placeholder="Prenom" />
          </View>
          <View style={styles.row}>
            <TextInputField icon="email" iconLib={MaterialIcons} value={email} onChangeText={setEmail} placeholder="Email" />
            <TextInputField icon="lock1" iconLib={AntDesign} value={password} onChangeText={setPassword} placeholder="Mot de passe" secureTextEntry={true} />

          </View>
          
          <View style={styles.row}>
            <TextInputField icon="location-sharp" value={adresse} onChangeText={setAdresse} placeholder="Addresse" />
            <TextInputField icon="location" value={ville} onChangeText={setVille} placeholder="ville" />

          </View>
          <View style={styles.row}>
            <TextInputField icon="call" value={tel1} onChangeText={setTel1} placeholder="tel 1" keyboardType="phone-pad" />
            <TextInputField icon="call" value={tel2} onChangeText={setTel2} placeholder="tel 2 " keyboardType="phone-pad" />
          </View>
          <View style={styles.row}>
            <TextInputField icon="id-card" iconLib={FontAwesome5} value={cin} onChangeText={setCin} placeholder="CIN" keyboardType="numeric" />
          </View>
     
          <View style={styles.row}>
            <Pressable onPress={pickImage} style={styles.imagePickerButton}>
              <Text style={styles.imagePickerButtonText}>Pick Profile Image</Text>
            </Pressable>
            {profileImage && (
              <Image source={{ uri: profileImage }} style={styles.previewImage} />
            )}
          </View>
        </View>

        {/* Register Button */}
        <Pressable onPress={handleRegister} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register</Text>
        </Pressable>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Already have an account? Sign In</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Component for individual input fields
const TextInputField = ({ 
  icon, 
  iconLib: IconLib = Ionicons, 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry = false, 
  keyboardType = "default" 
}) => (
  <View style={styles.inputContainer}>
    {IconLib && <IconLib name={icon} size={20} color="gray" style={styles.icon} />} 
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={styles.input}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 50,
  },
  logo: {
    width: 400,
    height:200,
  },
  header: {
    alignItems: "center",
  },
  headerText: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 12,
    color: "#041E42",
  },
  form: {
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D0D0D0",
    paddingVertical: 5,
    borderRadius: 5,
    width: 150, // Smaller width for two-column layout
    paddingLeft: 8,
    marginRight: 10, // Add margin to create space between fields
  },
  icon: { marginRight: 8 },
  input: {
    color: "gray",
    width: "100%", // Adjust to fill the container
    fontSize: 14, // Smaller font size
  },
  registerButton: {
    width: 200,
    backgroundColor: "#FEBE10",
    borderRadius: 6,
    padding: 15,
    marginTop: 40,
    alignSelf: "center",
  },
  registerButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 15,
  },
  backButtonText: {
    textAlign: "center",
    color: "gray",
    fontSize: 16,
  },
   // Add other styles here
   imagePickerButton: {
    backgroundColor: "#FEBE10",
    padding: 10,
    borderRadius: 5,
  },
  imagePickerButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 10,
  },
});

export default RegisterScreen;
