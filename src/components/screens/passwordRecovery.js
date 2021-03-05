import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { validate } from "email-validator";
import {firebase} from "../../firebase";
import Alert from "../shared/alert";
import "@firebase/auth";


const { width, height } = Dimensions.get("screen");

const PasswordRecovery = () => {
  const [password, setPassword] = useState("");

  const handlePasswordRecovery = () => {
   firebase.auth().sendPasswordResetEmail(password).then(function() {
    console.log("ENviado")
  }).catch(function(error) {
    console.log("error")
  });
  }

  return (
    <View>
    <Input
    placeholder="Contraseña"
    leftIcon={<Icon name="lock" />}
    value={password}
    onChangeText={setPassword}
    />
  <Button title="Iniciar Sesión" onPress={handlePasswordRecovery} />
  </View>
  );
};

const styles = StyleSheet.create({});

export default PasswordRecovery;