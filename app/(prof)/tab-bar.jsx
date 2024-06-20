import * as React from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import CreateNewEvent from './functions/event';

import { CreateNewGroup } from './functions/group';
import GroupList from './functions/group-list';
import EventList from './functions/event-list';
import { ScrollView } from 'react-native-web';

function Events() {
  return (
    <View className="relative w-full h-full">
      <EventList />
      <View className="absolute w-full h-full z-10">
        <CreateNewEvent />
      </View>
    </View>
  );
}

function Groups() {
  return (
    <View className="relative w-full h-full">
      <GroupList />
      <View className="fixed bottom-0 z-2">
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
