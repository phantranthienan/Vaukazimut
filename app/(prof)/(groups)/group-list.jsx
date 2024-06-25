import {
  View,
  Text,
  Modal,
  TextInput,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import CustomButton from "../../../components/CustomButton";
import { fetchCoachGroups, createGroup } from "../../../utils/useAPI"; // Ensure this path is correct

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDepartment, setNewGroupDepartment] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();

  const onRefresh = async () => {
    setRefreshing(true);
    await getEvents();
    setRefreshing(false);
  };

  const getGroups = async () => {
    try {
      const data = await fetchCoachGroups();
      setGroups(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateGroup = async () => {
    try {
      await createGroup(newGroupName, newGroupDepartment);
      setModalVisible(false);
      setNewGroupName("");
      setNewGroupDepartment("");
      await getGroups(); // Refetch groups after creating a new group
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  const handleGroupPress = (groupId) => {
    router.push(`/group-detail/${groupId}`);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 0 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="h-full items-center bg-primary-emerald">
        {groups.length === 0 ? (
          <View>
            <Text>No groups available...</Text>
          </View>
        ) : (
          groups.map((group) => (
            <View key={group.id}>
              <CustomButton
                title={`${group.name} ${group.department}`}
                handlePress={() => handleGroupPress(group.id)}
                containerStyles="w-[85vw] my-4 bg-primary-jungle h-[10vh]"
                textStyles="text-2xl"
              />
            </View>
          ))
        )}
        <CustomButton
          title="Create New Group"
          handlePress={() => setModalVisible(true)}
          containerStyles="w-[85vw] my-4 bg-primary-jungle"
          textStyles="text-2xl"
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black">
            <View className="w-4/5 h-[40vh] bg-white rounded-xl p-5 items-center justify-center">
              <Text className="text-2xl font-psemibold mb-5">
                Create New Group
              </Text>
              <TextInput
                placeholder="Group Name"
                value={newGroupName}
                onChangeText={setNewGroupName}
                className="h-12 border border-gray-400 mb-5 w-full px-2 rounded-md"
              />
              <TextInput
                placeholder="Department"
                value={newGroupDepartment}
                onChangeText={setNewGroupDepartment}
                className="h-12 border border-gray-400 mb-5 w-full px-2 rounded-md"
              />
              <View className="flex-row">
                <CustomButton
                  title="Create"
                  handlePress={handleCreateGroup}
                  containerStyles="bg-black w-[40%] mx-1"
                />
                <CustomButton
                  title="Cancel"
                  handlePress={() => setModalVisible(false)}
                  containerStyles="bg-red-600 w-[40%] mx-1"
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default GroupList;
