// pages/(student)/StudentLayout.js
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { clearStorage } from '../../utils/handleAsyncStorage'; // Ensure this path is correct
import { logOut, updateAxios } from '../../utils/useAPI'; // Ensure this path is correct

const StudentLayout = () => {
  const router = useRouter();

  // Logout function
  const handleLogout = async () => {
    try {
      await logOut();
      await clearStorage();
      updateAxios();
      Alert.alert("Logged out successfully");
      router.replace("/"); // Replace with your login screen route
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <Stack>
      <Stack.Screen
        name="group-list"
        options={{
          title: 'Groups',
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout} className="mt-2">
              <Text className="font-plight text-red-600">Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="event-list"
        options={{
          title: 'Events',
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout} className="mt-2">
              <Text className="font-plight text-red-600">Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="event-detail/[eventId]"
        options={{
          title: 'Event Detail',
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout} className="mt-2">
              <Text className="font-plight text-red-600"></Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="event-detail/map-race/[raceId]"
        options={{headerShown: false}}
      />
    </Stack>
  );
};

export default StudentLayout;
