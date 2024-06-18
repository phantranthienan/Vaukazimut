import { View, Text, Image, StyleSheet, Platform } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

import {
  INSA_CVL,
  STADE_JUSTICE,
  LAC_DAURON,
  CREPS,
  MAP_STYLE,
} from "../constants/map";

import IconButton from "../components/IconButton";
import { icons } from "../constants";

const StudentMap = () => {
  const [region, setRegion] = useState(INSA_CVL);

  const markers = [
    {
      latitude: 47.082353,
      longitude: 2.415264,
    },
    {
      latitude: 47.081773,
      longitude: 2.416305,
    },
    {
      latitude: 47.081642,
      longitude: 2.415474,
    }
  ];


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
        >
          {markers.map((marker, index) => (
            <React.Fragment key={index}>
              <Marker coordinate={marker} title="here" description="10 points">
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

export default StudentMap;
