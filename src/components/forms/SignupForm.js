import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Dimensions} from "react-native";
import { Input, Button, Text,SocialIcon } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { firebase } from "../../firebase";
import { validate } from "email-validator";
import { Context as AuthContext } from "../../providers/AuthContext";
import "firebase/auth"

const { width, height } = Dimensions.get("screen");

const SignupForm = ({ navigation }) => {
  const { state, signup, signupgoogle } = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userError, setUserError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    if (state.errorMessage) clearErrorMessage();
  }, []);

  useEffect(() => {
    if (state.errorMessage) setError(state.errorMessage);
  }, [state.errorMessage]);

  useEffect(() => {
    if (state.registered) navigation.navigate("Home");
  }, [state]);
  

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
    } else if (input === "signup") {
      if (
        !userError &&
        !emailError &&
        !passwordError &&
        !confirmPasswordError &&
        user &&
        email &&
        password &&
        confirmPassword
      )
        signup(user, email, password);
      else setError("All fields are required!");
    }
  };

  const handlerSingup = () => {
    firebase
      // Iniciar sesión implementado el Contexto de autenticación
    signup(user, email, password);
   
  }


  const handlerSingupwithgoogle = () => {
    firebase
      // Iniciar sesión implementado el Contexto de autenticación
    signupgoogle();
   
  }

  return (
    <View>
        <Text style={styles.text} h5>Crea tu cuenta ahora</Text>
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
      <Button title="Crear Cuenta" onPress={handlerSingup} />
      <Text style={styles.text}>Ó</Text>
      <Button title='Google' onPress={handlerSingupwithgoogle}/>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginTop: width*0.04,
    fontSize: 15,
    marginBottom: width*0.04

  },
});

export default SignupForm;