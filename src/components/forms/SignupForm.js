import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Text,SocialIcon } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { firebase } from "../../firebase";
import { validate } from "email-validator";
import "firebase/auth"

const SignupForm = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userError, setUserError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [error, setError] = useState("");

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
        // Obtener el Unique Identifier generado para cada usuario
        // Firebase -> Authentication
        const uid = response.user.uid;

        // Construir el objeto que le enviaremos a la collección de "users"
        const data = {
          id: uid,
          email,
          user
        };

        // Obtener la colección desde Firebase
        const usersRef = firebase.firestore().collection("usuarios");

        // Almacenar la información del usuario que se registra en Firestore
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            console.log("hola");
            navigation.navigate("Signin");
          })
          .catch((error) => {
            console.log(error);
            setError(error.message);
          });
      })
      .catch((error) => setError(error.message));
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
    // ...
    const uid = result.user.uid;
    const email = result.user.email;
    const user = result.user.displayName;

  
    const data = {
      id: uid,
      email : email,
      user : user
    };

    // Obtener la colección desde Firebase
    const usersRef = firebase.firestore().collection("usuarios");

    // Almacenar la información del usuario que se registra en Firestore
    usersRef
      .doc(uid)
      .set(data)
      .then(() => {
        console.log("hola");
        navigation.navigate("Home");
      })
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
        secureTextEntry={true}
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
        secureTextEntry={true}
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