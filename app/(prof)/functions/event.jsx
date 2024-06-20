import IconButton from "../../../components/IconButton";
import { icons } from "../../../constants";
import CustomButton from "../../../components/CustomButton";
import { Event, events, groups, maps } from "../data";
import MapProf from "../map-prof";

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
import { useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import { getToday, getFormatedDate } from "react-native-modern-datepicker";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateNewEvent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [dateStart, setDateStart] = useState(getToday());
  const [showDateStartPicker, setShowDateStartPicker] = useState(false);
  const [timeStart, setTimeStart] = useState();
  const [showTimeStartPicker, setShowTimeStartPicker] = useState(false);

  const [dateEnd, setDateEnd] = useState(getToday());
  const [showDateEndPicker, setShowDateEndPicker] = useState(false);
  const [timeEnd, setTimeEnd] = useState();
  const [showTimeEndPicker, setShowTimeEndPicker] = useState(false);

  const today = getToday();
  const startDate = getFormatedDate(today, "YYYY/MM/DD");

  const handleCreateRun = () => {
    // Handle the creation of a new run here
    setModalVisible(false);
    setShowDateStartPicker(false);
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
              <Text className="mb-2 text-lg">Date and Time</Text>
              <Text className="mb-2 text-base">Start</Text>
              <View className="flex flex-row items-center w-full pl-2 rounded">
                <View className="grid grid-cols-4">
                  <Text className="cols-span-3">{dateStart}</Text>
                  <IconButton
                    containerStyles={"cols-span-1"}
                    icon={icons.plus}
                    handlePress={() => {
                      setShowDateStartPicker(!showDateStartPicker);
                      setModalVisible(!modalVisible);
                    }}
                  />
                </View>
                <View className="grid grid-cols-4">
                  <Text className="cols-span-3">{timeStart}</Text>
                  <IconButton
                    containerStyles={"cols-span-1"}
                    icon={icons.plus}
                    handlePress={() => {
                      setShowTimeStartPicker(!showTimeStartPicker);
                      setModalVisible(!modalVisible);
                    }}
                  />
                </View>
              </View>
              <Text className="mb-2 text-base">End</Text>
              <View className="flex flex-row items-center w-full pl-2 rounded">
                <View className="grid grid-cols-4">
                  <Text className="cols-span-3">{dateEnd}</Text>
                  <IconButton
                    containerStyles={"cols-span-1"}
                    icon={icons.plus}
                    handlePress={() => {
                      setShowDateEndPicker(!showDateEndPicker);
                      setModalVisible(!modalVisible);
                    }}
                  />
                </View>
                <View className="grid grid-cols-4">
                  <Text className="cols-span-3">{timeEnd}</Text>
                  <IconButton
                    containerStyles={"cols-span-1"}
                    icon={icons.plus}
                    handlePress={() => {
                      setShowTimeEndPicker(!showTimeEndPicker);
                      setModalVisible(!modalVisible);
                    }}
                  />
                </View>
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
        visible={showDateStartPicker}
        onRequestClose={() => setShowDateStartPicker(false)}
      >
        <View className="justify-center items-center my-2 h-full bg-white rounded-xl p-9 items-center shadow-lg w-max">
          <Text className="text-xl text-black font-semibold text-center mb-4">
            Choose start date
          </Text>
          <DatePicker
            mode="calendar"
            minimumDate={startDate}
            selected={dateStart}
            onDateChange={(dateStart) => {
              setDateStart(dateStart);
              setShowDateStartPicker(false);
              setModalVisible(true);
            }}
          />
          <CustomButton
            title="Close"
            handlePress={() => {
              setShowDateStartPicker(!showDateStartPicker);
              setModalVisible(!modalVisible);
            }}
            containerStyles="h-min m-0 bg-cyan-400"
            textStyles="text-base font-thin"
          ></CustomButton>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showDateStartPicker}
        onRequestClose={() => setShowDateStartPicker(false)}
      >
        <View className="justify-center items-center my-2 h-full bg-white rounded-xl p-9 items-center shadow-lg w-max">
          <Text className="text-xl text-black font-semibold text-center mb-4">
            Choose start time
          </Text>
          <DateTimePicker
            mode="time"
            value={timeStart}
            is24Hour={true}
            onDateChange={(dateStart) => {
              setDateStart(dateStart);
              setShowDateStartPicker(false);
              setModalVisible(true);
            }}
          />
          <CustomButton
            title="Close"
            handlePress={() => {
              setShowDateStartPicker(!showDateStartPicker);
              setModalVisible(!modalVisible);
            }}
            containerStyles="h-min m-0 bg-cyan-400"
            textStyles="text-base font-thin"
          ></CustomButton>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showDateEndPicker}
        onRequestClose={() => setShowDateEndPicker(false)}
      >
        <View className="justify-center items-center my-2 h-full bg-white rounded-xl p-9 items-center shadow-lg w-max">
          <Text className="text-xl text-black font-semibold text-center mb-4">
            Choose end date
          </Text>
          <DatePicker
            mode="calendar"
            minimumDate={EndDate}
            selected={dateEnd}
            onDateChange={(dateEnd) => {
              setDateEnd(dateEnd);
              setShowDateEndPicker(false);
              setModalVisible(true);
            }}
          />
          <CustomButton
            title="Close"
            handlePress={() => {
              setShowDateEndPicker(!showDateEndPicker);
              setModalVisible(!modalVisible);
            }}
            containerStyles="h-min m-0 bg-cyan-400"
            textStyles="text-base font-thin"
          ></CustomButton>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showDateEndPicker}
        onRequestClose={() => setShowDateEndPicker(false)}
      >
        <View className="justify-center items-center my-2 h-full bg-white rounded-xl p-9 items-center shadow-lg w-max">
          <Text className="text-xl text-black font-semibold text-center mb-4">
            Choose end time
          </Text>
          <DateTimePicker
            mode="time"
            value={timeEnd}
            is24Hour={true}
            onDateChange={(dateEnd) => {
              setDateEnd(dateEnd);
              setShowDateEndPicker(false);
              setModalVisible(true);
            }}
          />
          <CustomButton
            title="Close"
            handlePress={() => {
              setShowDateEndPicker(!showDateEndPicker);
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

const CreateNewRunBtn = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [groupRunner, setGroupRunner] = useState(groups[0]);
  const [showMap, setShowMap] = useState(false);

  const navigation = useNavigation();

  function handleReload() {
    navigation.replace("tab-bar");
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
      location: maps[name],
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
              Create a new Event!
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
                    label: "Exited groups",
                    value: null,
                  }}
                  items={groups.map((group) => ({
                    label: group,
                    value: group,
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
              <Text className="text-white text-base">Create start point</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={showMap}
              onRequestClose={() => setShowMap(false)}
            >
              <View className="justify-center items-center my-2 h-full bg-white rounded-xl p-9 items-center shadow-lg w-max">
                <MapProf name={name} createStartPoint={true} />
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

export default CreateNewRunBtn;
export { CreateNewRunBtn, CreateSession, CreateNewEvent, ShowEvents };
