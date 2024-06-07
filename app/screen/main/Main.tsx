import AddBtn from "@/components/buttons/AddBtn";
import ButtomSlide from "@/components/buttons/ButtomSlide";
import Days from "@/components/main/Days";
import Selection from "@/components/main/Selection";
import { useAuth } from "authProvider";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";

import { deleteUserData, fetchUserData } from "redux/categoriesSlice";
import Loading from "../loading/Loading";

export default function Main() {
  const { user } = useAuth();
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userData.data);
  const loading = useSelector((state: RootState) => state.userData.loading);
  const selectedDate = useSelector(
    (state: RootState) => state.userData.selectedDate
  );
  const [showOptionsIndex, setShowOptionsIndex] = useState<number | null>(null);
  const [repeatOption, setRepeatOption] = useState<string>("");
  const [inline, setInline] = useState<string>("");

  const handleOptionSelect = (option: string, itemId: string) => {
    setRepeatOption(option);
    setShowOptionsIndex(null);
    if (option === "Delete" && user) {
      dispatch(deleteUserData({ userId: user.uid, itemId }));
    }
    if (option === "Done") {
      setInline("true");
    }
    if (option === "Undone") {
      setInline("false");
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchUserData(user.uid));
    }
  }, [user, dispatch]);

  const filteredData = selectedDate
    ? userData.filter((data) => data.date === selectedDate)
    : userData;

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="bg-customPinkTwo h-52">
      <SafeAreaView>
        <Days />
        <Selection />
        <View className="items-center top-3">
          <View className="h-16 w-[23rem] p-1 items-center gap-5">
            {filteredData.length === 0 ? (
              <View className="gap-3 top-28">
                <View>
                  <Image source={require("../../utils/images/mainW.jpg")} />
                </View>
                <View className="bg-gray-600 h-[0.1rem] w-80" />
                <View className="items-center">
                  <Text className="text-2xl" style={{ fontFamily: "PopMed" }}>
                    Nothing here yet...
                  </Text>
                </View>
              </View>
            ) : (
              filteredData.map((data, index) => (
                <View key={index} className="flex-row">
                  <View
                    className="h-16 w-[27rem] justify-between items-center p-1 rounded-xl flex-row"
                    style={{ backgroundColor: data.color }}
                  >
                    <View className="ml-5 flex-row gap-2 items-center">
                      <Text>{data.icon}</Text>
                      <Text
                        className="text-2xl"
                        style={{ fontFamily: "PopRegular" }}
                      >
                        {data.item}
                      </Text>

                      <View
                        className={`${inline === "true" ? "bg-gray-400 h-[0.1rem] w-80 my-2 absolute" : ""}`}
                      />
                    </View>
                    <View className="flex-row justify-between">
                      <TouchableOpacity
                        onPress={() =>
                          setShowOptionsIndex(
                            showOptionsIndex === index ? null : index
                          )
                        }
                      >
                        <View className="h-8 w-8 bg-customWhite rounded-full border border-gray-300" />
                      </TouchableOpacity>
                      {showOptionsIndex === index && (
                        <View className="bg-white rounded-lg p-2 shadow-lg mt-2 -top-10 absolute -left-5">
                          {["Done", "Undone", "Delete"].map((option) => (
                            <TouchableOpacity
                              key={option}
                              onPress={() =>
                                handleOptionSelect(option, data.id)
                              }
                            >
                              <Text className="p-2">{option}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
        <View className="absolute -bottom-[34rem] left-96">
          <AddBtn />
        </View>
        <View className="absolute -bottom-[40rem]">
          <ButtomSlide />
        </View>
      </SafeAreaView>
    </View>
  );
}
