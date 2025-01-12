import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Tabs, useRouter } from 'expo-router'

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getLocalStorage } from '../../service/Storage';

export default function TabLayout() {

    const router = useRouter();
    
    useEffect(() => {
      GetUserDetail()
    },[])

    const GetUserDetail = async() => {
      const userInfo = await getLocalStorage('userDetail')
      if(!userInfo){
        router.replace('/login')
      }
    }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="index" 
        options={{ 
             tabBarLabel: 'Home',
             tabBarIcon: ({ color, size }) => (
             <FontAwesome5 name="home" size={size} color={color} /> 
             )
            }} />
        <Tabs.Screen name="Analytics" 
        options={{
            tabBarLabel: 'Analytics',
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="analytics-sharp" size={size} color={color} />
            )
        }} />
        <Tabs.Screen name="Profile" 
        options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
            )
        }} />
    </Tabs>
  )
}