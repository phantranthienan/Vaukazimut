import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchEventDetail } from '../../../utils/useAPI'; // Ensure this path is correct

const EventDetail = () => {
  const { eventId } = useLocalSearchParams(); // Access the eventId from the query params
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const getEventDetail = async () => {
      try {
        const data = await fetchEventDetail(eventId);
        setEvent(data);
      } catch (error) {
        console.error(error);
        Alert.alert(
          'Error',
          'Failed to fetch event details. Please try again.'
        );
      }
    };

    if (eventId) {
      getEventDetail();
    }
  }, [eventId]);

  if (!event) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView className="mt-8 h-full">
      <Text className="w-full text-center text-4xl font-pbold">
        {event.name}
      </Text>
      <View className="p-4 w-[90vw] bg-black m-auto my-2 rounded-xl">
        <Text className="text-white font-pregular text-lg">
          Location: {event.location.name}
        </Text>
        <Text className="text-white font-pregular text-lg">
          Date and Time: {event.start}
        </Text>
        <Text className="text-white font-pregular text-lg">
          Group: {event.group_runner.name} {event.group_runner.department}
        </Text>
      </View>
      <View className="p-4 w-[90vw] m-auto my-2 rounded-xl">
        <Text className="text-black font-pmedium text-2xl w-full text-center">
          {event.subtitle}
        </Text>
        <Text className="text-black font-pregular text-lg text-justify">
          {event.description}
        </Text>
      </View>
      <View className="w-[90vw] mx-auto my-2 rounded-xl items-center">
        <Text className="text-black font-pmedium text-2xl w-full text-center">
          Races
        </Text>
        {event.races.map((race) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={race.id}
            onPress={() => {}}
            className="m-auto h-16 w-full bg-black my-2 flex-row items-center justify-between px-4 rounded-2xl"
          >
            <Text className="text-white text-2xl font-pbold">{race.name}</Text>
            <Text className="text-white font-plight text-lg">
              {' '}
              {race.time_limit}{' '}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default EventDetail;
