// app/(prof)/(events)/_layout.jsx
import { Stack } from "expo-router";
import React from 'react';

const EventLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="event-list"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="event-detail/[eventId]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="event-detail/create-race/[raceId].jsx"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default EventLayout;
