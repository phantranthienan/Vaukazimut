import { View, Text, Image, StyleSheet, Modal } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import {
  INSA_CVL,
  STADE_JUSTICE,
  LAC_DAURON,
  CREPS,
  MAP_STYLE,
} from "../constants/map";
import React, { useState } from "react";

import IconButton from "../components/IconButton";
import { icons } from "../constants";

const Maptest = () => {
  const [region, setRegion] = useState(INSA_CVL);
  const [markers, setMarkers] = useState([]);

  const addMarker = (coordinate) => {
    setMarkers([...markers, coordinate]);
  };

  return (
    <>
      <View style={styles.container}>
        {/* *************** Render Map View ***************  */}

        <MapView
          paddingAdjustmentBehavior="never"
          style={styles.map}
          prorvider={PROVIDER_GOOGLE}
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
          {markers.map((marker, index) => (
            <React.Fragment key={index}>
              <Marker coordinate={marker}>
                <View className="items-center justify-center pl-5">
                  <Text className="text-black font-psemibold text-xl">
                    {index + 1}
                  </Text>
                  <Image source={icons.balise} className="w-8 h-8" />
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

        {/* *************** Render Map View ***************  */}

        {/* *************** Render Longitude,Latitude ***************  */}

        <View className="absolute top-20 bg-black bg-opacity-10 p-2 rounded-lg">
          <Text className="text-white font-plight">
            {region.latitude.toFixed(6)}, {region.longitude.toFixed(6)}
          </Text>
        </View>

        {/* *************** Render Focus and Longitude,Latitude ***************  */}

        {/* *************** Render Buttons ***************  */}

        <View className="bg-black w-[70vw] rounded-full p-2 flex-row justify-between mb-3">
          <IconButton icon={icons.bin} />
          <IconButton icon={icons.clean} handlePress={() => setMarkers([])} />
          <IconButton icon={icons.check} handlePress={() => console.log(markers)} />
        </View>

        {/* *************** Render Buttons ***************  */}
      </View>
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
});

export default Maptest;
