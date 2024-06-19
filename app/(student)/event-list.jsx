import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Ensure useRouter is imported correctly

import { clearStorage } from '../../utils/handleAsyncStorage';
import CustomButton from '../../components/CustomButton';
import { fetchMyEvents, logOut, updateAxios } from '../../utils/useAPI'; // Ensure this path is correct

const EventList = () => {
  const [events, setEvents] = useState([]);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchMyEvents();
        setEvents(data.results);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch events. Please try again.');
      }
    };

    getEvents();
  }, []);

  const handleEventPress = (eventId) => {
    // Navigate to the event-detail page with the eventId as a parameter
    router.push(`/event-detail/${eventId}`);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      await clearStorage();
      updateAxios();
      router.replace('/');
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View>
      {events.map((event) => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={event.id}
          onPress={() => {
            handleEventPress(event.id);
          }}
          className="m-auto min-h-[10vh] w-[95vw] bg-black my-2 flex-row items-center justify-between px-4 rounded-2xl"
        >
          <Text className="text-white text-3xl font-pbold">{event.name}</Text>
          <View className="flex-column items-end">
            <Text className="text-white font-plight text-lg">
              {event.location.name}
            </Text>
            <Text className="text-white font-plight text-lg">
              {event.start}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      <CustomButton
        title="Log out"
        handlePress={() => {
          handleLogout();
        }}
      />
    </View>
  );
};

export default EventList;
