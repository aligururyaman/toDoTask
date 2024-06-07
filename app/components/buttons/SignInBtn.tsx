import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface SignInBtnProps {
  onPress: () => void;
  loading: boolean;
  title: string;
}

const SignInBtn: React.FC<SignInBtnProps> = ({ onPress, loading, title }) => {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

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

export default SignInBtn;
