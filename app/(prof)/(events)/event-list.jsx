import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

import { icons } from '../../../constants';
import CustomButton from '../../../components/CustomButton';
import IconButton from '../../../components/IconButton';

import {
  fetchCoachGroups,
  fetchLocations,
  fetchCoachEvents,
  createGroup,
  createEvent
} from '../../../utils/useAPI'; // Ensure this path is correct

const EventList = () => {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [start, setStart] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showStartDate, setShowStartDate] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);

  const [end, setEnd] = useState(new Date());
  const [showEnd, setShowEnd] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);

  const [groups, setGroups] = useState([]);
  const [groupEvent, setGroupEvent] = useState();
  const [locations, setLocations] = useState([]);
  const [locationEvent, setLocationEvent] = useState();

  const getEvents = async () => {
    try {
      const data = await fetchCoachEvents();
      setEvents(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getGroups = async () => {
    try {
      const data = await fetchCoachGroups();
      setGroups(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const getLocations = async () => {
    try {
      const data = await fetchLocations();
      setLocations(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    getLocations();
  }, []);

  useEffect(() => {
    getEvents();
  }, []);

  const handleEventPress = (eventId) => {
    router.push(`(prof)/(events)/event-detail/${eventId}`);
  };

  // if (events.length === 0) {
  //   return (
  //     <View className="flex-1 justify-center items-center bg-primary-emerald">
  //       <Text>No events available...</Text>
  //     </View>
  //   );
  // }

  const handleCreateEvent = async () => {
    try {
      // Handle the creation of a new run here
      setModalVisible(false);
      setShowStart(false);
      setShowStartDate(false);
      setShowStartTime(false);
      setShowEnd(false);
      setShowEndDate(false);
      setShowEndTime(false);

      await createEvent(
        name,
        formatDateTime(start),
        formatDateTime(end),
        locationEvent,
        groupEvent,
        true
      );
      await getEvents();
    } catch (e) {
      console.log('Create an event failed: ', e);
    }
  };

  const handleFormEvent = async () => {
    try {
      setModalVisible(true);
      await getGroups();
      await getLocations();
    } catch (e) {
      console.log(e);
    }
  };

  const formatDateTime = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:00`;
  };

  const onChangeStartDate = (e, selectedDate) => {
    setStart(selectedDate);
    setShowStart(!showStart);
    setShowStartDate(!showStartDate);
  };
  const onChangeStartTime = (e, selectedDate) => {
    setStart(selectedDate);
    setShowStart(!showStart);
    setShowStartTime(!showStartTime);
  };

  const onChangeEndDate = (e, selectedDate) => {
    setEnd(selectedDate);
    setShowEnd(!showEnd);
    setShowEndDate(!showEndDate);
  };

  const onChangeEndTime = (e, selectedDate) => {
    setEnd(selectedDate);
    setShowEnd(!showEnd);
    setShowEndTime(!showEndTime);
  };

  return (
    <ScrollView className="bg-primary-emerald">
      <View className="h-[100vh] w-[100vw] bg-primary-emerald items-center">
        {events.length === 0 ? (
          <View>
            <Text>No events available...</Text>
          </View>
        ) : (
          events.map((event) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={event.id}
              onPress={() => handleEventPress(event.id)}
              className="m-auto min-h-[10vh] w-[95vw] bg-primary-jungle my-2 flex-row items-center justify-between px-4 rounded-2xl"
            >
              <Text className="text-white text-3xl font-pbold">
                {event.name}
              </Text>
              <View className="flex-column items-end">
                <Text className="text-white font-plight text-lg">
                  {event.location.name}
                </Text>
                <Text className="text-white font-plight text-lg">
                  {event.start}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
        <CustomButton
          title="Create New Event"
          handlePress={handleFormEvent}
          containerStyles="w-[85vw] my-4"
          textStyles="text-2xl"
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <ScrollView className="">
            <View className="flex-1 justify-center items-center bg-black h-[100vh]">
              <View className="w-4/5 bg-white rounded-xl p-5 items-center justify-center">
                <Text className="text-2xl font-psemibold mb-5">
                  Create New Event!
                </Text>
                <View className="w-full">
                  <Text className="mb-2 font-psemibold text-xl">Name</Text>
                  <TextInput
                    placeholder="Event Name"
                    className="h-12 border border-gray-400 mb-5 w-full px-2 rounded-md"
                    onChangeText={setName}
                    value={name}
                  />
                  <Text className="mb-2 font-psemibold text-xl">
                    Date and Time
                  </Text>
                  <View className="border border-gray-400 mb-5 w-full px-2 rounded-md">
                    <Text className="font-psemibold text-base">Start</Text>
                    <View className="flex flex-row items-center w-full pl-2 rounded">
                      <Text className="flex-1">{formatDateTime(start)}</Text>
                      <IconButton
                        containerStyles={'flex-shrink-0'}
                        icon={icons.plus}
                        handlePress={() => {
                          setShowStart(!showStart);
                          setModalVisible(!modalVisible);
                        }}
                      />
                    </View>
                    <Text className="font-psemibold text-base">End</Text>
                    <View className="flex flex-row items-center w-full pl-2 rounded">
                      <Text className="flex-1">{formatDateTime(end)}</Text>
                      <IconButton
                        containerStyles={'flex-shrink-0'}
                        icon={icons.plus}
                        handlePress={() => {
                          setShowEnd(!showEnd);
                          setModalVisible(!modalVisible);
                        }}
                      />
                    </View>
                  </View>
                  <View className="">
                    <Text className="mb-2 font-psemibold text-xl">
                      Choose group
                    </Text>
                    <View className="border border-gray-400 mb-5 w-full px-2 rounded-md">
                      <RNPickerSelect
                        value={groupEvent}
                        onValueChange={(value) => setGroupEvent(value)}
                        placeholder={{
                          label: 'Group',
                          value: null
                        }}
                        items={groups.map((group) => ({
                          label: `${group.name} ${group.department}`,
                          value: group.id
                        }))}
                      />
                    </View>
                  </View>
                  <Text className="mb-2 font-psemibold text-xl">
                    Choose Location
                  </Text>
                  <View className="border border-gray-400 mb-5 w-full px-2 rounded-md">
                    <RNPickerSelect
                      value={locationEvent}
                      onValueChange={(value) => setLocationEvent(value)}
                      placeholder={{
                        label: 'Locations exited ...',
                        value: null
                      }}
                      items={locations.map((location) => ({
                        label: `${location.name}`,
                        value: location.id
                      }))}
                    />
                  </View>
                  <View className="flex-row items-center mx-auto">
                    <CustomButton
                      title="Create"
                      handlePress={handleCreateEvent}
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
            </View>
          </ScrollView>
        </Modal>
        {showStart && (
          <Modal animationType="slide" transparent={true} visible={true}>
            <View className="flex-1 justify-center items-center bg-black">
              <View className="w-4/5 h-[40vh] bg-white rounded-xl p-5 items-center justify-center">
                <CustomButton
                  title="Choose Start date"
                  handlePress={() => {
                    setShowStartDate(!showStartDate);
                    setShowStart(!showStart);
                  }}
                  containerStyles="h-min m-0 bg-black py-5 w-4/5"
                  textStyles="text-base font-thin"
                ></CustomButton>
                <CustomButton
                  title="Choose Start time"
                  handlePress={() => {
                    setShowStartTime(!showStartTime);
                    setShowStart(!showStart);
                  }}
                  containerStyles="h-min m-0 bg-black w-4/5"
                  textStyles="text-base font-thin"
                ></CustomButton>
                <CustomButton
                  title="Close"
                  handlePress={() => {
                    setShowStart(!showStart);
                    setModalVisible(!modalVisible);
                  }}
                  containerStyles="h-min m-0 bg-red-600"
                  textStyles="text-base font-thin"
                ></CustomButton>
              </View>
            </View>
          </Modal>
        )}
        {showStartDate && (
          <View className="justify-center items-center my-2 bg-white rounded-xl p-9 items-center shadow-lg w-max">
            <DateTimePicker
              value={start}
              mode={'date'}
              is24Hour={true}
              onChange={onChangeStartDate}
            />
          </View>
        )}
        {showStartTime && (
          <View className="justify-center items-center my-2 bg-white rounded-xl p-9 items-center shadow-lg w-max">
            <DateTimePicker
              value={start}
              mode={'time'}
              is24Hour={true}
              onChange={onChangeStartTime}
            />
          </View>
        )}
        {showEnd && (
          <Modal animationType="slide" transparent={true} visible={true}>
            <View className="flex-1 justify-center items-center bg-black">
              <View className="w-4/5 h-[40vh] bg-white rounded-xl p-5 items-center justify-center">
                <CustomButton
                  title="Choose end date"
                  handlePress={() => {
                    setShowEnd(!showEnd);
                    setShowEndDate(!showEndDate);
                  }}
                  containerStyles="h-min m-0 bg-black"
                  textStyles="text-base font-thin"
                ></CustomButton>
                <CustomButton
                  title="Choose end time"
                  handlePress={() => {
                    setShowEnd(!showEnd);
                    setShowEndTime(!showEndTime);
                  }}
                  containerStyles="h-min m-0 bg-black"
                  textStyles="text-base font-thin"
                ></CustomButton>
                <CustomButton
                  title="Close"
                  handlePress={() => {
                    setShowEnd(!showEnd);
                    setModalVisible(!modalVisible);
                  }}
                  containerStyles="h-min m-0 bg-red-600"
                  textStyles="text-base font-thin"
                ></CustomButton>
              </View>
            </View>
          </Modal>
        )}
        {showEndDate && (
          <View className="absolute justify-center items-center my-2 bg-white rounded-xl p-9 items-center shadow-lg w-max">
            <DateTimePicker
              value={end}
              mode={'date'}
              is24Hour={true}
              onChange={onChangeEndDate}
            />
          </View>
        )}
        {showEndTime && (
          <View className="justify-center items-center my-2 bg-white rounded-xl p-9 items-center shadow-lg w-max">
            <DateTimePicker
              value={end}
              mode={'time'}
              is24Hour={true}
              onChange={onChangeEndTime}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default EventList;
