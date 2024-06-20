import IconButton from '../../../components/IconButton';
import { icons } from '../../../constants';
import CustomButton from '../../../components/CustomButton';
import { Event, events, groups, maps } from '../data';
import MapProf from '../map-prof';
import { fetchCoachEvents } from '../../../utils/useAPI';

import { router, useRouter } from 'expo-router';
import {
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useState, useEffect } from 'react';
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
      const data = await fetchCoachEvents();
      setEvents(data.results);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch events. Please try again.');
    }
  };

  useEffect(() => {
    getEvents();
  }, [fetchCoachEvents, setEvents]);

  const handleEventPress = (eventId) => {
    // Navigate to the event-detail page with the eventId as a parameter
    router.push(`(prof)/detail/event-detail/${eventId}`);
  };

  if (events.length === 0) {
    return (
      <View className="h-full items-center justify-center">
        <Text>No event created yet...</Text>
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
              console.log(event.id);
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
