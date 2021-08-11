import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/TabScreens/HomeScreen';
import PostScreen from '../screens/TabScreens/PostScreen';
import SearchScreen from '../screens/TabScreens/SearchScreen';
import NotifyScreen from '../screens/TabScreens/NotifyScreen';
import ProfileScreen from '../screens/TabScreens/ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator 
    initialRouteName="Home"
    activeColor="black"
    inactiveColor="gray"
    barStyle={{ backgroundColor: '#f5f5dc' }}

    >
      <Tab.Screen name="Home" component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen name="Search" component={SearchScreen} 
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="search" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen name="Post" component={PostScreen} 
        options={{
          tabBarLabel: 'Post',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Notifications" component={NotifyScreen} 
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart-outline" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen name="Profile" component={ProfileScreen} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}