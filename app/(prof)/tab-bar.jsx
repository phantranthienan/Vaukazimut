import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

function Session() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Session!</Text>
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
