import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';

import CustomButton from '../../components/CustomButton';
import {
  fetchGroups,
  logOut,
  updateAxios,
  joinGroup
} from '../../utils/useAPI';
import { clearStorage } from '../../utils/handleAsyncStorage';

const GroupList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const data = await fetchGroups();
        setGroups(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    getGroups();
  }, []);

  const handleJoinGroup = async (groupId) => {
    try {
      await joinGroup(groupId);
      router.push('/event-list');
    } catch (error) {
      console.error('Error joining group:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
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

  if (groups.length === 0) {
    return (
      <View className="h-full items-center justify-center">
        <Text>No group available...</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="h-full items-center justify-center">
      <Text className="font-pbold text-3xl my-8">CHOOSE YOUR GROUP</Text>
      {groups.map((group) => (
        <View key={group.id}>
          <CustomButton
            title={`${group.name} ${group.department}`}
            handlePress={() => handleJoinGroup(group.id)}
            containerStyles="w-[85vw] my-4"
          />
        </View>
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

export default GroupList;
