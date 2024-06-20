// app/(prof)/(groups)/_layout.jsx
import { Stack } from "expo-router";
import React from 'react';
import { TouchableOpacity, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import { clearStorage } from "../../../utils/handleAsyncStorage"; // Ensure this path is correct
import { logOut, updateAxios } from "../../../utils/useAPI"; // Ensure this path is correct

const GroupLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="group-list"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="group-detail/[groupId]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default GroupLayout;
