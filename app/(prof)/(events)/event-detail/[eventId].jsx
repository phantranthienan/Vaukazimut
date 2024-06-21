import React, { useEffect, useState } from "react";
import { View, Text, Alert, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchCoachEventDetail, fetchCoachResults } from "../../../../utils/useAPI" // Ensure this path is correct

const EventDetail = () => {
  const { eventId } = useLocalSearchParams(); // Access the eventId from the query params
  const [event, setEvent] = useState(null);
  const [result, setResult] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingResult, setLoadingResult] = useState(false);
  const router = useRouter();

  const onRefresh = async () => {
    setRefreshing(true);
    await getEventDetail();
    setRefreshing(false);
  };

  const getEventDetail = async () => {
    try {
      const data = await fetchCoachEventDetail(eventId);
      setEvent(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch event details. Please try again.");
    }
  };

  const getEventResult = async () => {
    try {
      setLoadingResult(true);
      const resultData = await fetchCoachResults(eventId);
      setResult(resultData);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch event result. Please try again.");
    } finally {
      setLoadingResult(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      getEventDetail();
    }
  }, [eventId]);

  if (!event) {
    return <Text>Loading...</Text>;
  }

  const handleRaceSelect = (race) => {
    router.push(`/event-detail/map-race/${race.id}`);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className="h-full pt-8 bg-primary-emerald"
    >
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
      <View className="w-[90vw] mx-auto my-2 rounded-xl items-center bg-white p-4">
        <Text className="text-primary-jungle font-psemibold text-3xl w-full text-center">
          Races
        </Text>
        {event.races.map((race) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={race.id}
            onPress={() => handleRaceSelect(race)}
            className="m-auto h-16 w-full bg-primary-jungle my-2 flex-row items-center justify-between px-4 rounded-2xl"
          >
            <Text className="text-white text-2xl font-pbold">{race.name}</Text>
            <Text className="text-white font-plight text-lg">
              {race.time_limit}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* <TouchableOpacity
        activeOpacity={0.8}
        onPress={getEventResult}
        className="m-auto h-16 w-[90vw] bg-primary-jungle my-2 flex-row items-center justify-center px-4 rounded-2xl"
      >
        <Text className="text-white text-2xl font-pbold">
          {loadingResult ? "Loading..." : "Show Result"}
        </Text>
      </TouchableOpacity>
      {result && (
        <View className="w-[90vw] mx-auto my-2 rounded-xl items-center bg-white p-4">
          <Text className="text-primary-jungle font-pbold text-3xl w-full text-center">
            My Result
          </Text>
          <Text className="text-black font-pregular text-lg">
            Total Time: {result.total_time}
          </Text>
          <Text className="text-black font-pregular text-lg">
            Total Score: {result.total_score}
          </Text>
        </View>
      )} */}
    </ScrollView>
  );
};

export default EventDetail;
