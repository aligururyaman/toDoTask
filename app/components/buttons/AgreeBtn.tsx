import Loading from "@/screen/loading/Loading";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function LoginBtn() {
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const handleAgree = () => {
    setLoading(true);
    setTimeout(() => {
      route.push("screen/main/Main");
    }, 2000);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => route.push("screen/main/Main")}
    >
      <Text style={styles.buttonText}>I Agree</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 160,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 22,
    fontFamily: "PopMed",
    color: "#000",
  },
});
