import React from "react";
import {Dimensions, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import SigninForm from "../forms/SignInForm";
import theme from "../../theme/index";
import Alert from "../shared/alert";
import Logo from "../shared/logo";

const { width, height } = Dimensions.get("screen");

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Logo/>
      <SigninForm navigation={navigation} />
      <TouchableOpacity onPress={() => navigation.navigate("passwordRecovery")}>
        <Text style={styles.forgotPassword}>Recuperación de contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.signUp}>Registrate</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
    backgroundColor: theme.colors.backgroundWhite,
  },
  forgotPassword: {
    textAlign: "center",
    marginTop: width*0.02,
    fontSize: 15,
   
  },
  signUp: {
    textAlign: "center",
    marginTop: width*0.04,
    fontSize: 15,
  
  },

});

export default Login;