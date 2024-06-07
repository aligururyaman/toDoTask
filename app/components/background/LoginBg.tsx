import React, { useEffect, useRef } from "react";
import { Animated, SafeAreaView, StyleSheet } from "react-native";

const LoginBg = () => {
  const numberOfLines = 20;
  const animatedValues = useRef(
    Array.from({ length: numberOfLines }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animations = animatedValues.map((animatedValue, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 2000,
            delay: index * 50,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start()
    );
  }, [animatedValues]);

  return (
    <SafeAreaView style={styles.container} className="top-52">
      {animatedValues.map((animatedValue, index) => {
        const translateY = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -50], // Dikey hareket
        });
        const translateX = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [300, 0], // Sağdan sola yatay hareket
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.line,
              {
                transform: [{ translateY }, { translateX }],
              },
              { marginBottom: 10 }, // Aralarındaki boşlukları ayarlamak için marginBottom kullanıyoruz
            ]}
            className={"bg-customPinkTwo"}
          />
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
  },
  line: {
    width: 500,
    height: 2,
    marginVertical: 5,
  },
});

export default LoginBg;
