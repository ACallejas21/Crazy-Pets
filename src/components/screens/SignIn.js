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

const Login = () => {
  return (
    <View style={styles.container}>
      <Logo />
      <SigninForm />
        <Text style={styles.forgotPassword}>Recuperación de contraseña</Text>
            <Text style={styles.signUp}>Registrate</Text>
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
    textAlign: "center",
    padding: 5,
  },
  signUp: {
    textAlign: "center",
    padding: 50,
  },
});

export default Login;