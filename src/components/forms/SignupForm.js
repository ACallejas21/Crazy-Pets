import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Text,SocialIcon } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { firebase } from "../../firebase";
import { validate } from "email-validator";
import "firebase/auth"

const SignupForm = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userError, setUserError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const provider = new firebase.auth.GoogleAuthProvider()

   // Verifica que los datos ingresados sean correctos
   const handleVerify = (input) => {
    if (input === "user") {
      // Verificar el nombre del usuario
      if (!user) setUserError(true);
      else setUserError(false);
    } else if (input === "email") {
      // Verificar el correo electrónico
      if (!email) setEmailError(true);
      else if (!validate(email)) setEmailError(true);
      else setEmailError(false);
    } else if (input === "password") {
      // Verificar la contraseña
      if (!password) setPasswordError(true);
      else if (password.length < 6) setPasswordError(true);
      else setPasswordError(false);
    } else if (input === "confirmPassword") {
      // Verificar la confirmación de la contraseña
      if (!confirmPassword) setConfirmPasswordError(true);
      else if (confirmPassword !== password) setConfirmPasswordError(true);
      else setConfirmPasswordError(false);
    }
  };

  const handleSignup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  const handlerSingupwithgoogle = () => {
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    navigator.navigate("Home")
    console.log("bien");
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    console.log(errorCode);
    console.log(errorMessage);
    console.log(email);
    console.log(credential);
  });
  }

  return (
    <View>
        <Text h5>Crea tu cuenta ahora</Text>
      <Input
        placeholder="usuario"
        leftIcon={<Icon name="user" />}
        value={user}
        onChangeText={setUser}
        onBlur={() => {
          handleVerify("user");
        }}
        errorMessage={
          userError ? "Por favor ingresa tu nombre de usuario" : ""
        }
      />
      <Input
        placeholder="Correo Electrónico"
        leftIcon={<Icon name="envelope" />}
        value={email}
        onChangeText={setEmail}
        onBlur={() => {
          handleVerify("email");
        }}
        errorMessage={
          emailError ? "Por favor ingresa tu Correo" : ""
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
        errorMessage={
          passwordError ? "Por favor ingresa tu contraseña" : ""
        }
      />
      <Input
        placeholder="confirme su contraseña"
        leftIcon={<Icon name="lock" />}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        onBlur={() => {
          handleVerify("confirmPassword");
        }}
        errorMessage={
          confirmPasswordError ? "Por favor confirme su contraseña" : ""
        }
      />
      <Button title="Crear Cuenta" onPress={handleSignup} />
      <Text>Ó</Text>
      <SocialIcon type='google' button title='Google' onPress={handlerSingupwithgoogle}></SocialIcon>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SignupForm;