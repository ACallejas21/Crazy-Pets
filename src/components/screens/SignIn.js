import React from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text } from "react-native";
import { Input, Button } from "react-native-elements";
import Logo from "../shared/logo";
import SigninForm from "../forms/SignInForm";

const { width, height } = Dimensions.get("screen");

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Logo />
      <SigninForm />
        <Text style={styles.forgotPassword}>Recuperacion</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text>Registrate</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  forgotPassword: {
    textAlign: "right",
  },
});

export default Login;