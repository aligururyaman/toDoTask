import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Or() {
  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <View style={styles.line} className="bg-gray-600" />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} className="bg-gray-600" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    top: 20,
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
  },
  line: {
    flex: 1,
    height: 0.5,
  },
  orText: {
    marginHorizontal: 20,
    fontSize: 18,
    fontFamily: "PopBlack",
  },
});
