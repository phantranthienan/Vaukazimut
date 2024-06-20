import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  RefreshControl,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router'; // Ensure useRouter is imported correctly

import { clearStorage } from '../../utils/handleAsyncStorage';
import CustomButton from '../../components/CustomButton';
import { fetchMyEvents, logOut, updateAxios } from '../../utils/useAPI'; // Ensure this path is correct

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter(); // Initialize the router

  const onRefresh = async () => {
    setRefreshing(true);
    await getEvents();
    setRefreshing(false);
  };

  const getEvents = async () => {
    try {
      const data = await fetchMyEvents();
      setEvents(data.results);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch events. Please try again.');
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleEventPress = (eventId) => {
    // Navigate to the event-detail page with the eventId as a parameter
    router.push(`/event-detail/${eventId}`);
  };

  if (events.length === 0) {
    return (
      <View className="h-full items-center justify-center">
        <Text>No event available...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="h-[100vh] w-[100vw]] bg-primary-emerald">
        {events.map((event) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={event.id}
            onPress={() => {
              handleEventPress(event.id);
            }}
            className="m-auto min-h-[10vh] w-[95vw] bg-primary-jungle my-2 flex-row items-center justify-between px-4 rounded-2xl"
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
      </View>
    </ScrollView>
  );
};

export default EventList;
