import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{ title: "Sign In" }} />
        <Stack.Screen name="sign-up" options={{ title: "Sign Up"}} />
        <Stack.Screen name="sign-up-coach" options={{ title: "Sign Up Coach"}} />
        <Stack.Screen name="sign-up-runner" options={{ title: "Sign Up Runner"}} />
      </Stack>
    </>
  );
};

export default AuthLayout;
