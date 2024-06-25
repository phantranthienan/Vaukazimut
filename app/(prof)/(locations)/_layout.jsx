import { Stack } from "expo-router";

const LocationsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="location-list" options={{ headerShown: false }} />
      <Stack.Screen name="prof-map" options={{ headerShown: false }} />
    </Stack>
  );
};

export default LocationsLayout;
