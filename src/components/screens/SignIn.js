import React from "react";
import { Dimensions,  StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Logo from "../shared/logo";
import SigninForm from "../forms/SignInForm";
import theme from "../../theme/index";
import Alert from "../shared/alert";

const { width, height } = Dimensions.get("screen");

const Login = ({ navigation, route }) => {
  const { userCreated } = route.params;
  return (
    <View style={styles.container}>
      <Logo />
      {userCreated ? (
        <Alert type="success" title="User created! You can now sign in!" />
      ) : null}
      <SigninForm />
      <TouchableOpacity onPress={() => navigation.navigate("PasswordRecovery")}>
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
   
  },
  signUp: {
    textAlign: "center",
  
  },

});

export default Login;