import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomButton from "../components/CustomButton";
import { images } from "../constants";
import { getToken, getRole } from "../utils/handleAsyncStorage";

const Welcome = () => {

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken();
        const role = await getRole();

        console.log(token, role);
        if (token && role) {
          if (role === "Coach") {
            router.replace("/homeProf");
          } else if (role === "Runner") {
            router.replace("/homeStu");
          }
        } 
      } catch (error) {
        console.error("Error checking auth:", error);
      }
    };

    checkAuth();
  }, []);

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
            title="Continue"
            containerStyles="mt-16"
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
          />

          <CustomButton
            title="go to map for student"
            containerStyles="mt-16"
            handlePress={() => {
              router.push("/studentMap");
            }}
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;
