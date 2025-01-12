import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';

export default function LoginScreen() {

  const router=useRouter();

  return (
    <View>
      <View style={{ 
        display: 'flex',
        alignItems: 'center',
        marginTop: 40 
        }}>
        <Image source={require('./../../assets/images/login.png')} style={styles?.image} />
      </View>

      <View style={{
        padding: 25,
        backgroundColor: Colors.PRIMARY,
        height: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
      }}>
        <Text style={{
          fontSize: 30,
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center'
        }}>Track your fields, keep track of your Productivity!</Text>

        <Text style={{
          fontSize: 20,
          color: 'white',
          textAlign: 'center',
          marginTop: 20
        }}>Track your soil, take control over your crops. Stay consistent and stay on track!</Text>
        
        <TouchableOpacity style={styles?.button}
        onPress={()=>router.push('login/signIn')}>
          <Text style={{ 
            textAlign: "center", color: Colors.PRIMARY, fontSize: 18 
            }}>Continue</Text>
        </TouchableOpacity>

        <Text style={{textAlign: 'center', marginTop: 5, fontSize: 12, color: 'white'}}>Note: By clicking the Continue button , you agree to our Terms of Service and Privacy Policy.</Text>
        </View>

        
    </View>
  )
}


const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 400,    
    borderRadius: 24
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    borderRadius: 99,
    marginTop: 25
  }
})