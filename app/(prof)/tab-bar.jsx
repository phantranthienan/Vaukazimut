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
  CreateEvents,
  CreateNewEvent,
  ShowEvents
} from './functions/event';

import { CreateNewGroup } from './functions/group';

function Events() {
  return (
    <View className="relative w-full h-full">
      <ShowEvents />
      <View className="fixed bottom-0 z-10">
        <CreateNewEvent />
      </View>
    </View>
  );
}

function Groups() {
  return (
    <View className="w-full h-full">
      <View className="fixed top-full z-10">
        <CreateNewGroup />
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const TabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Events"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63'
      }}
    >
      <Tab.Screen
        name="Events"
        component={Events}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="map-marked-alt" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Groups"
        component={Groups}
        options={{
          tabBarLabel: 'Groups',
          tabBarIcon: ({ color, size }) => (
            <Foundation
              name="Groups-demographics"
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
