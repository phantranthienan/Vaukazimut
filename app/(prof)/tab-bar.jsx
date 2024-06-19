import * as React from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  CreateNewRunBtn,
  CreateSession,
  CreateNewEvent,
  ShowEvents
} from './functions/session';

function Session() {
  return (
    <View className="relative w-full h-full">
      <ShowEvents />
      <View className="fixed bottom-0 z-10">
        <CreateNewEvent />
      </View>
    </View>
  );
}

function Results() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Results!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Session"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63'
      }}
    >
      <Tab.Screen
        name="Session"
        component={Session}
        options={{
          tabBarLabel: 'Session',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="map-marked-alt" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Results"
        component={Results}
        options={{
          tabBarLabel: 'Results',
          tabBarIcon: ({ color, size }) => (
            <Foundation
              name="results-demographics"
              size={size + 5}
              color={color}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
};

// export default function App() {
//   return (
//     <NavigationContainer>
//       <TabBar />
//     </NavigationContainer>
//   );
// }

export default TabBar;
