import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";


import CustomButton from "../components/CustomButton";
import { images } from "../constants";

const Welcome = () => {
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="h-full w-full justify-center items-center">
          <Image
            source={images.map}
            className="w-64 h-64"
            resizeMode="contain"
          />

          <Text className="text-4xl font-pbold text-center">VAUKAZIMUT</Text>

          <Text className="text-2xl font-psemibold text-center">
            Course d'Orientation
          </Text>

          <CustomButton 
            title="Continue with Email"
            containerStyles="mt-16"
            handlePress={() => {router.push('/sign-in')}}
          />

          <CustomButton 
            title="go to mapview"
            containerStyles="mt-16"
            handlePress={() => {router.push('/maptest')}}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;
