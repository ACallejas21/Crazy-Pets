import React, { useContext,useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity} from "react-native";
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

const DetailsPets = ({navigation}) => {
  const {  state: petsState, deletePet } = useContext(PetsContext);
  const { state, clearErrorMessage} = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [raza, setRaza] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [notas, setNotas] = useState("");

    useEffect(() => {
        if (petsState.currentPet.id) {
            setNombre(petsState.currentPet.nombre); 
            setEdad(petsState.currentPet.edad);
            setRaza(petsState.currentPet.raza);
            setDescripcion(petsState.currentPet.descripcion);
            setNotas(petsState.currentPet.notas);
        }
      }, [petsState.currentPet]);
      console.log(petsState.currentPet)
    
 return (
    <View style={styles.container}>
        <Logo/>
      <Text>Nombre</Text>
      <Input
        placeholder="Nombre"
        leftIcon={<FontAwesome5 name="dog" size={24} color="black" />}
        value={nombre}
        onChangeText={setNombre}
        disabled
      />


      <Text>Edad</Text>
      <Input
        placeholder="Edad"
        leftIcon={<Fontisto name="date" size={24} color="black" />}
        value={edad}
        onChangeText={setEdad}
        disabled
      />

      <Text>Raza</Text>
      <Input
        placeholder="Raza"
        leftIcon={<Entypo name="heart" size={24} color="black" />}
        value={raza}
        onChangeText={setRaza}
        disabled
      />

      <Text>Descripción</Text>
      <Input
        placeholder="Descripción"
        leftIcon={<Feather name="align-justify" size={24} color="black" />}
        value={descripcion}
        onChangeText={setDescripcion}
        disabled
      />

      <Text>Notas</Text>
      <Input
        placeholder="Notas"
        leftIcon={<Entypo name="new-message" size={24} color="black" />}
        value={notas}
        onChangeText={setNotas}
        disabled

      /> 
          <TouchableOpacity style={styles.boton} onPress={() => {
                navigation.navigate("editPet")
                }} >
                <Icon style={styles.icon} name="edit"/>
          </TouchableOpacity>
        <TouchableOpacity style={styles.botondelete} onPress={() => {
                deletePet(petsState.currentPet.id);  
                navigation.navigate("Home")

                }} >
                <Icon style={styles.icon} name="trash"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonback} onPress={() => {  
                navigation.navigate("Home")

                }} >
                <Icon style={styles.icon} name="arrow-left"/>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
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
      right: 0,
      margin: 20,
      top: height * 0.68,
      alignItems:'center',
      justifyContent:'center',
      width:50,
      height:50,
      backgroundColor:'#4CAF50',
      borderRadius:50,
  
    },
    botonback:{
      flex:1,
      position: "absolute",
      right: 0,
      margin: 20,
      top: height * 0.80,
      alignItems:'center',
      justifyContent:'center',
      width:50,
      height:50,
      backgroundColor:'red',
      borderRadius:50,
  
    },

    botondelete:{
      flex:1,
      position: "absolute",
      right: 0,
      margin: 20,
      top: height * 0.74,
      alignItems:'center',
      justifyContent:'center',
      width:50,
      height:50,
      backgroundColor:'red',
      borderRadius:50,
  
    },
    icon:{
      fontSize: 20,
    }
});
export default DetailsPets;