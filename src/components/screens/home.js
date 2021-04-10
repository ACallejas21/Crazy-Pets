import React, {useEffect,useContext, useState} from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View, 
  Image, 
  Button} from "react-native";
import { Avatar, ListItem, Header, Icon } from 'react-native-elements';
import {firebase} from "../../firebase";
import PetList from "../shared/petList";
import { Context as AuthContext } from "../../providers/AuthContext";
import { Context as PetsContext } from "../../providers/PetsContext";

const { width, height } = Dimensions.get("screen");

const Home = ({navigation}) => {
  const { state, signout } = useContext(AuthContext);
  const { state: petsState, getPets} = useContext(PetsContext);
  useEffect(() => {
    getPets(state.user.id);
  }, []);

  return (
    <View styles={styles.conteiner}>
      <Header>
        <Text style={styles.header}>Crazy Pets</Text>
    </Header>
    <PetList pets={petsState.pets} navigation={navigation} />
    <Button title="cerrar sesión"  onPress={() => {
              signout();
            }} />
    <Button title="agregar mascota"  onPress={() => {
             navigation.navigate("addPets")
            }} />
    </View>
    
  );
};


const styles = StyleSheet.create({
  conteiner:{
    flex: 1,
    padding: 15,
    marginTop: width*0.5,
  },
  header:{
    color: "#fff",
  },
  
});

export default Home;