import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../../redux/categoriesSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import ProfileEditModal from "../../components/modals/ProfileEditModal";

export default function Account() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector(
    (state: RootState) => state.userProfile
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const userId = getAuth().currentUser?.uid;

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId));
    }
  }, [modalVisible]);

  return (
    <SafeAreaView>
      <View>
        <View className="justify-center items-center h-40">
          <Text style={{ fontFamily: "PopBold" }}>
            Hi {"👋"} {profile.name}
          </Text>
          <Text
            style={{ fontFamily: "PopBold" }}
            className="text-customPink text-2xl"
          >
            Welcome HabitHUB
          </Text>
        </View>
        <View className="justify-center items-center mb-5">
          <View>
            <Text className="text-2xl" style={{ fontFamily: "PopBold" }}>
              User Info
            </Text>
          </View>
        </View>
        <View className="mx-10 gap-3">
          <View className="flex-row h-10 bg-customButton items-center rounded-lg border border-customGrey p-2">
            <View className="w-24">
              <Text className=" text-xl" style={{ fontFamily: "PopBold" }}>
                Name :{" "}
              </Text>
            </View>
            <View>
              <Text className="text-xl" style={{ fontFamily: "PopRegular" }}>
                {profile.name}
              </Text>
            </View>
          </View>
          <View className="flex-row h-10 bg-customButton items-center rounded-lg border border-customGrey p-2">
            <View className="w-24">
              <Text className=" text-xl" style={{ fontFamily: "PopBold" }}>
                Surname :{" "}
              </Text>
            </View>
            <View>
              <Text className="text-xl" style={{ fontFamily: "PopRegular" }}>
                {profile.surName}
              </Text>
            </View>
          </View>
          <View className="flex-row h-10 bg-customButton items-center rounded-lg border border-customGrey p-2">
            <View className="w-24">
              <Text className=" text-xl" style={{ fontFamily: "PopBold" }}>
                Age :{" "}
              </Text>
            </View>
            <View>
              <Text className="text-xl" style={{ fontFamily: "PopRegular" }}>
                {profile.age}
              </Text>
            </View>
          </View>
          <View className="flex-row h-10 bg-customButton items-center rounded-lg border border-customGrey p-2">
            <View className="w-24">
              <Text className=" text-xl" style={{ fontFamily: "PopBold" }}>
                Weight :{" "}
              </Text>
            </View>
            <View>
              <Text className="text-xl" style={{ fontFamily: "PopRegular" }}>
                {profile.weight}
              </Text>
            </View>
          </View>
          <View className="flex-row h-10 bg-customButton items-center rounded-lg border border-customGrey p-2">
            <View className="w-24">
              <Text className=" text-xl" style={{ fontFamily: "PopBold" }}>
                Size :{" "}
              </Text>
            </View>
            <View>
              <Text className="text-xl" style={{ fontFamily: "PopRegular" }}>
                {profile.size}
              </Text>
            </View>
          </View>
        </View>
        <View className="justify-center items-center h-40">
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View
              className="h-12 w-28 border border-customGrey justify-center items-center rounded-lg bg-customButton"
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
              <Text>Edit Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
        <ProfileEditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </SafeAreaView>
  );
}
