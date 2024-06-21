import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { fetchCoachEvents } from "../../../utils/useAPI";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

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
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleEventPress = (eventId) => {
    router.push(`(prof)/(events)/event-detail/${eventId}`);
  };

  if (events.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-primary-emerald">
        <Text>No events available...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="bg-primary-emerald"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View className="w-[100vw] bg-primary-emerald">
        {events.map((event) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={event.id}
            onPress={() => handleEventPress(event.id)}
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
