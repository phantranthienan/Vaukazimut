import { View, Text, Image, StyleSheet, Modal, TextInput, Button } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import {
  INSA_CVL,
  STADE_JUSTICE,
  LAC_DAURON,
  CREPS,
  MAP_STYLE,
} from "../../../constants/map";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { createLocation } from "../../../utils/useAPI";

import IconButton from "../../../components/IconButton";
import { icons } from "../../../constants";

const CreateLocationMap = () => {
  const [region, setRegion] = useState(INSA_CVL);
  const [marker, setMarker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [locationName, setLocationName] = useState('');
  const router = useRouter();

  const handleMapPress = (e) => {
    setMarker(e.nativeEvent.coordinate);
  };

  const handleClearMarker = () => {
    setMarker(null);
  };

  const handleCheck = () => {
    if (marker) {
      setModalVisible(true);
    } else {
      Alert.alert("Error", "Please select a location on the map.");
    }
  };

  const handleCreateLocation = async () => {
    try {
      await createLocation(locationName, marker.longitude, marker.latitude);
      setModalVisible(false);
      router.push('/location-list'); // Redirect to location list
    } catch (error) {
      console.error('Error creating location:', error);
      Alert.alert("Error", "Failed to create location.");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <MapView
          paddingAdjustmentBehavior="never"
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={MAP_STYLE}
          initialRegion={region}
          region={region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
          onPress={handleMapPress}
        >
          {marker && (
            <Marker coordinate={marker}>
              <View className="items-center justify-center pl-5">
                <Text className="text-black font-psemibold text-xl">Start</Text>
                <Image source={icons.balise} className="w-8 h-8" />
              </View>
              <Circle
                center={marker}
                radius={5} // radius in meters
                strokeColor="rgba(0,0,255,0.5)"
                fillColor="rgba(0,0,255,0.1)"
              />
            </Marker>
          )}
        </MapView>

        <View className="absolute top-20 bg-white border-2 p-2 rounded-lg">
          <Text className="text-black font-plight">
            {region.latitude.toFixed(6)}, {region.longitude.toFixed(6)}
          </Text>
        </View>

        <View className="bg-black w-[70vw] rounded-full p-2 flex-row justify-between mb-3">
          <IconButton icon={icons.clean} handlePress={handleClearMarker} />
          <IconButton icon={icons.check} handlePress={handleCheck} />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Create New Location</Text>
            <TextInput
              placeholder="Location Name"
              value={locationName}
              onChangeText={setLocationName}
              style={styles.input}
            />
            <Button title="Create" onPress={handleCreateLocation} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: '80%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default CreateLocationMap;
