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

const CreateNewRunBtn = ({ onRunCreated }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const today = getToday();
  const startDate = getFormatedDate(today, 'DD/MM/YYYY');

  const handleCreateRun = () => {
    // Handle the creation of a new run here
    setModalVisible(false);
    setShowDatePicker(false);
    onRunCreated({ name, selectedDate });
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
              Create a new map run!
            </Text>
            <View className="w-full">
              <Text className="mb-2 text-base">Name</Text>
              <TextInput
                className="border p-2 rounded mb-4 w-max"
                onChangeText={setName}
                value={name}
              />
              <Text className="mb-2 text-base">Date</Text>
              <View className="flex-row items-center w-full pl-2 rounded border border-inherit">
                <Text className="flex-1">{selectedDate}</Text>
                <IconButton
                  icon={icons.plus}
                  handlePress={() => {
                    setShowDatePicker(true);
                    setModalVisible(false);
                  }}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={handleCreateRun}
              className="mt-4 bg-blue-500 p-2 rounded"
            >
              <Text className="text-white text-base font-">Create Run</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showDatePicker}
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View className="justify-center items-center my-2 h-full bg-white rounded-xl p-9 items-center shadow-lg w-max">
          <Text className="text-xl text-black font-semibold text-center mb-4">
            Choose Date
          </Text>
          <DatePicker
            mode="calendar"
            minimumDate={startDate}
            selected={selectedDate}
            onDateChange={(selectedDate) => {
              setSelectedDate(selectedDate);
              setShowDatePicker(false);
              setModalVisible(true);
            }}
          />
          <CustomButton
            title="Close"
            handlePress={() => {
              setShowDatePicker(!showDatePicker);
              setModalVisible(!modalVisible);
            }}
            containerStyles="h-min m-0 bg-cyan-400"
            textStyles="text-base font-thin"
          ></CustomButton>
        </View>
      </Modal>

      <View className="absolute right-2 bottom-2 bg-white rounded-full p-2 flex-row justify-between mb-3 border-2 border-black">
        <IconButton
          icon={icons.add}
          handlePress={() => setModalVisible(true)}
        />
      </View>
    </View>
  );
};
let counter = 0;
const CreateSession = ({ sessionName, sessionDate, map }) => {
  return (
    <View className="flex-col h-fit w-full m-5 px-5 py-2 bg-cyan-100 rounded-xl shadow-lg">
      <Text className="text-xl text-black font-semibold ">{sessionName}</Text>
      <Text className="">{sessionDate}</Text>
    </View>
  );
};

const CreateNewEvent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [groupRunner, setGroupRunner] = useState(groups[0]);
  const [showMap, setShowMap] = useState(false);

  const navigation = useNavigation();

  function handleReload() {
    navigation.replace('tab-bar');
  }

  const handleCreateRun = () => {
    // Handle the creation of a new run here
    setModalVisible(false);
    Event({
      name: name,
      group_runner: groupRunner,
      publish: false,
      is_finish: false,
      description: null,
      location: maps[name]
    });
    console.log(events);
    handleReload();
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
              Create a new map run!
            </Text>
            <View className="w-full">
              <Text className="mb-2 text-base">Name</Text>
              <TextInput
                className="border p-2 rounded mb-4 w-max"
                onChangeText={setName}
                value={name}
              />
              <Text className="mb-2 text-base">Select Group Runner</Text>
              {/* <View className="flex-row items-center w-full pl-2 rounded border border-inherit"> */}
              <View>
                <RNPickerSelect
                  // className="flex-row items-center w-full pl-2 rounded border border-inherit"
                  value={groupRunner}
                  onValueChange={(value) => setGroupRunner(value)}
                  placeholder={{
                    label: 'Exited groups',
                    value: null
                  }}
                  items={groups.map((group) => ({
                    label: group,
                    value: group
                  }))}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setShowMap(!showMap);
              }}
              className="mt-4 bg-black p-2 rounded w-full"
            >
              <Text className="text-white text-base">Create balises</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={showMap}
              onRequestClose={() => setShowMap(false)}
            >
              <View className="justify-center items-center my-2 h-full bg-white rounded-xl p-9 items-center shadow-lg w-max">
                <MapProf name={name} />
                <CustomButton
                  title="Close"
                  handlePress={() => {
                    setShowMap(!showMap);
                  }}
                  containerStyles="absolute h-min m-0 bg-black bottom-20"
                  textStyles="text-base font-thin"
                ></CustomButton>
              </View>
            </Modal>

            <TouchableOpacity
              onPress={handleCreateRun}
              className="mt-4 bg-black p-2 rounded w-full"
            >
              <Text className="text-white text-base font-">Create Run</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              className="mt-4 bg-black p-2 rounded w-full"
            >
              <Text className="text-white text-base font-">Close</Text>
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

function fixMap(name, addedMarkers) {
  let showMap = true;
  return (
    <View className="flex-1 justify-center items-center w-full h-full">
      <Modal
        animationType="slide"
        transparent={true}
        visible={showMap}
        onRequestClose={() => {}}
      >
        <View className="justify-center items-center my-2 h-full bg-white rounded-xl p-9 items-center shadow-lg w-max">
          <MapProf name={name} addedMarkers={addedMarkers} />
          <CustomButton
            title="Close"
            handlePress={() => {
              showMap = !showMap;
              console.log(name);
            }}
            containerStyles="h-min m-0 bg-cyan-400"
            textStyles="text-base font-thin"
          ></CustomButton>
        </View>
      </Modal>
    </View>
  );
}
const ShowEvents = () => {
  return (
    <FlatList
      data={Object.keys(events)}
      keyExtractor={(eventName) => eventName}
      renderItem={({ item }) => (
        <TouchableOpacity className="flex flex-row h-fit mx-5 mb-5 p-5 bg-black rounded-xl shadow-lg">
          <View className="basis-3/4">
            <Text className="text-xl text-white font-semibold py">{item}</Text>
          </View>
          <View className="basis-1/4 flex flex-row">
            <IconButton
              containerStyles="aspect-square m-1"
              icon={icons.bookmark}
              handlePress={() => {
                fixMap(item, events[item]['location']);
              }}
            ></IconButton>
            <IconButton
              containerStyles="aspect-square m-1"
              icon={icons.bin}
              handlePress={() => {}}
            ></IconButton>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default CreateNewRunBtn;
export { CreateNewRunBtn, CreateSession, CreateNewEvent, ShowEvents };
