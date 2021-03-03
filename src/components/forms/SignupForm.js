import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { firebase } from "../../firebase";

const SignupForm = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View>
        <Text h3>Crea tu cuenta ahora</Text>
      <Input
        placeholder="usuario"
        leftIcon={<Icon name="user" />}
        value={user}
        onChangeText={setUser}
      />
      <Input
        placeholder="Correo Electrónico"
        leftIcon={<Icon name="envelope" />}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Contraseña"
        leftIcon={<Icon name="lock" />}
        value={password}
        onChangeText={setPassword}
      />
      <Input
        placeholder="confirme su contraseña"
        leftIcon={<Icon name="lock" />}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Create account" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SignupForm;