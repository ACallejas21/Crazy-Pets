import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { validate } from "email-validator";
import {firebase} from "../../firebase";
import Alert from "../shared/alert";
import "@firebase/auth";


const { width, height } = Dimensions.get("screen");

const PasswordRecoveryForm = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // Verifica que se ingresan los datos del email y el password
  const handleVerify = (input) => {
    if (input === "email") {
      if (!email) setEmailError(true);
      else if (!validate(email)) setEmailError(true);
      else setEmailError(false);
     }
   };

  const handleEmailRecovery = () => {
   firebase
   .auth()
   .sendPasswordResetEmail(email)
   .then(() => {
    navigation.navigate("Signin");
    })
    .catch(function(error) {
      setError(error.message);
    });
  }

  return (
    <View>
      <Text style={styles.title}>Introduce tu correo para enviar el codigo de verificación</Text>
        {error ? <Alert title={error} type="error" /> : null}
        <Input
        placeholder="Correo"
        leftIcon={<Icon name="envelope"/>}
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
    <Button title="Enviar Correo" onPress={handleEmailRecovery} />
</View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,

  }
});

export default PasswordRecoveryForm;