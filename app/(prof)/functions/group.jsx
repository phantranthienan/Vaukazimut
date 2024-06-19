import IconButton from '../../../components/IconButton';
import { icons } from '../../../constants';
import CustomButton from '../../../components/CustomButton';
import { Event, events, groups, maps } from '../data';
import MapProf from '../map-prof';

import { router } from 'expo-router';
import {
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
  FlatList
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { useNavigation } from '@react-navigation/native';

const CreateNewGroup = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [department, setDepartment] = useState('');

  const navigation = useNavigation();

  function handleReload() {
    navigation.replace('tab-bar');
  }

  const handleCreateGroup = () => {
    // Handle the creation of a new run here
    setModalVisible(false);
    const group = groupName + ' ' + department;
    if (!groups.includes(group)) {
      if (groupName && department) {
        groups.push(groupName + ' ' + department);
      }
    } else {
      alert('Group is already exit');
    }
    // console.log(events);
    // handleReload();
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
                    { label: 'MRI', value: 'TD2' }
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
