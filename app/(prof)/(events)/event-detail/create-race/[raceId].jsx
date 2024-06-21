import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import { MAP_STYLE } from '../../../../../constants/map';
import IconButton from '../../../../../components/IconButton';
import { icons } from '../../../../../constants';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { saveListCheckpoints, fetchCoachRaceDetails } from '../../../../../utils/useAPI'; // Ensure this path is correct

const CreateRaceMap = () => {
  const { raceId } = useLocalSearchParams();
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [startLocation, setStartLocation] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getRaceDetails = async () => {
      try {
        const data = await fetchCoachRaceDetails(raceId);
        console.log(data);
        if (data && data.event_location) {
          const startPoint = {
            latitude: data.event_location.longitude,
            longitude: data.event_location.latitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setRegion(startPoint);
          setStartLocation(startPoint);
        } else {
          setRegion({
            latitude: 0,  // default latitude
            longitude: 0, // default longitude
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to fetch race details. Please try again.");
      }
    };

    if (raceId) {
      getRaceDetails();
    }
  }, [raceId]);

  const addMarker = (coordinate) => {
    setMarkers([...markers, { ...coordinate, score: 10 }]);
  };

  const handleSaveCheckpoints = async () => {
    try {
      const checkpoints = markers.map((marker, index) => ({
        number: index + 1,
        longitude: marker.longitude,
        latitude: marker.latitude,
        score: marker.score,
      }));

      await saveListCheckpoints(raceId, checkpoints);
      Alert.alert("Success", "Checkpoints saved successfully.");
      router.back(); // Navigate back to the previous page
    } catch (error) {
      console.error("Error saving checkpoints:", error);
      Alert.alert("Error", "Failed to save checkpoints. Please try again.");
    }
  };

  if (!region) {
    return <Text>Loading map...</Text>;
  }

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
          onRegionChangeComplete={(newRegion, gesture) => {
            if (!gesture.isGesture) {
              return;
            }
            setRegion(newRegion);
          }}
          onPress={(e) => addMarker(e.nativeEvent.coordinate)}
        >
          {startLocation && (
            <Marker coordinate={startLocation}>
              <View className="items-center justify-center">
                <Image source={icons.start} className="w-8 h-8" />
              </View>
            </Marker>
          )}
          {markers.map((marker, index) => (
            <React.Fragment key={index}>
              <Marker coordinate={marker}>
                <View className="items-center justify-center pl-5">
                  <Text className="text-black font-psemibold text-xl">
                    {index + 1}
                  </Text>
                  <Image source={icons.pin} className="w-8 h-8" />
                </View>
              </Marker>
              <Circle
                center={marker}
                radius={5} // radius in meters
                strokeColor="rgba(0,0,255,0.5)"
                fillColor="rgba(0,0,255,0.1)"
              />
            </React.Fragment>
          ))}
        </MapView>

        <View className="absolute top-20 bg-white border-2 p-2 rounded-lg">
          <Text className="text-black font-plight">
            {region.latitude.toFixed(6)}, {region.longitude.toFixed(6)}
          </Text>
        </View>

        <View className="bg-black w-[70vw] rounded-full p-2 flex-row justify-between mb-3">
          <IconButton icon={icons.bin} />
          <IconButton icon={icons.clean} handlePress={() => setMarkers([])} />
          <IconButton icon={icons.check} handlePress={handleSaveCheckpoints} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default CreateRaceMap;
