import React, { useState } from "react";
import { StyleSheet, View, Dimensions} from "react-native";
import { Input, Button, Text,SocialIcon } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Logo from "../shared/logo"


const { width, height } = Dimensions.get("screen");

const Tips = () => {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [raza, setRaza] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [notas, setNotas] = useState("");

 return (
    <View>
        <Logo/>
        <Text style={styles.text} h5>Ingresa tu mascota!</Text>
      <Input
        placeholder="Nombre"
        leftIcon={<FontAwesome5 name="dog" size={24} color="black" />}
        value={nombre}
        onChangeText={setNombre}

      />
      <Input
        placeholder="Edad"
        leftIcon={<Fontisto name="date" size={24} color="black" />}
        value={edad}
        onChangeText={setEdad}
      />
      <Input
        placeholder="Raza"
        leftIcon={<Entypo name="heart" size={24} color="black" />}
        value={raza}
        onChangeText={setRaza}

      />
      <Input
        placeholder="Descripción"
        leftIcon={<Feather name="align-justify" size={24} color="black" />}
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <Input
        placeholder="Notas"
        leftIcon={<Entypo name="new-message" size={24} color="black" />}
        value={notas}
        onChangeText={setNotas}

      />
      <Button title="Crear Cuenta"  />
      <Text style={styles.text}>Ó</Text>
      <Button title='Google' />
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

export default Tips;