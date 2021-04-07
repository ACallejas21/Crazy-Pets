import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { validate } from "email-validator";
import {firebase} from "../../firebase";
import Alert from "../shared/alert";
import { Context as AuthContext } from "../../providers/AuthContext";
//import "firebase/auth";


const { width, height } = Dimensions.get("screen");

const SigninForm = ({navigation}) => {
  const { state, signin, clearErrorMessage, signingoogle } = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (state.errorMessage) clearErrorMessage();
  }, []);

  useEffect(() => {
    if (state.errorMessage) setError(state.errorMessage);
  }, [state.errorMessage]);



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
      // Iniciar sesión implementado el Contexto de autenticación
    signin(email, password);
          
  };

  const handlerSingupwithgoogle = () => {
    firebase
      // Iniciar sesión implementado el Contexto de autenticación
      signingoogle();
   
  }
 

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
      <Text style={styles.signUpGoogle}>Ó</Text>
      <Button title="Google" onPress={handlerSingupwithgoogle} />
    </View>
  );
};

const styles = StyleSheet.create({
  signUpGoogle: {
    textAlign: "center",
    marginTop: width*0.04,
    marginBottom: width*0.04,
    fontSize: 15,
  
  },
});

export default SigninForm;