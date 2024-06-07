import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Selection() {
  return (
    <View>
      <View className="items-center">
        <View className="flex-row w-80 h-12 gap-6 items-center justify-center">
          <View className="h-12 w-16 justify-center items-center rounded-xl border border-customGrey">
            <TouchableOpacity>
              <Text style={{ fontFamily: "PopBold" }}>All</Text>
            </TouchableOpacity>
          </View>
          <View className="h-12 w-32 justify-center items-center rounded-xl border border-customGrey">
            <TouchableOpacity>
              <Text style={{ fontFamily: "PopBold" }}>Daily Routine</Text>
            </TouchableOpacity>
          </View>
          <View className="h-12 w-32 justify-center items-center rounded-xl border border-customGrey">
            <TouchableOpacity>
              <Text style={{ fontFamily: "PopBold" }}>Study Routine</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
