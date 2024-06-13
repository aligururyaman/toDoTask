import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../../redux/categoriesSlice";
import { AppDispatch, RootState } from "../../../redux/store";

interface ProfileModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const ProfileEditModal: React.FC<ProfileModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector(
    (state: RootState) => state.userProfile
  );

  const [localProfile, setLocalProfile] = useState(profile);
  const userId = getAuth().currentUser?.uid;

  useEffect(() => {
    if (modalVisible && userId) {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch, modalVisible]);

  useEffect(() => {
    setLocalProfile(profile);
  }, [profile]);

  const handleSave = () => {
    if (userId) {
      dispatch(
        updateUserProfile({
          userId,
          data: localProfile,
        })
      );
      setModalVisible(false);
    }
  };

  const handleChange = (key: keyof typeof profile, value: string) => {
    setLocalProfile({ ...localProfile, [key]: value });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View className="w-96 bg-customButton rounded-lg p-6 items-center">
          <Text style={{ fontFamily: "PopMed" }} className="text-3xl mb-4">
            Edit Profile
          </Text>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <View>
                <Text style={{ fontFamily: "PopLight" }} className="text-lg">
                  Name:
                </Text>
                <TextInput
                  className="bg-customWhite w-72 h-12 rounded-xl text-lg p-3 mb-3 border border-customGrey"
                  onChangeText={(text) => handleChange("name", text)}
                  value={localProfile.name}
                />
              </View>
              <View>
                <Text style={{ fontFamily: "PopLight" }} className="text-lg">
                  Surname:
                </Text>
                <TextInput
                  className="bg-customWhite w-72 h-12 rounded-xl text-lg p-3 mb-3 border border-customGrey"
                  onChangeText={(text) => handleChange("surName", text)}
                  value={localProfile.surName}
                />
              </View>
              <View>
                <Text style={{ fontFamily: "PopLight" }} className="text-lg">
                  Age:
                </Text>
                <TextInput
                  className="bg-customWhite w-72 h-12 rounded-xl text-lg p-3 mb-3 border border-customGrey"
                  onChangeText={(text) => handleChange("age", text)}
                  value={localProfile.age}
                />
              </View>
              <View>
                <Text style={{ fontFamily: "PopLight" }} className="text-lg">
                  Weight:
                </Text>
                <TextInput
                  className="bg-customWhite w-72 h-12 rounded-xl text-lg p-3 mb-3 border border-customGrey"
                  onChangeText={(text) => handleChange("weight", text)}
                  value={localProfile.weight}
                />
              </View>
              <View>
                <Text style={{ fontFamily: "PopLight" }} className="text-lg">
                  Size:
                </Text>
                <TextInput
                  className="bg-customWhite w-72 h-12 rounded-xl text-lg p-3 mb-3 border border-customGrey"
                  onChangeText={(text) => handleChange("size", text)}
                  value={localProfile.size}
                />
              </View>
              <TouchableOpacity onPress={handleSave}>
                <View
                  className="h-12 w-24 bg-customButton justify-center items-center rounded-lg my-4"
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
                  <Text
                    style={{ fontFamily: "PopRegular" }}
                    className="text-xl"
                  >
                    Save Info
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          {error && <Text style={{ color: "red" }}>{error}</Text>}
        </View>
      </View>
    </Modal>
  );
};

export default ProfileEditModal;
