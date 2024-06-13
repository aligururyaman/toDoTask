import ButtomSlide from "@/components/buttons/ButtomSlide";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Calendar() {
  return (
    <SafeAreaView>
      <View className="justify-center items-center h-full">
        <Text className="text-4xl">Furkana boydan Girim</Text>
      </View>
      <View className="top-[53rem]">
        <ButtomSlide />
      </View>
    </SafeAreaView>
  );
}
