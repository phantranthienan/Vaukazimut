import { Stack } from 'expo-router';
import React from 'react';

const StudentLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="group-list" options={{ title: 'Groups' }} />
      <Stack.Screen name="event-list" options={{ title: 'Events' }} />
      <Stack.Screen name="event-detail/[eventId]" options={{ title: 'Event Detail' }} />
    </Stack>
  );
}

export default StudentLayout;
