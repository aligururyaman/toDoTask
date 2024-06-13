import ButtomSlide from "@/components/buttons/ButtomSlide";
import { useAuth } from "authProvider";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "redux/categoriesSlice";
import { AppDispatch, RootState } from "redux/store";

const dayMapping: { [key: string]: number } = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 0,
};

const NewTask: React.FC = () => {
  const [newTask, setNewTask] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("Daily");
  const [selectedDaily, setSelectedDaily] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("#ADF7B6");
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [repeatOption, setRepeatOption] = useState<string>("No Repeat");
  const [selectedTag, setSelectedTag] = useState<string>("");

  const { user } = useAuth();
  const route = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const selectedDate = useSelector(
    (state: RootState) => state.userData.selectedDate
  );

  useEffect(() => {
    if (selectedTab === "Weekly") {
      setSelectedDaily(["Mon", "Tue", "Wed", "Thu", "Fri"]);
    } else if (selectedTab === "Monthly") {
      setSelectedDaily(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
    } else {
      setSelectedDaily([]);
    }
  }, [selectedTab]);

  const handlePress = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleDaily = (day: string) => {
    if (selectedTab === "Daily") {
      setSelectedDaily((prev) =>
        prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
      );
    }
  };

  const handleOptionSelect = (option: string) => {
    setRepeatOption(option);
    setShowOptions(false);
  };

  const handleAddTask = async () => {
    if (user && selectedDate && newTask && desc) {
      let datesToAdd: string[] = [selectedDate];

      if (selectedTab === "Weekly") {
        const weeksAhead = 10;
        datesToAdd = [];

        for (let i = 0; i < weeksAhead; i++) {
          selectedDaily.forEach((day) => {
            const date = dayjs(selectedDate)
              .add(i, "week")
              .day(dayMapping[day])
              .format("ddd MMM DD YYYY");
            datesToAdd.push(date);
          });
        }
      } else if (selectedTab === "Monthly") {
        const startDate = dayjs(selectedDate).startOf("month");
        const endDate = dayjs(selectedDate).endOf("month");
        datesToAdd = [];

        for (let d = startDate; d.isBefore(endDate); d = d.add(1, "day")) {
          if (selectedDaily.includes(d.format("ddd"))) {
            datesToAdd.push(d.format("ddd MMM DD YYYY"));
          }
        }
      } else {
        datesToAdd = [dayjs(selectedDate).format("ddd MMM DD YYYY")];
      }

      const tasks = datesToAdd.map((date) => ({
        item: newTask,
        color: selectedColor,
        timestamp: Timestamp.now(),
        date,
        desc: desc,
        days: selectedDaily,
        tag: selectedTag,
        icon: desc,
      }));

      try {
        await Promise.all(
          tasks.map((task) =>
            dispatch(addUserData({ userId: user.uid, data: task })).unwrap()
          )
        );
        route.push("screen/main/Main");
      } catch (error) {
        console.error("Failed to add user data:", error);
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView className="bg-customBlue h-full">
        <View className="justify-center items-center h-60">
          <Text className="text-7xl">⭐</Text>
          <Text className="text-2xl" style={{ fontFamily: "PopMed" }}>
            New Task
          </Text>
          <Text style={{ fontFamily: "PopRegular" }}>
            Click to change the emoji
          </Text>
        </View>
        <View className="justify-center items-center gap-3">
          <View className="h-16 w-[85%] bg-customBgWhite rounded-lg justify-center p-4">
            <TextInput
              className="h-10 w-full text-2xl border-b border-b-gray-400 "
              placeholder="Name your new task"
              onChangeText={setNewTask}
            />
          </View>
          <View className="h-16 w-[85%] bg-customBgWhite rounded-lg justify-center p-4">
            <TextInput
              className="h-10 w-full text-2xl border-b border-b-gray-400 "
              placeholder="Set Icon"
              onChangeText={setDesc}
            />
          </View>
        </View>
        <View className="mt-8 gap-3 items-center">
          <Text style={{ fontFamily: "PopBold" }} className="">
            Card Color
          </Text>
          <View className="flex-row gap-4 items-center ">
            {[
              "#ADF7B6",
              "#CA87F4",
              "#FFC09F",
              "#8FFFF8",
              "CC2222",
              "#FBF1BA",
              "#7075E5",
              "#FF36F7",
            ].map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => setSelectedColor(color)}
              >
                <View
                  style={{ backgroundColor: color }}
                  className={`h-9 w-9 rounded-full border-2 ${
                    selectedColor === color
                      ? "border-customBlack"
                      : "border-customWhite"
                  }`}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View className="mt-5 gap-3 items-center">
          <Text style={{ fontFamily: "PopBold" }}>Repeat</Text>
          <View className="bg-customWhite h-[200px] w-[370px] rounded-lg">
            <View className="m-5">
              <Text
                className="text-gray-500"
                style={{ fontFamily: "PopRegular" }}
              >
                Set a cycle for your task
              </Text>
              <View className="bg-gray-400 h-[0.1rem] w-96 my-2" />
              <View className="bg-customTaskwhite h-12 w-96 rounded-full flex-row justify-around items-center">
                {["Daily", "Weekly", "Monthly"].map((tab) => (
                  <View
                    key={tab}
                    className={`h-full justify-center flex-1 rounded-full items-center ${
                      selectedTab === tab ? "bg-customOrtange" : ""
                    }`}
                  >
                    <TouchableOpacity onPress={() => handlePress(tab)}>
                      <Text>{tab}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <View className="bg-gray-400 h-[0.1rem] w-96 my-2" />
              <View className="flex-row gap-4 justify-center">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <TouchableOpacity
                      key={day}
                      onPress={() => handleDaily(day)}
                    >
                      <View
                        className={`h-11 w-11 rounded-full border-2 border-customWhite justify-center items-center ${
                          selectedDaily.includes(day)
                            ? "bg-customOrtange"
                            : "bg-customTaskwhite"
                        }`}
                      >
                        <Text style={{ fontFamily: "PopLight" }}>{day}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                )}
              </View>
              <View className="bg-gray-400 h-[0.1rem] w-96 my-2" />
              <View className="flex-row justify-between">
                <Text>Repeat</Text>
                <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
                  <Text>{repeatOption}</Text>
                </TouchableOpacity>
                {showOptions && (
                  <View className="bg-white rounded-lg p-2 shadow-lg mt-2 -top-10">
                    {["Every Week", "No Repeat"].map((option) => (
                      <TouchableOpacity
                        key={option}
                        onPress={() => handleOptionSelect(option)}
                      >
                        <Text className="p-2">{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
              <View className="bg-gray-400 h-[0.1rem] w-96 my-2" />
            </View>
          </View>
          <View className="w-[370px] h-28 rounded-lg bg-customWhite">
            <View className="m-5">
              <Text>Set a tag for your task</Text>
              <View className="bg-gray-400 h-[0.1rem] w-96 my-2" />
              <View className="flex-row gap-1">
                {["Daily Routine", "Study Routine", "Add More +"].map((tag) => (
                  <View
                    key={tag}
                    className="h-10 bg-customSoftBlue justify-center w-28 rounded-full items-center"
                  >
                    <TouchableOpacity onPress={() => setSelectedTag(tag)}>
                      <Text>{tag}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="-top-28 items-center">
        <TouchableOpacity onPress={handleAddTask}>
          <View
            className="bg-customButton w-14 h-14 justify-center items-center rounded-full"
            style={{
              width: 160,
              height: 50,
              borderRadius: 8,
              backgroundColor: "#F6F6F6",
              justifyContent: "center",
              alignItems: "center",
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
            <Text style={{ fontFamily: "PopBold" }}>Add Task</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="-top-24">
        <ButtomSlide />
      </View>
    </SafeAreaView>
  );
};

export default NewTask;
