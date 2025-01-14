import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import Colors from '../../constant/Colors';
import { getLocalStorage } from '../../service/Storage';
import { signOut } from 'firebase/auth';
import { RemoveLocalStorage } from '../../service/Storage';
import { auth } from '../../config/FirebaseConfig';
export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const userInfo = await getLocalStorage('userDetail');
    console.log(userInfo);
    setUser(userInfo);
  };
  const handleSignOut = async () => {
    try {
      await RemoveLocalStorage();
      await signOut(auth);
      router.replace('/login');
    } catch (error) {
      console.error(error);
    }
  };

  // const Menu = [
  //   {
  //     id: 1,
  //     name: 'Add New Medication',
  //     icon: 'add-circle',
  //     path: '/add-new-medication',
  //   },
  //   {
  //     id: 2,
  //     name: 'My Medication',
  //     icon: 'medkit',
  //     path: '/(tabs)',
  //   },
  //   {
  //     id: 3,
  //     name: 'History',
  //     icon: 'time',
  //     path: '/History',
  //   },
  // ];

  const onPress = (Menu) => {
    router.push(Menu.path);
  };

  return (
    <View
      style={{
        padding: 25,
        backgroundColor: 'white',
        height: '100%',
      }}
    >
      <Text style={{ fontSize: 30, fontFamily: 'outfit-medium', color: Colors.DARK_GRAY }}>Profile</Text>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          marginVertical: 30,
        }}
      >
        {/* <Image
          source={require('../../assets/images/smiley.png')}
          style={{ width: 100, height: 100 }}
        /> */}
        <Text
          style={{
            color: Colors.PRIMARY,
            fontSize: 24,
            fontFamily: 'outfit-bold',
            marginTop: 10,
            fontWeight: 'bold',
          }}
        >
          {user?.displayName}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'outfit',
            color: Colors.GRAY,
          }}
        >
          {user?.email}
        </Text>
      </View>
      {/* <FlatList
        data={Menu}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onPress(item)}
            style={{
              marginVertical: 20,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Ionicons
              name={item.icon}
              size={30}
              color={Colors.PRIMARY}
              style={{
                padding: 10,
                backgroundColor: Colors.LIGHT_PRIMARY,
                borderRadius: 10,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'outfit',
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      /> */}
      <View
        style={{
          padding: 20,
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 20,
            borderRadius: 10,
            width: '80%',
          }}
          onPress={() => handleSignOut()}
        >
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              textAlign: 'center',
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}