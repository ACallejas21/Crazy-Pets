import React, { useContext,useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity, ScrollView} from "react-native";
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
import { NavigationHelpersContext } from "@react-navigation/core";


const { width, height } = Dimensions.get("screen");

const EditPet = ({navigation}) => {
  const {  state: petsState, updatePet } = useContext(PetsContext);
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

    useEffect(() => {
        if (petsState.currentPet.id) {
            setNombre(petsState.currentPet.nombre);
            setEdad(petsState.currentPet.edad);
            setRaza(petsState.currentPet.raza);
            setDescripcion(petsState.currentPet.descripcion);
            setNotas(petsState.currentPet.notas);
        }
      }, [petsState.currentPet]);
    
      const handleSavePet = () => {
        updatePet(
            petsState.currentPet.id,
            nombre,
            edad,
            raza,
            descripcion,
            notas
        );

        navigation.navigate("Home");
      };

 return (
    <ScrollView style={styles.container}>
        <Logo/>
        <Text style={styles.text} h5>Ingresa tu mascota!</Text>
        {/* {error ? <Alert title={error} type="error" /> : null} */}
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

      <TouchableOpacity style={styles.boton} onPress={() => {
            handleSavePet();
            }} >
            <Icon style={styles.icon} name="save"/>
    </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
    text: {
        textAlign: "center",
        marginTop: 30,
        fontSize: 15,
      },
    button:{
        padding:15
    },
    boton:{
      flex:1,
      position: "absolute",
      right: width*0.04,
      top: height * 0.75,
      alignItems:'center',
      justifyContent:'center',
      width:50,
      height:50,
      backgroundColor:'#4CAF50',
      borderRadius:50,
  
    },
    icon:{
      fontSize: 20,
    }
});

export default EditPet;