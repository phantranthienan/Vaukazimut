import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchCoachEventDetail, createRace, fetchCoachResults } from "../../../../utils/useAPI"; // Ensure this path is correct

const EventDetail = () => {
  const { eventId } = useLocalSearchParams(); // Access the eventId from the query params
  const [event, setEvent] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [raceName, setRaceName] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [result, setResult] = useState(null);
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

  useEffect(() => {
    if (eventId) {
      getEventDetail();
    }
  }, [eventId]);

  const handleRaceSelect = (race) => {
    router.push(`/event-detail/create-race/${race.id}`);
  };

  const handleCreateRace = async () => {
    try {
      await createRace(eventId, raceName, timeLimit);
      setModalVisible(false);
      setRaceName("");
      setTimeLimit("");
      await getEventDetail(); // Refresh the event details to show the new race
    } catch (error) {
      console.error("Error creating race:", error);
    }
  };

  const handleShowResults = async () => {
    try {
      setLoadingResult(true);
      const resultData = await fetchCoachResults(eventId);
      console.log("Results fetched:", resultData);
      setResult(resultData);
    } catch (error) {
      console.error("Error fetching results:", error);
      Alert.alert("Error", "Failed to fetch results. Please try again.");
    } finally {
      setLoadingResult(false);
    }
  };

  if (!event) {
    return <Text>Loading...</Text>;
  }

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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}
          className="m-auto h-16 w-full bg-primary-jungle my-2 flex-row items-center justify-center px-4 rounded-2xl"
        >
          <Text className="text-white text-2xl font-pbold">Create Race</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleShowResults}
          className="m-auto h-16 w-full bg-primary-jungle my-2 flex-row items-center justify-center px-4 rounded-2xl"
        >
          <Text className="text-white text-2xl font-pbold">
            {loadingResult ? "Loading..." : "Show Results"}
          </Text>
        </TouchableOpacity>
        {result && (
          <View className="w-[90vw] mx-auto my-2 rounded-xl items-center bg-white p-4">
            <Text className="text-primary-jungle font-pbold text-3xl w-full text-center">
              Event Results
            </Text>
            <Text className="text-black font-pregular text-lg">
              Total Time: {result.total_time}
            </Text>
            <Text className="text-black font-pregular text-lg">
              Total Score: {result.total_score}
            </Text>
          </View>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="w-4/5 bg-white rounded-lg p-5 shadow-lg">
            <Text className="text-xl font-semibold mb-4">Create New Race</Text>
            <TextInput
              placeholder="Race Name"
              value={raceName}
              onChangeText={setRaceName}
              className="border p-2 rounded mb-4"
            />
            <TextInput
              placeholder="Time Limit (00:00:00)"
              value={timeLimit}
              onChangeText={setTimeLimit}
              className="border p-2 rounded mb-4"
            />
            <Button title="Create" onPress={handleCreateRace} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default EventDetail;
