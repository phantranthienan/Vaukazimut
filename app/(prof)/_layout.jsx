import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, StyleSheet, View, Alert } from 'react-native';
import { clearStorage } from '../../utils/handleAsyncStorage'; // Ensure this path is correct
import { logOut, updateAxios } from '../../utils/useAPI'; // Ensure this path is correct
// const Tab = createBottomTabNavigator();

const ProfLayout = () => {
  router = useRouter();
  const handleLogout = async () => {
    try {
      await logOut();
      await clearStorage();
      updateAxios();
      Alert.alert('Logged out successfully');
      router.replace('/'); // Replace with your login screen route
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Stack>
        <Stack.Screen
          name="tab-bar"
          options={{
            title: 'Professor',
            headerRight: () => (
              <TouchableOpacity onPress={handleLogout} className="mt-2">
                <Text className="font-plight text-red-600">Logout</Text>
              </TouchableOpacity>
            )
          }}
        />
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
