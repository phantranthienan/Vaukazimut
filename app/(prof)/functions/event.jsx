import IconButton from "../../../components/IconButton";
import { icons } from "../../../constants";
import CustomButton from "../../../components/CustomButton";
import { Event, events, groups, maps } from "../data";
import MapProf from "../map-prof";
import { fetchGroups } from "../../../utils/useAPI";

import { router } from "expo-router";
import {
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useState, useEffect } from "react";
import DatePicker from "react-native-modern-datepicker";
import { getToday, getFormatedDate } from "react-native-modern-datepicker";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const CreateNewEvent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [start, setStart] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showStartDate, setShowStartDate] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);

  const [end, setEnd] = useState(new Date());
  const [showEnd, setShowEnd] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const today = getToday();

  const [groups, setGroups] = useState([]);
  const [groupRunner, setGroupRunner] = useState([]);

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

  const formatDateTime = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  const handleCreateRun = () => {
    // Handle the creation of a new run here
    setModalVisible(false);
    setShowStart(false);
    setShowStartDate(false);
    setShowStartTime(false);
    setShowEnd(false);
    setShowEndDate(false);
    setShowEndTime(false);
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
              <Text className="mb-2 text-lg">Name</Text>
              <TextInput
                className="border p-2 rounded mb-4 w-max"
                onChangeText={setName}
                value={name}
              />

              <Text className="mb-2 text-lg">Date and Time</Text>
              <Text className="mb-2 text-base">Start</Text>
              <View className="flex flex-row items-center w-full pl-2 rounded">
                <View className="grid grid-cols-4">
                  <Text className="cols-span-3">{formatDateTime(start)}</Text>
                  <IconButton
                    containerStyles={"cols-span-1"}
                    icon={icons.plus}
                    handlePress={() => {
                      setShowStart(!showStart);
                      setModalVisible(!modalVisible);
                    }}
                  />
                </View>
              </View>
              <Text className="mb-2 text-base">End</Text>
              <View className="flex flex-row items-center w-full pl-2 rounded">
                <View className="grid grid-cols-4">
                  <Text className="cols-span-3">{formatDateTime(end)}</Text>
                  <IconButton
                    containerStyles={"cols-span-1"}
                    icon={icons.plus}
                    handlePress={() => {
                      setShowEnd(!showEnd);
                      setModalVisible(!modalVisible);
                    }}
                  />
                </View>
              </View>
            </View>
            <Text className="mb-2 text-lg">Choose group</Text>
            <View className="z-10">
              <RNPickerSelect
                value={groupRunner}
                onValueChange={(value) => setGroupRunner(value)}
                placeholder={{
                  label: "Exited groups",
                  value: null,
                }}
                items={groups.map((group) => ({
                  label: `${group.name} ${group.department}`,
                  value: group.id,
                }))}
              />
            </View>
            <TouchableOpacity
              onPress={handleCreateRun}
              className="mt-4 bg-blue-500 p-2 rounded"
            >
              <Text className="text-white text-base font-">Create Event</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {showStart && (
        <View class="">
          <CustomButton
            title="Choose Start date"
            handlePress={() => {
              setShowStartDate(!showStartDate);
              setShowStart(!showStart);
            }}
            containerStyles="h-min m-0 bg-black"
            textStyles="text-base font-thin"
          ></CustomButton>
          <CustomButton
            title="Choose Start time"
            handlePress={() => {
              setShowStartTime(!showStartTime);
              setShowStart(!showStart);
            }}
            containerStyles="h-min m-0 bg-black"
            textStyles="text-base font-thin"
          ></CustomButton>
          <CustomButton
            title="Close"
            handlePress={() => {
              setShowStart(!showStart);
              setModalVisible(!modalVisible);
            }}
            containerStyles="h-min m-0 bg-black"
            textStyles="text-base font-thin"
          ></CustomButton>
        </View>
      )}
      {showStartDate && (
        <View className="justify-center items-center my-2 bg-white rounded-xl p-9 items-center shadow-lg w-max">
          <DateTimePicker
            value={start}
            mode={"date"}
            is24Hour={true}
            onChange={onChangeStartDate}
          />
        </View>
      )}
      {showStartTime && (
        <View className="justify-center items-center my-2 bg-white rounded-xl p-9 items-center shadow-lg w-max">
          <DateTimePicker
            value={start}
            mode={"time"}
            is24Hour={true}
            onChange={onChangeStartTime}
          />
        </View>
      )}
      {showEnd && (
        <View className="absolute right-22 bottom-56">
          <CustomButton
            title="Choose end date"
            handlePress={() => {
              setShowEnd(!showEnd);
              setShowEndDate(!showEndDate);
            }}
            containerStyles="h-min m-0 bg-cyan-400"
            textStyles="text-base font-thin"
          ></CustomButton>
          <CustomButton
            title="Choose end time"
            handlePress={() => {
              setShowEnd(!showEnd);
              setShowEndTime(!showEndTime);
            }}
            containerStyles="h-min m-0 bg-cyan-400"
            textStyles="text-base font-thin"
          ></CustomButton>
          <CustomButton
            title="Close"
            handlePress={() => {
              setShowEnd(!showEnd);
              setModalVisible(!modalVisible);
            }}
            containerStyles="h-min m-0 bg-cyan-400"
            textStyles="text-base font-thin"
          ></CustomButton>
        </View>
      )}
      {showEndDate && (
        <View className="absolute justify-center items-center my-2 bg-white rounded-xl p-9 items-center shadow-lg w-max">
          <DateTimePicker
            value={end}
            mode={"date"}
            is24Hour={true}
            onChange={onChangeEndDate}
          />
        </View>
      )}
      {showEndTime && (
        <View className="justify-center items-center my-2 bg-white rounded-xl p-9 items-center shadow-lg w-max">
          <DateTimePicker
            value={end}
            mode={"time"}
            is24Hour={true}
            onChange={onChangeEndTime}
          />
        </View>
      )}

      <View className="absolute right-2 bottom-2 bg-white rounded-full p-2 flex-row justify-between mb-3 border-2 border-black">
        <IconButton
          icon={icons.add}
          handlePress={() => {
            setModalVisible(true);
          }}
        />
      </View>
    </View>
  );
};
const CreateSession = ({ sessionName, sessionDate, map }) => {
  return (
    <View className="flex-col h-fit w-full m-5 px-5 py-2 bg-cyan-100 rounded-xl shadow-lg">
      <Text className="text-xl text-black font-semibold ">{sessionName}</Text>
      <Text className="">{sessionDate}</Text>
    </View>
  );
};

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
                fixMap(item, events[item]["location"]);
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

export default CreateNewEvent;
export { CreateNewEvent, ShowEvents };
