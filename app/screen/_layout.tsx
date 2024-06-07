import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="login/Login" options={{ headerShown: false }} />
      <Stack.Screen name="contract/Contract" options={{ headerShown: false }} />
      <Stack.Screen name="main/Main" options={{ headerShown: false }} />
      <Stack.Screen
        name="suggestions/Suggestions"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="profile/Profile" options={{ headerShown: false }} />
      <Stack.Screen name="calendar/Calendar" options={{ headerShown: false }} />
      <Stack.Screen name="signUp/SignUp" options={{ headerShown: false }} />
      <Stack.Screen name="newtask/NewTask" options={{ headerShown: false }} />
    </Stack>
  );
}
