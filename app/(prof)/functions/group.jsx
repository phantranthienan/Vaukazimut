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
  Alert
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useState, useEffect } from 'react';

const CreateNewGroup = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [department, setDepartment] = useState('');

  const handleCreateGroup = async () => {
    setModalVisible(false);
    try {
      if (groupName.length > 0 && department.length > 0) {
        await createGroup(groupName, department);
      } else Alert.alert('Error', 'Please choose group name and department');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center w-full h-full">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center">
          <View className="m-5 bg-white rounded-xl p-9 items-center shadow-lg">
            <Text className="text-xl text-black font-semibold text-center mb-4">
              Create a new Group!
            </Text>
            <View className="w-full">
              <Text className="mb-2 text-base">Group name</Text>
              <View>
                <RNPickerSelect
                  // className="flex-row items-center w-full pl-2 rounded border border-inherit"
                  value={groupName}
                  onValueChange={(value) => setGroupName(value)}
                  placeholder={{
                    label: 'Choose group',
                    value: null
                  }}
                  items={[
                    { label: 'TD1', value: 'TD1' },
                    { label: 'TD2', value: 'TD2' }
                  ]}
                />
              </View>
              <Text className="mb-2 text-base">Select department</Text>
              {/* <View className="flex-row items-center w-full pl-2 rounded border border-inherit"> */}
              <View>
                <RNPickerSelect
                  // className="flex-row items-center w-full pl-2 rounded border border-inherit"
                  value={department}
                  onValueChange={(value) => setDepartment(value)}
                  placeholder={{
                    label: 'Choose Department',
                    value: null
                  }}
                  items={[
                    { label: 'STI', value: 'STI' },
                    { label: 'MRI', value: 'MRI' }
                  ]}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={handleCreateGroup}
              className="mt-4 bg-blue-500 p-2 rounded"
            >
              <Text className="text-white text-base font-">Valid</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View className="absolute right-2 bottom-0 bg-white rounded-full p-2 flex-row justify-between mb-3 border-2 border-black">
        <IconButton
          icon={icons.add}
          handlePress={() => setModalVisible(true)}
        />
      </View>
    </View>
  );
};

export { CreateNewGroup };
