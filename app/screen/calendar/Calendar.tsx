import ButtomSlide from "@/components/buttons/ButtomSlide";
import React from "react";
import { Text, View } from "react-native";

export default function Calendar() {
  return (
    <View>
      <Text>Calendar</Text>
      <View className="top-[53rem]">
        <ButtomSlide />
      </View>
    </View>
  );
}
