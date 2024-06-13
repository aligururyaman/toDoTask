import ButtomSlide from "@/components/buttons/ButtomSlide";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const route = useRouter();
  return (
    <SafeAreaView>
      <View className="bg-customPinkTwo h-full">
        <View>
          <View className="items-center top-3">
            <Text style={{ fontFamily: "PopMed" }}>Profile</Text>
          </View>
        </View>
        <View className="top-12 gap-4 items-center">
          <View className="h-16 w-profileW bg-customWhite rounded-xl justify-center pl-5">
            <TouchableOpacity
              onPress={() => route.push("screen/profileDetail/Account")}
            >
              <View className="flex-row justify-between pr-2">
                <Text style={{ fontFamily: "PopBold" }}>Account</Text>
                <FontAwesome name="chevron-right" size={14} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <View className="h-16 w-profileW bg-customWhite rounded-xl justify-center pl-5">
            <TouchableOpacity
              onPress={() => route.push("screen/profileDetail/Account")}
            >
              <View className="flex-row justify-between pr-2">
                <Text style={{ fontFamily: "PopBold" }}>Notifications</Text>
                <FontAwesome name="chevron-right" size={14} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <View className="h-16 w-profileW bg-customWhite rounded-xl justify-center pl-5">
            <TouchableOpacity
              onPress={() => route.push("screen/profileDetail/Help")}
            >
              <View className="flex-row justify-between pr-2">
                <Text style={{ fontFamily: "PopBold" }}>Help</Text>
                <FontAwesome name="chevron-right" size={14} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <View className="h-16 w-profileW bg-customWhite rounded-xl justify-center pl-5">
            <TouchableOpacity
              onPress={() => route.push("screen/profileDetail/StorageAndData")}
            >
              <View className="flex-row justify-between pr-2">
                <Text style={{ fontFamily: "PopBold" }}>Storage and Data</Text>
                <FontAwesome name="chevron-right" size={14} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <View className="h-16 w-profileW bg-customWhite rounded-xl justify-center pl-5">
            <TouchableOpacity
              onPress={() => route.push("screen/profileDetail/Invite")}
            >
              <View className="flex-row justify-between pr-2">
                <Text style={{ fontFamily: "PopBold" }}>Invite a friend</Text>
                <FontAwesome name="chevron-right" size={14} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <View className="h-16 w-profileW bg-customWhite rounded-xl justify-center pl-5">
            <TouchableOpacity>
              <View className="flex-row justify-between pr-2">
                <Text style={{ fontFamily: "PopBold" }}>Logout</Text>
                <FontAwesome name="chevron-right" size={14} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View className="top-[25rem]">
          <ButtomSlide />
        </View>
      </View>
    </SafeAreaView>
  );
}
