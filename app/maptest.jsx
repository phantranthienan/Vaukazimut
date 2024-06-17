import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { INSA_CVL, STADE_JUSTICE, LAC_DAURON, CREPS, MAP_STYLE } from "../constants/map";
import React from "react";

const Maptest = () => {
  return (
    <MapView
      className="h-full"
      prorvider={PROVIDER_GOOGLE}
      initialRegion={STADE_JUSTICE}
      customMapStyle={MAP_STYLE}
    ></MapView>
  );
};

export default Maptest;
