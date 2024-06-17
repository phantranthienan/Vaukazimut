import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();

const ProfLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="tab-bar" options={{ title: 'Professor' }} />
      </Stack>
    </>
  );
};

export default ProfLayout;

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();

// const navigationTab = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// };

// export default navigationTab;
