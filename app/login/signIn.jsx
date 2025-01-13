import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    ToastAndroid,
    Alert,
  } from "react-native";
  import React, { useState } from "react";
  import Background from "../components/Background";
  import { useRouter } from "expo-router";
  import { auth } from "../../config/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setLocalStorage } from '../../service/Storage';
  
  const LoginScreen = (props) => {
  
    const router=useRouter();
  
      const [email, setEmail] = useState();
      const [password, setPassword] = useState();
      
      OnSignInClick = () => {
  
        if(!email||!password){
          ToastAndroid.show('Please enter email and password', ToastAndroid.BOTTOM)
          Alert.alert('Please enter email and password')
          return
        }
  
        signInWithEmailAndPassword(auth, email, password)
          .then(async(userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user)
            await setLocalStorage('userDetail', user)
            router.replace('(tabs)')
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode=='auth/invalid-credentials'){
              ToastAndroid.show('Invalid credentials', ToastAndroid.BOTTOM)
              Alert.alert('Invalid credentials')
            }
          });
      }
  
    return (
      <Background>
        <View style={{ alignItems: "center", width: '100%' }}>
          <Text style={styles.loginText}>Login</Text>
        </View>
        <View style={styles.loginWhite}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text
            style={{
              color: "#787878",
              textAlign: "center",
              marginBottom: 30,
              fontSize: 18,
              fontWeight: "500",
            }}
          >
            Login to your account
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              keyboardType={"email-address"}
              onChangeText={(value) => setEmail(value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              secureTextEntry
              onChangeText={(value) => setPassword(value)}
            />
          </View>
          <View style={{ alignItems: "flex-end", marginEnd: 40 }}>
              <TouchableOpacity>
                  <Text style={{ color: "#318658", fontSize: 15, fontWeight: "500" }}>
                     Forgot Password ?
                  </Text>
              </TouchableOpacity>
            
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#2F7159",
              borderRadius: 20,
              alignItems: "center",
              marginHorizontal: 40,
              marginTop: 50,
              marginBottom: 20,
              height: 45,
            }}
            // onPress={() => alert("Logged In")}
            onPress={OnSignInClick}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
                padding: 6,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <View style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
              <Text style={{fontSize: 14, color: "black"}}>Don't have an account ? </Text>
              <TouchableOpacity onPress={() => router.push('login/Register')}>
                 <Text style={{color: "#318658", fontWeight: "600", fontSize: 16}}>SignUp</Text>
              </TouchableOpacity>
              
          </View>
        </View>
      </Background>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({
    loginText: {
      color: "white",
      fontSize: 60,
      fontWeight: "bold",
      marginTop: "35%",
      textAlign: "center",
    },
    loginWhite: {
      height: '100%',
      backgroundColor: "white",
      width: "100%",
      borderTopLeftRadius: 200,
      borderTopRightRadius: 200,
      marginTop: 20,
      paddingTop: 90,
    },
    welcomeText: {
      color: "#318658",
      fontSize: 35,
      fontWeight: "bold",
      textAlign: "center",
    },
    accntText: {
      color: "#787878",
    },
    inputContainer: {
      backgroundColor: "#D9D9D9",
      flexDirection: "row",
      marginHorizontal: 40,
      height: 45,
      borderRadius: 20,
      marginVertical: 20,
      // marginTop: 40,
      alignItems: "center",
    },
    textInput: {
      flex: 1,
      marginLeft: 15,
    },
  });
  