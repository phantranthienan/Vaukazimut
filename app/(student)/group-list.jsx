import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

import CustomButton from "../../components/CustomButton";
import {
  fetchGroups,
  logOut,
  updateAxios,
  joinGroup,
} from "../../utils/useAPI";


const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getGroups();
    setRefreshing(false);
  };

  const getGroups = async () => {
    try {
      const data = await fetchGroups();
      setGroups(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  const handleJoinGroup = async (groupId) => {
    try {
      await joinGroup(groupId);
      router.push("/event-list");
    } catch (error) {
      console.error("Error joining group:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  if (groups.length === 0) {
    return (
      <View className="h-full items-center justify-center">
        <Text>No group available...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="h-[100vh] items-center bg-primary-emerald">
        <Text className="text-white font-pbold text-4xl mt-8 mb-4">GROUP</Text>
        {groups.map((group) => (
          <View key={group.id}>
            <CustomButton
              title={`${group.name} ${group.department}`}
              handlePress={() => handleJoinGroup(group.id)}
              containerStyles="w-[85vw] my-4 h-[10vh] bg-primary-jungle"
              textStyles="text-2xl"
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default GroupList;
