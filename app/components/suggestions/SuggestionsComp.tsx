import { useAuth } from "authProvider";
import { useRouter } from "expo-router";
import { Timestamp } from "firebase/firestore";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { UserData, addUserData } from "redux/categoriesSlice"; // Adjust the import path
import { AppDispatch, RootState } from "redux/store"; // Adjust the import path

interface SuggestionsCompProps {
  title: string;
  info: string;
  sugges: string[];
  colors: string[];
  icon: string[];
}

const SuggestionsComp: React.FC<SuggestionsCompProps> = ({
  title,
  info,
  sugges,
  colors,
  icon,
}) => {
  const { user } = useAuth();
  const route = useRouter();
  const selectedDate = useSelector(
    (state: RootState) => state.userData.selectedDate
  );
  const dispatch: AppDispatch = useDispatch();

  const handlePress = async (item: string, icon: string, color: string) => {
    if (user && selectedDate) {
      const data: UserData = {
        item,
        icon,
        color,
        timestamp: Timestamp.now(),
        date: selectedDate,
        desc: "",
        days: [],
        tag: "",
      };

      try {
        await dispatch(addUserData({ userId: user.uid, data })).unwrap();
        route.push("screen/main/Main");
      } catch (error) {
        console.error("Failed to add user data:", error);
      }
    }
  };

  return (
    <View>
      <View>
        <View className="pl-5">
          <Text className="text-2xl" style={{ fontFamily: "PopMed" }}>
            {title}
          </Text>
          <Text className="text-sm pl-2" style={{ fontFamily: "PopRegular" }}>
            {info}
          </Text>
          <View className="items-end -top-10 pr-5">
            <Text style={{ fontFamily: "PopBold" }}>See all {">"}</Text>
          </View>
        </View>
        <View className="gap-4">
          {sugges.map((item, index) => (
            <View
              key={index}
              className="flex-row gap-3 justify-center items-center"
            >
              <View
                className="h-16 w-[23rem] justify-center p-1 rounded-xl"
                style={{ backgroundColor: colors[index] }}
              >
                <Text
                  className="text-xl ml-5"
                  style={{ fontFamily: "PopRegular" }}
                >
                  {icon[index]}
                  {item}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handlePress(item, icon[index], colors[index])}
              >
                <View className="bg-customGrey w-12 rounded-full h-12 justify-center items-center">
                  <Text className="text-4xl">+</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default SuggestionsComp;
