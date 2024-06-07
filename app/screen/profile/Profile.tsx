import ButtomSlide from "@/components/buttons/ButtomSlide";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView>
      <View className="bg-customPinkTwo h-full">
        <View>
          <View className="items-center top-3">
            <Text style={{ fontFamily: "PopMed" }}>Profile</Text>
          </View>
        </View>
        <View className="top-12 pl-8 gap-4">
          <View className="h-16 w-[25rem] bg-customWhite rounded-xl justify-center pl-5">
            <TouchableOpacity>
              <View className="flex-row justify-between pr-2">
                <Text style={{ fontFamily: "PopBold" }}>Account</Text>
                <FontAwesome name="chevron-right" size={14} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <View className="h-16 w-[25rem] bg-customWhite rounded-xl justify-center pl-5">
            <TouchableOpacity>
              <View className="flex-row justify-between pr-2">
                <Text style={{ fontFamily: "PopBold" }}>Notifications</Text>
                <FontAwesome name="chevron-right" size={14} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <View className="h-16 w-[25rem] bg-customWhite rounded-xl justify-center pl-5">
            <TouchableOpacity>
              <View className="flex-row justify-between pr-2">
                <Text style={{ fontFamily: "PopBold" }}>Help</Text>
                <FontAwesome name="chevron-right" size={14} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <View className="h-16 w-[25rem] bg-customWhite rounded-xl justify-center pl-5">
            <TouchableOpacity>
              <View className="flex-row justify-between pr-2">
                <Text style={{ fontFamily: "PopBold" }}>Storage and Data</Text>
                <FontAwesome name="chevron-right" size={14} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <View className="h-16 w-[25rem] bg-customWhite rounded-xl justify-center pl-5">
            <TouchableOpacity>
              <View className="flex-row justify-between pr-2">
                <Text style={{ fontFamily: "PopBold" }}>Invite a friend</Text>
                <FontAwesome name="chevron-right" size={14} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <View className="h-16 w-[25rem] bg-customWhite rounded-xl justify-center pl-5">
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
