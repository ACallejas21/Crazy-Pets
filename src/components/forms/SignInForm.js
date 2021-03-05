import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { validate } from "email-validator";
import {firebase} from "../../firebase";
import Alert from "../shared/alert";

const SigninForm = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Verifica que se ingresan los datos del email y el password
  const handleVerify = (input) => {
    if (input === "email") {
      if (!email) setEmailError(true);
      else if (!validate(email)) setEmailError(true);
      else setEmailError(false);
    } else if (input === "password") {
      if (!password) setPasswordError(true);
      else setPasswordError(false);
    }
  };

  const handleSignin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => { 
      
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      }); 
          
  };

  return (
    <View>
      {error ? <Alert title={error} type="error" /> : null}
      <Input
        placeholder="Correo"
        leftIcon={<Icon name="envelope" />}
        value={email}
        onChangeText={setEmail}
        onBlur={() => {
          handleVerify("email");
        }}
        errorMessage={
          emailError
            ? "Por favor ingresa tu cuenta de correo electrónico"
            : null
        }
      />
      <Input
        placeholder="Contraseña"
        leftIcon={<Icon name="lock" />}
        value={password}
        onChangeText={setPassword}
        onBlur={() => {
          handleVerify("password");
        }}
        errorMessage={passwordError ? "Por favor ingresa tu contraseña" : null}
      />
      <Button title="Iniciar Sesión" onPress={handleSignin} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttom:{
    borderRadius: 45,
  },
});

export default SigninForm;