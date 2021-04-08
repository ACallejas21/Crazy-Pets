import React, { useContext,useEffect, useState } from "react";
import { StyleSheet, View, Dimensions} from "react-native";
import { Input, Button, Text,SocialIcon } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Logo from "../shared/logo"
import Alert from "../shared/alert";
import { Context as AuthContext } from "../../providers/AuthContext";
import { Context as PetsContext } from "../../providers/PetsContext";


const { width, height } = Dimensions.get("screen");

const PetForm = ({navigation}) => {
  const { createPet } = useContext(PetsContext);
  const { state, clearErrorMessage} = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [raza, setRaza] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [notas, setNotas] = useState("");

  const [nombreError, setNombreError] = useState(false);
  const [edadError, setEdadError] = useState(false);
  const [razaError, setRazaError] = useState(false);
  const [descripcionError, setDescripcionError] = useState(false);
  const [notasError, setNotasError] = useState(false);


  const [error, setError] = useState("");

  useEffect(() => {
    if (state.errorMessage) clearErrorMessage();
  }, []);

  useEffect(() => {
    if (state.errorMessage) setError(state.errorMessage);
  }, [state.errorMessage]);


    // Verifica que se ingresan los datos del email y el password
    const handleVerify = (input) => {
      if (input === "nombre") {
        if (!nombre) setNombreError(true);
        else setNombreError(false);
      } else if (input === "edad") {
        if (!edad) setEdadError(true);
        else setEdadError(false);
      }else if (input === "raza") {
        if (!raza) setRazaError(true);
        else setRazaError(false);
      }else if (input === "descripcion") {
        if (!descripcion) setDescripcionError(true);
        else setDescripcionError(false);
      }
    };
    const handleSavePet = () => {
      if (!nombre) {
        setNombre("nueva mascota");
        createPet("nueva mascota", edad, raza, descripcion , notas, state.user.id);
      } else createPet(nombre, edad, raza, descripcion , notas, state.user.id);
  
      navigation.navigate("Home");
    };

 return (
    <View>
        <Logo/>
        <Text style={styles.text} h5>Ingresa tu mascota!</Text>
        {error ? <Alert title={error} type="error" /> : null}
      <Input
        placeholder="Nombre"
        leftIcon={<FontAwesome5 name="dog" size={24} color="black" />}
        value={nombre}
        onChangeText={setNombre}
        onBlur={() => {
          handleVerify("nombre");
        }}
        errorMessage={
          nombreError
            ? "Por favor ingresa el nombre de tu mascota"
            : null
        }
      />
      <Input
        placeholder="Edad"
        leftIcon={<Fontisto name="date" size={24} color="black" />}
        value={edad}
        onChangeText={setEdad}
        onBlur={() => {
          handleVerify("edad");
        }}
        errorMessage={
          edadError
            ? "Por favor ingresa la edad de tu mascota"
            : null
        }
      />
      <Input
        placeholder="Raza"
        leftIcon={<Entypo name="heart" size={24} color="black" />}
        value={raza}
        onChangeText={setRaza}
        onBlur={() => {
          handleVerify("raza");
        }}
        errorMessage={
          razaError
            ? "Por favor ingresa la raza de tu mascota"
            : null
        }

      />
      <Input
        placeholder="Descripción"
        leftIcon={<Feather name="align-justify" size={24} color="black" />}
        value={descripcion}
        onChangeText={setDescripcion}
        onBlur={() => {
          handleVerify("descripcion");
        }}
        errorMessage={
          descripcionError
            ? "Por favor ingresa una descripción de tu mascota"
            : null
        }
      />
      <Input
        placeholder="Notas"
        leftIcon={<Entypo name="new-message" size={24} color="black" />}
        value={notas}
        onChangeText={setNotas}

      />
          <Button title="agregar mascota"  onPress={() => {
            handleSavePet();
          }} />
    </View>
  );
};

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
        marginTop: 30,
        fontSize: 15,
      },
    button:{
        padding:15
    }
});

export default PetForm;