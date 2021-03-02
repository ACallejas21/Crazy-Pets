import React, { useState } from "react";
import { StyleSheet, 
        View } from "react-native";
import { Input, 
        Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  return (
    <View>
      <Input
        placeholder="Usuario"
        leftIcon={<Icon name="envelope" />}
        value={email}
        onChange={setEmail}
      />
      <Input
        placeholder="Contraseña"
        leftIcon={<Icon name="lock" />}
        value={password}
        onChange={setPassword}
      />
      <Button title="Inicio Sesión" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SigninForm;