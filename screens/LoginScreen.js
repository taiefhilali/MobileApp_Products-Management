import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          navigation.replace("Main");
        }
      } catch (err) {
        console.log(" checking login status:", err);
      }
    };
    checkLoginStatus();
  }, []);

  const validateInputs = () => {
    let isValid = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
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
  const handleLogin = () => {
    if (!validateInputs()) {
      return;
    }
  
    const user = {
      identifier: email,
      password,
    };
  
    axios
      .post("http://10.0.2.2:5000/api/users/login", user)
      .then(async (response) => {
        const token = response.data.token;
        const userDetails = response.data.user;
        const userId = userDetails.cin;
  
        try {
          await AsyncStorage.setItem("authToken", token);
          await AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));
          await AsyncStorage.setItem("userId", userId);
  
          navigation.replace("Main");
        } catch (err) {
          console.log("Error saving user data:", err);
        }
      })
      .catch((error) => {
        // Show French toast for login error
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Erreur de connexion',
          text2: 'Identifiants invalides. Veuillez réessayer.',
          visibilityTime: 5000,
          autoHide: true,
        });
        console.log(error.response ? error.response.data : error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}
     >
    
      <View>
        <Image style={styles.logo} source={require("../assets/images/sou9ek.png")} />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          {/* <Text style={styles.title}>Connectez-vous à votre compte</Text> */}
        </View>
        <View style={styles.form}>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <MaterialIcons name="email" size={24} color="gray" style={styles.icon} />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.textInput}
              placeholder="Enter your Email"
              keyboardType="email-address"
            />
          </View>
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <AntDesign name="lock1" size={24} color="gray" style={styles.icon} />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={styles.textInput}
              placeholder="Enter your Password"
            />
          </View>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>
</View>
        <Pressable onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 15 }}
        >
          <Text style={styles.registerText}>
          Vous n'avez pas de compte ? Inscrivez-vous






</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  logo: {
    width: 700,
    height: 200,
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 12,
    color: "#041E42",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D0D0D0",
    paddingVertical: 8,
    borderRadius: 10,
    width: "70%",
    paddingLeft: 15,
    marginBottom: 10, 
    borderWidth: 1,
    borderColor: "#D0D0D0",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D0D0D0",
    paddingVertical: 5,
    borderRadius: 5,
  },
  icon: {
    marginLeft: 8,
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
  textInput: {
    marginVertical: 8, 
    width: "80%",
    height: 40, 
    fontSize: 14, 
    borderRadius: 10, 
    paddingHorizontal: 15,
    paddingVertical: 8, 
 
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  loginButton: {
    width: 200,
    backgroundColor: "#FEBE10",
    borderRadius: 6,
    padding: 15,
    marginTop: 50,
    marginBottom: 20,
    alignSelf: "center",
  },
  loginButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    textAlign: "center",
    color: "gray",
    fontSize: 16,
  },
});
