import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function AddBtn() {
  const route = useRouter();
  return (
    <View>
      <TouchableOpacity
        onPress={() => route.push("screen/suggestions/Suggestions")}
      >
        <View
          className="bg-customButton w-20 h-20 justify-center items-center rounded-full"
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text style={{ fontFamily: "PopMed" }} className="text-4xl top-1">
            +
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
