import SignInBtn from "@/components/buttons/SignInBtn";
import Or from "@/components/or/Or";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "firebaseConfig";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../loading/Loading";

export default function Login() {
  const route = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("userEmail");
        const savedPassword = await AsyncStorage.getItem("userPassword");
        if (savedEmail && savedPassword) {
          setEmail(savedEmail);
          setPassword(savedPassword);
        }
      } catch (error) {
        console.error("Error loading user data", error);
      }
    };

    loadUserData();
  }, []);

  const handleAuth = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userPassword", password);
      route.push("screen/contract/Contract");
    } catch (error) {
      alert("Bilgilerinizi kontrol edin lütfen");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const btnTitle = "Giriş Yap";

  return (
    <SafeAreaView>
      <View>
        <View className="justify-center items-center h-loginTittleH p-16 gap-4">
          <Text
            style={{ fontFamily: "PopBold" }}
            className="text-customPink text-xl"
          >
            Log in to HabitHUB
          </Text>
          <Text
            style={{ fontFamily: "PopLight" }}
            className="justify-center text-center"
          >
            Welcome back! Sign in using your social account or email to continue
          </Text>
        </View>
        <View className="justify-center -top-10">
          <View className="flex-row justify-center gap-10">
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
        </View>

        <KeyboardAvoidingView behavior="padding">
          <View className="h-loginInputH justify-center items-center gap-8">
            <View className="h-16 w-96 bg-customBgWhite rounded-lg justify-center p-4">
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
            <View className="h-16 w-96 bg-customBgWhite rounded-lg justify-center p-4">
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
            <View>
              <SignInBtn
                onPress={handleAuth}
                loading={loading}
                title={btnTitle}
              />
            </View>
            <View>
              <Text
                style={{ fontFamily: "PopLight" }}
                className="text-lg"
                onPress={() => route.push("screen/signUp/SignUp")}
              >
                Don't have an account?{" "}
                <Text
                  style={{
                    textDecorationLine: "underline",
                  }}
                >
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
