import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Loading() {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = () => {
      rotateValue.setValue(0);
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => rotateAnimation());
    };

    rotateAnimation();
  }, [rotateValue]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView>
      <View className="h-full w-full justify-center items-center">
        <View className="items-center justify-center">
          <Animated.Image
            source={require("../../utils/images/loadingimg.png")}
            style={{ transform: [{ rotate }] }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
