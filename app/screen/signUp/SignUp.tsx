import SignInBtn from "@/components/buttons/SignInBtn";
import Or from "@/components/or/Or";
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
        alert("Check your information please aa");
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
        <View className="justify-center items-center gap-8">
          <TextInput
            className="top-40 bg-white w-96 h-14 rounded-lg text-2xl p-4 underline"
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            className="top-40 bg-white w-96 h-14 rounded-lg text-2xl p-4 underline"
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <View className="top-48">
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
