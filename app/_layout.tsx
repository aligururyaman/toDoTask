import { Stack } from "expo-router";
import React from "react";
import { Provider } from "react-redux";

import { AuthProvider } from "authProvider";
import store from "redux/store";
import "../global.css";

export default function _layout() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="screen" options={{ headerShown: false }} />
        </Stack>
      </Provider>
    </AuthProvider>
  );
}
