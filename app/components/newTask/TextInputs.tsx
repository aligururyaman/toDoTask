import React, { useState } from "react";
import { TextInput, View } from "react-native";

export default function textInputs() {
  const [newTask, setNewTask] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  return (
    <View className="justify-center items-center gap-3">
      <TextInput
        className="bg-white w-96 h-14 rounded-lg text-2xl p-4 underline"
        placeholder="Name your new task"
        onChangeText={setNewTask}
      />

      <TextInput
        className="bg-white w-96 h-14 rounded-lg text-2xl p-4 underline"
        placeholder="Set İcon"
        onChangeText={setDesc}
      />
    </View>
  );
}
