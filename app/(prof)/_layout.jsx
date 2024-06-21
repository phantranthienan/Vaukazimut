// app/(prof)/_Proflayout.jsx
import { Tabs, Stack } from "expo-router";
import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { clearStorage } from "../../utils/handleAsyncStorage"; // Ensure this path is correct
import { logOut, updateAxios } from "../../utils/useAPI"; // Ensure this path is correct
import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const LogoutText = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      await clearStorage();
      updateAxios();
      Alert.alert("Logged out successfully");
      router.replace("/"); // Replace with your login screen route
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={{ marginRight: 10 }}>
      <Text style={{ color: 'red' }}>Logout</Text>
    </TouchableOpacity>
  );
};

const ProfLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 84,
        },
      }}
    >
      <Tabs.Screen
        name="(events)"
        options={{
          title: "Events",
          headerRight: () => <LogoutText />,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Events"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(groups)"
        options={{
          title: "Groups",
          headerRight: () => <LogoutText />,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.bookmark}
              color={color}
              name="Groups"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(locations)"
        options={{
          title: "Locations",
          headerRight: () => <LogoutText />,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.plus}
              color={color}
              name="Locations"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default ProfLayout;
