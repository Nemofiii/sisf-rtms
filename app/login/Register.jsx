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
  import React from "react";
  import Background from "../components/Background";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./../../config/FirebaseConfig";
import { useState } from "react";
import { useRouter } from "expo-router";
import { setLocalStorage } from '../../service/Storage';
  
  const Register = (props) => {

    const router=useRouter();

    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [userName,setUserName]=useState();
    const [contact,setContact]=useState();

    const OnCreateAccount = () => {

      if(!email||!password||!userName||!contact){
        ToastAndroid.show('Please enter email and password', ToastAndroid.BOTTOM)
        Alert.alert('Please enter email and password')
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
          // Signed up
          const user = userCredential.user;
          // console.log(user)
          
          await updateProfile(user, {
            displayName: userName
          })

          await setLocalStorage('userDetail', user)
          
          router.push('/(tabs)')
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode)
          if(errorCode=='auth/email-already-in-use'){
            ToastAndroid.show('Email already exists', ToastAndroid.BOTTOM)
            Alert.alert('Email already exists')
          }
          // ..
        });
    }

    return (
      <Background>
        <View style={{ alignItems: "center", width: 400 }}>
          <Text style={styles.registerText}>Register</Text>
          <Text style={{color: "white", fontSize: 20, fontWeight: "bold"}}>Create a new account</Text>
        </View>
        <View style={styles.loginWhite}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Full Name"
              onChangeText={(value) => setUserName(value)}
            />
          </View>
          {/* <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Lastname"
            />
          </View> */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Contact"
              onChangeText={(value) => setContact(value)}
            />
          </View>
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
          {/* <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Confirm Password"
              secureTextEntry
            />
          </View> */}
          <TouchableOpacity
            style={{
              backgroundColor: "#2F7159",
              borderRadius: 20,
              alignItems: "center",
              marginHorizontal: 40,
              marginTop: 10,
              marginBottom: 20,
              height: 45,
            }}
            onPress={OnCreateAccount}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
                padding: 6,
              }}
            >
              SignUp
            </Text>
          </TouchableOpacity>
          <View style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
              <Text style={{fontSize: 14, color: "black"}}>Already have an account ? </Text>
              <TouchableOpacity onPress={() => router.push('login/signIn')}>
                 <Text style={{color: "#318658", fontWeight: "600", fontSize: 16}}>Login</Text>
              </TouchableOpacity>
              
          </View>
        </View>
      </Background>
    );
  };
  
  export default Register;
  
  const styles = StyleSheet.create({
    registerText: {
      color: "white",
      fontSize: 60,
      fontWeight: "bold",
      marginTop: "20%",
    },
    loginWhite: {
      height: 620,
      backgroundColor: "white",
      width: "100%",
      borderTopLeftRadius: 200,
      borderTopRightRadius: 200,
      marginTop: 40,
      paddingTop: 90,
    },
    inputContainer: {
      backgroundColor: "#D9D9D9",
      flexDirection: "row",
      marginHorizontal: 40,
      height: 45,
      borderRadius: 20,
      marginVertical: 8,
      // marginTop: 40,
      alignItems: "center",
    },
    textInput: {
      flex: 1,
      marginLeft: 15,
    },
  });
  