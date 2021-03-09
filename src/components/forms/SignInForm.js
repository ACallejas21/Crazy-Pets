import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { validate } from "email-validator";
import {firebase} from "../../firebase";
import Alert from "../shared/alert";
import "firebase/auth"

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
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("usuarios");

        // Verificar que el usuario existe en Firebase authentication
        // y también está almacenado en la colección de usuarios.
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              setError("User does not exist in the database!");
              return;
            }

            // Obtener la información del usuario y enviarla a la pantalla Home
            const user = firestoreDocument.data();

            navigation.navigate("Home", { user });
          });

      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      }); 
          
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
    navigation.navigate("Home");

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
  const provider = new firebase.auth.GoogleAuthProvider()

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
        secureTextEntry={true}
        onBlur={() => {
          handleVerify("password");
        }}
        errorMessage={passwordError ? "Por favor ingresa tu contraseña" : null}
      />
      <Button title="Iniciar Sesión" onPress={handleSignin} />

      <Button title="Google" onPress={handlerSingupwithgoogle} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SigninForm;