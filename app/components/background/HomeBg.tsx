import { BlurView } from "expo-blur";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function HomeBg() {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  });

  return (
    <View>
      <Animated.View
        className="bg-customBlue w-72 h-[45rem] absolute rounded-full rotate-12 -left-12 z-1 -top-14"
        style={{ transform: [{ translateX }] }}
      ></Animated.View>
      <Animated.View
        className="bg-customPink w-[30rem] h-[40rem] absolute rounded-full -right-40 top-30 rotate-45"
        style={{ transform: [{ translateX }] }}
      ></Animated.View>
      <Animated.View
        className="bg-customPinkTwo w-64 h-64 absolute rounded-full -right-12 -top-12"
        style={{ transform: [{ translateX }] }}
      ></Animated.View>
      <Animated.View
        className="bg-customWhite w-[40rem] h-[27rem] absolute rounded-full -right-40 top-[40rem] rotate-45"
        style={{ transform: [{ translateX }] }}
      ></Animated.View>
      <BlurView
        intensity={70}
        experimentalBlurMethod="dimezisBlurView"
        tint="light"
        style={styles.blurView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  blurView: {
    position: "absolute",
    width: 600,
    height: 1600,
    top: -50,
  },
});
