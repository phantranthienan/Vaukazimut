import IconButton from '../../../components/IconButton';
import { icons } from '../../../constants';
import CustomButton from '../../../components/CustomButton';
import { Event, events, groups, maps } from '../data';
import { createGroup, fetchGroups } from '../../../utils/useAPI';

import { router } from 'expo-router';
import {
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useState, useEffect } from 'react';

const GroupList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const data = await fetchGroups();
        setGroups(data.results);
        console.log("In group" + groups);
      } catch (error) {
        console.error(error);
      }
    };

    getGroups();
  }, []);

  if (groups.length === 0) {
    return (
      <View className="h-full items-center justify-center">
        <Text>No group created...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="h-full items-center">
        <Text className="font-pbold text-3xl mt-5">All Groups</Text>
        {groups.map((group) => (
          <View key={group.id}>
            <CustomButton
              title={`${group.name} ${group.department}`}
              handlePress={() => {}}
              containerStyles="w-[85vw] my-4"
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default GroupList;
