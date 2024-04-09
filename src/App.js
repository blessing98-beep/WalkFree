import React from "react";
import { View, Text, SafeAreaView, Platform } from "react-native";
import { StyleSheet } from "react-native";
import Reader from "./Reader";
import Indoor from "./Indoor";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from "@react-navigation/native";
import Outdoor from "./Out";
import Detection from "./Detection";
import { StatusBar } from "expo-status-bar";

const Tab = createMaterialTopTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',           
            textTransform: 'uppercase', // Convert tab labels to uppercase
          },
          tabBarStyle: {
            backgroundColor: '#8E08DB',
            height: Platform.OS === 'ios' ? 80 : 60,
          },
          tabBarIndicatorStyle: {
            backgroundColor: 'white', // Customize the indicator color
          },
          tabBarActiveTintColor: 'white', // Customize the active tab text color
          tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)', // Customize the inactive tab text color
        }}
      >
        <Tab.Screen name="Detect" component={Detection} />
        <Tab.Screen name="Reader" component={Reader} />
        <Tab.Screen name="Indoor" component={Indoor} />
        <Tab.Screen name="Outdoor" component={Outdoor} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;