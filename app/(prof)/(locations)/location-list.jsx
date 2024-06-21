import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { fetchLocations } from "../../../utils/useAPI"; // Ensure this path is correct

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const router = useRouter();

  const getLocations = async () => {
    try {
      const data = await fetchLocations();
      setLocations(data.results);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch locations.");
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  const handleAddLocation = () => {
    router.push("/create-location"); // Ensure the route to ProfMap is correct
  };

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 0 }}>
      <View className="flex-1 items-center bg-green-500">
        {locations.length === 0 ? (
          <View className="mt-5">
            <Text>No locations available...</Text>
          </View>
        ) : (
          locations.map((location) => (
            <View
              key={location.id}
              className="w-11/12 my-2 p-5 bg-green-800 rounded-2xl"
            >
              <Text className="text-white text-3xl font-bold">
                {location.name}
              </Text>
              <Text className="text-white text-lg">{location.address}</Text>
            </View>
          ))
        )}
        <TouchableOpacity
          onPress={handleAddLocation}
          className="w-11/12 my-4 h-12 bg-green-700 items-center justify-center rounded-2xl"
        >
          <Text className="text-2xl text-white">Add New Location</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LocationList;