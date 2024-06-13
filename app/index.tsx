import { useFonts } from "expo-font";
import { SplashScreen, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HomeBg from "./components/background/HomeBg";
import LoginBtn from "./components/buttons/LoginBtn";
import Or from "./components/or/Or";

export default function Opening() {
  const router = useRouter();

  const [loaded, error] = useFonts({
    PopRegular: require("../app/utils/fonts/Poppins-Regular.ttf"),
    PopBold: require("../app/utils/fonts/Poppins-Bold.ttf"),
    PopLight: require("../app/utils/fonts/Poppins-Light.ttf"),
    PopExLight: require("../app/utils/fonts/Poppins-ExtraLight.ttf"),
    PopBlack: require("../app/utils/fonts/Poppins-Black.ttf"),
    PopMed: require("../app/utils/fonts/Poppins-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView>
      <HomeBg />
      <View className="w-indexTextW h-indexMainH justify-center p-2 left-8">
        <Text className="text-textMain" style={{ fontFamily: "PopRegular" }}>
          Do your tasks quickly and easy
        </Text>
        <Text className="text-lg" style={{ fontFamily: "PopExLight" }}>
          Your tasks, your rules, our support.
        </Text>
      </View>
      <View className="justify-center items-center gap-1">
        <LoginBtn />
        <TouchableOpacity onPress={() => router.push("screen/signUp/SignUp")}>
          <Text
            style={{
              fontFamily: "PopLight",
              textDecorationLine: "underline",
            }}
          >
            Create an account
          </Text>
        </TouchableOpacity>
        <Or />
        <View className="top-10 flex-row gap-10">
          <TouchableOpacity>
            <View>
              <Image source={require("./utils/images/facebook.png")} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <Image source={require("./utils/images/gmail.png")} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <Image source={require("./utils/images/apple.png")} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
