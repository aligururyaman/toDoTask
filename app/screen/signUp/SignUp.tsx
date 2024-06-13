import SignInBtn from "@/components/buttons/SignInBtn";
import Or from "@/components/or/Or";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "firebaseConfig";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  const route = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const auth = FIREBASE_AUTH;

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await createUserWithEmailAndPassword(auth, email, password);
        route.push("screen/login/Login");
      } else {
        alert("Check your information please");
      }
    } catch (error) {
      alert("Check your information please");
    } finally {
      setLoading(false);
    }
  };
  const btnTitle = "Sign Up";

  return (
    <SafeAreaView>
      <View>
        <View className="items-end mr-5 top-4">
          <TouchableOpacity onPress={() => route.back()}>
            <View
              className="w-12 h-12 bg-customButton rounded-full border justify-center items-center"
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
              <Ionicons name="arrow-back-sharp" size={28} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View className="justify-center items-center top-12 p-16 gap-4">
          <Text
            style={{ fontFamily: "PopBold" }}
            className="text-customPink text-xl"
          >
            Sign up to HabitHUB
          </Text>
          <Text
            style={{ fontFamily: "PopLight" }}
            className="justify-center text-center"
          >
            Sign Up using your social account or email to continue with us
          </Text>
          <View>{/* Auth İconlar buraya gelecek */}</View>
        </View>
        <View className="flex-row gap-10 justify-center">
          <TouchableOpacity>
            <View>
              <Image source={require("../../utils/images/facebook.png")} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <Image source={require("../../utils/images/gmail.png")} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <Image source={require("../../utils/images/apple.png")} />
            </View>
          </TouchableOpacity>
        </View>
        <Or />
        <View className="justify-center items-center gap-8 top-20">
          <View className="  h-16 w-96 bg-customBgWhite rounded-lg justify-center p-4">
            <TextInput
              className="h-10 w-full text-2xl border-b border-b-gray-400 "
              style={{
                lineHeight: 25,
              }}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>
          <View className="  h-16 w-96 bg-customBgWhite rounded-lg justify-center p-4">
            <TextInput
              className="h-10 w-full text-2xl border-b border-b-gray-400 "
              style={{
                lineHeight: 25,
              }}
              placeholder="Password"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>

          <View className="top-16">
            <SignInBtn
              onPress={handleAuth}
              loading={loading}
              title={btnTitle}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
