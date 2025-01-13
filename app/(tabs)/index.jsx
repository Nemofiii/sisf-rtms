import { View, Text, Button } from 'react-native'
import React from 'react'
import { Redirect, useRouter } from 'expo-router'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/FirebaseConfig'
import { RemoveLocalStorage } from '../../service/Storage';
import Header from '../components/Header'
import SensorList from '../components/SensorList'
// import EmptyState from '../../components/EmptyState';

export default function HomeScreen() {

  const router = useRouter();
  const handleSignOut = async () => {
    await RemoveLocalStorage();
    signOut(auth);
    router.push('login');
  };

  return (
    <View style={{
      padding: 25,
      backgroundColor: 'white',
      height: '100%',
    }}>
      <Header/>
      <SensorList />
      
      <Button title='Logout' onPress={() => handleSignOut()}/>
    </View>
  )
}