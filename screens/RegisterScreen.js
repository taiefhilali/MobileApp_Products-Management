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
import Toast from 'react-native-toast-message';
 
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
  const [nomError, setNomError] = useState("");
  const [prenomError, setPrenomError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [adresseError, setAdresseError] = useState("");
  const [villeError, setVilleError] = useState("");
  const [tel1Error, setTel1Error] = useState("");
  const [cinError, setCinError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigation = useNavigation();
  const validateInputs = () => {
    let isValid = true;

    // Name validation
    if (!nom.trim()) {
      setNomError("Nom is required.");
      isValid = false;
    } else {
      setNomError("");
    }

    // Prenom validation
    if (!prenom.trim()) {
      setPrenomError("Prenom is required.");
      isValid = false;
    } else {
      setPrenomError("");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Address validation
    if (!adresse.trim()) {
      setAdresseError("Adresse is required.");
      isValid = false;
    } else {
      setAdresseError("");
    }

    // Ville validation
    if (!ville.trim()) {
      setVilleError("Ville is required.");
      isValid = false;
    } else {
      setVilleError("");
    }

    // Phone number validation
    const phoneRegex = /^\d{8}$/;
    if (!tel1 || !phoneRegex.test(tel1)) {
      setTel1Error("Enter a valid 8-digit phone number.");
      isValid = false;
    } else {
      setTel1Error("");
    }

    // CIN validation
    const cinRegex = /^\d{8}$/;
    if (!cin || !cinRegex.test(cin)) {
      setCinError("CIN must be an 8-digit number.");
      isValid = false;
    } else {
      setCinError("");
    }

    // Password validation
    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

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
    if (!validateInputs()) {
      return; // Exit if validation fails
    }
  
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("email", email);
    formData.append("adresse", adresse);
    formData.append("ville", ville);
    formData.append("tel1", tel1);
    formData.append("tel2", tel2 || ""); // Optional field
    formData.append("cin", cin);
    formData.append("password", password);
  
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
      // Show success toast
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Inscription réussie',
        text2: 'Veuillez attendre la vérification de votre compte.',
        visibilityTime: 6000,
        autoHide: true,
      });
      
      // Reset form fields
      setNom(""); setPrenom(""); setEmail(""); setAdresse(""); setVille("");
      setTel1(""); setTel2(""); setCin(""); setProfileImage(null); setPassword("");
    } catch (error) {
      // Show error toast
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erreur d`inscription',
        text2: 'Une erreur s`est produite lors de l`inscription.',
        visibilityTime: 3000,
        autoHide: true,
      });
  
      console.log("registration failed", error);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image style={styles.logo} source={require("../assets/images/sou9ekbg.png")} />
      </View>

      <KeyboardAvoidingView>
        <View style={styles.header}>
          {/* <Text style={styles.headerText}>Register to your Account</Text> */}
        </View>

        {/* Two-Column Layout for Input Fields */}
        <View style={styles.form}>
          <View style={styles.row}>
            <TextInputField icon="ios-person" value={nom} onChangeText={setNom} placeholder="Nom"

            />
            {nomError ? <Text style={styles.errorText}>{nomError}</Text> : null}
            </View>

          <View style={styles.row}>

            <TextInputField icon="ios-person" value={prenom} onChangeText={setPrenom} placeholder="Prenom" />
           
            {prenomError ? <Text style={styles.errorText}>{prenomError}</Text> : null}

          </View>
          <View style={styles.row}>
         
          <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}




          </View>

          <View style={styles.row}>
            <TextInputField icon="location-sharp" value={adresse} onChangeText={setAdresse} placeholder="Addresse" />
            {adresseError ? <Text style={styles.errorText}>{adresseError}</Text> : null}
            </View>
            <View style={styles.row}>

            <TextInputField icon="location" value={ville} onChangeText={setVille} placeholder="ville" />
            {villeError ? <Text style={styles.errorText}>{villeError}</Text> : null}


          </View>
          <View style={styles.row}>
            <TextInputField icon="call" value={tel1} onChangeText={setTel1} placeholder="tel 1" keyboardType="phone-pad" />
            {tel1Error ? <Text style={styles.errorText}>{tel1Error}</Text> : null}
            </View>
            <View style={styles.row}>

            <TextInputField icon="call" value={tel2} onChangeText={setTel2} placeholder="tel 2 " keyboardType="phone-pad" />

          </View>
          <View style={styles.row}>
            <TextInputField icon="id-card" iconLib={FontAwesome5} value={cin} onChangeText={setCin} placeholder="CIN" keyboardType="numeric" />
            {cinError ? <Text style={styles.errorText}>{cinError}</Text> : null}
            </View>
            <View style={styles.row}>

            <TextInputField icon="lock1" iconLib={AntDesign} value={password} onChangeText={setPassword} placeholder="Mot de passe" secureTextEntry={true} />

            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          </View>

          <View style={styles.row}>
            <Pressable onPress={pickImage} style={styles.imagePickerButton}>
              <Text style={styles.imagePickerButtonText}>Choisir une image de profil</Text>
            </Pressable>
            {profileImage && (
              <Image source={{ uri: profileImage }} style={styles.previewImage} />
            )}
          </View>
        </View>

        {/* Register Button */}
        <Pressable onPress={handleRegister} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Inscrivez-vous</Text>
        </Pressable>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Vous avez déjà un compte ? Connectez-vous </Text>
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

  logo: {
    width: 500,
    height: 200,
    alignSelf: "center",
    marginBottom: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 20, 
  },
  headerText: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 12,
    color: "#041E42",
  },
  form: {
    marginTop: 30,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    width: "90%",
    maxWidth: 750, 
    marginBottom: 40, 
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D0D0D0",
    paddingVertical: 8,
    borderRadius: 10,
    width: "100%",
    paddingLeft: 15,
    marginBottom: 10, 
    borderWidth: 1,
    borderColor: "#D0D0D0",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  icon: { marginRight: 8 },
  input: {
    width: "100%",
    fontSize: 14,
    height: 35, 
  },
  registerButton: {
    width: 200,
    backgroundColor: "#FEBE10",
    borderRadius: 6,
    padding: 12,
    marginTop: 30, 
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
  textInput: {
    marginVertical: 8, 
    width: "100%",
    height: 40, 
    fontSize: 14, 
    borderRadius: 10, 
    paddingHorizontal: 15,
    paddingVertical: 8, 
 
  },
});

export default RegisterScreen;
