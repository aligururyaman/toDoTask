import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "redux/categoriesSlice";
import { AppDispatch, RootState } from "redux/store";
import AgreeBtn from "../../components/buttons/AgreeBtn";

export default function Contract() {
  const data = [
    { id: "1", text: "☀️ Plan tasks." },
    { id: "2", text: "🎯 Set goals." },
    { id: "3", text: "🚶‍♂️ Take breaks." },
    { id: "4", text: "💪 Move and refresh." },
    { id: "5", text: "📝 Prioritize." },
    { id: "6", text: "🔍 Break tasks down." },
    { id: "7", text: "🚫 No multitasking." },
    { id: "8", text: "📵 Minimize distractions." },
    { id: "9", text: "⏰ Limit social media." },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector(
    (state: RootState) => state.userProfile
  );

  const userId = getAuth().currentUser?.uid;

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch, userId]);

  return (
    <SafeAreaView>
      <View>
        <View className="top-20 gap-5" style={{ padding: 30 }}>
          {loading ? (
            <Text className="text-2xl" style={{ fontFamily: "PopBlack" }}>
              Loading...
            </Text>
          ) : error ? (
            <Text
              className="text-2xl"
              style={{ fontFamily: "PopBlack", color: "red" }}
            >
              Error: {error}
            </Text>
          ) : (
            <>
              <Text className="text-2xl" style={{ fontFamily: "PopBlack" }}>
                Hi {profile.name} {"👋"}
              </Text>
              <Text className="text-2xl" style={{ fontFamily: "PopBlack" }}>
                Let’s make a contract
              </Text>
            </>
          )}
        </View>
        <View className="top-20 " style={{ padding: 30 }}>
          <Text className="text-3xl" style={{ fontFamily: "PopBold" }}>
            I will
          </Text>
          {data.map((item) => (
            <View key={item.id} className={"p-2"}>
              <Text className={"text-xl"} style={{ fontFamily: "PopRegular" }}>
                • {item.text}
              </Text>
            </View>
          ))}
        </View>
        <View className="top-24 items-center">
          <AgreeBtn />
        </View>
      </View>
    </SafeAreaView>
  );
}
