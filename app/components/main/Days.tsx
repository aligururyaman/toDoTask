import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "redux/categoriesSlice";
import { RootState } from "redux/store";

export default function Days() {
  const dispatch = useDispatch();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [currentWeek, setCurrentWeek] = useState(0);
  const selectedDate = useSelector(
    (state: RootState) => state.userData.selectedDate
  );

  const days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    const monday = date.getDate() - date.getDay() + 1 + currentWeek * 7;
    date.setDate(monday + i);
    return {
      id: date.toDateString(), // Unique ID for the date
      day: dayNames[date.getDay()], // Day of the week
      isToday: date.toDateString() === new Date().toDateString(), // Is it today?
      isSelected: date.toDateString() === selectedDate, // Is it selected?
    };
  });

  const nextWeek = () => {
    setCurrentWeek(currentWeek + 1);
  };

  const previousWeek = () => {
    setCurrentWeek(currentWeek - 1);
  };

  const handleDatePress = (date: string) => {
    dispatch(setSelectedDate(date));
  };

  useEffect(() => {
    const today = new Date().toDateString();
    dispatch(setSelectedDate(today));
  }, [dispatch]);

  return (
    <View>
      <View className="items-center">
        <Text className="text-2xl" style={{ fontFamily: "PopMed" }}>
          Today
        </Text>
      </View>
      <View className="flex-row p-3 gap-2.5 justify-center">
        {days.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleDatePress(item.id)}
            className="items-center top-2"
          >
            <View
              className={`w-14 h-24 rounded-xl items-center ${
                item.isToday || item.isSelected
                  ? "bg-customPink"
                  : "bg-customDay"
              }`}
            >
              <View className="items-center">
                <Text className="top-2" style={{ fontFamily: "PopBold" }}>
                  {item.day}
                </Text>
              </View>
              <View className="items-center bg-customWhite top-3 justify-center w-10 h-10 rounded-full">
                <Text style={{ fontFamily: "PopBold" }}>
                  {item.id.split(" ")[2]}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View className="flex-row justify-between p-4">
        <TouchableOpacity onPress={previousWeek}>
          <Text style={{ fontFamily: "PopMed" }}>Previous Week</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={nextWeek}>
          <Text style={{ fontFamily: "PopMed" }}>Next Week</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
