import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomButton from "../components/CustomButton";
import { images } from "../constants";
import { getToken, getRole } from "../utils/handleAsyncStorage";
import { updateAxios } from "../utils/useAPI";

const Welcome = () => {

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="h-full w-full justify-center items-center bg-primary-emerald">
          <Image
            source={images.map}
            className="w-64 h-64"
            resizeMode="contain"
          />

          <Text className="text-white text-4xl font-pbold text-center">VAUKAZIMUT</Text>

          <Text className="text-white text-2xl font-psemibold text-center">
            Course d'Orientation
          </Text>

          <CustomButton
            title="Continue"
            textStyles="text-2xl"
            containerStyles="mt-16 w-[50vw] bg-black"
            handlePress={() => {
                router.push("/sign-in");
              }
            }
          />

          {/* <CustomButton
            title="go to map for prof"
            containerStyles="mt-16"
            handlePress={() => {
              router.push("/profMap");
            }}
          /> */}

          <CustomButton
            title="go to map for student"
            containerStyles="mt-16"
            handlePress={() => {
              router.push("/studentMap");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;
