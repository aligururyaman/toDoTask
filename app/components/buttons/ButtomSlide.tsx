import { FontAwesome, FontAwesome5, Fontisto } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export default function ButtomSlide() {
  const route = useRouter();
  return (
    <View
      className="flex-row h-28 bg-customWhite justify-center  rounded-3xl gap-10 absolute w-[100%]"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5,
      }}
    >
      <View className="w-24 justify-center items-center -top-6">
        <TouchableOpacity
          onPress={() => route.push("screen/calendar/Calendar")}
        >
          <Fontisto name="date" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View className="w-24 justify-center items-center -top-6">
        <TouchableOpacity onPress={() => route.push("screen/main/Main")}>
          <FontAwesome5 name="tasks" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View className="w-24 justify-center items-center -top-6">
        <TouchableOpacity onPress={() => route.push("screen/profile/Profile")}>
          <FontAwesome name="user" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
