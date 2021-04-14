import React, {useEffect,useContext, useState} from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View, 
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Avatar, ListItem, Icon } from 'react-native-elements';
import {firebase} from "../../firebase";
import PetList from "../shared/petList";
import PetsCard from "../shared/card";
import { Context as AuthContext } from "../../providers/AuthContext";
import { Context as PetsContext } from "../../providers/PetsContext";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

const Home = ({navigation}) => {
  const { state, signout } = useContext(AuthContext);
  const { state: petsState, getPets} = useContext(PetsContext);
  useEffect(() => {
    getPets(state.user.id);
  }, []);

  return (
    <>
    <ScrollView styles={styles.conteiner}>
      <PetList pets={petsState.pets} navigation={navigation} />

    </ScrollView>
    <TouchableOpacity style={styles.boton} onPress={() => {
             navigation.navigate("addPets")
            }} >
            <Icon name="add"/>
    </TouchableOpacity>
    </>
  );
};


const styles = StyleSheet.create({
  conteiner:{
    flex: 1,
    padding: 15,
  },
  header:{
    color: "#fff",
  },
  boton:{
    position: "absolute",
    right: 0,
    margin: 20,
    top: height * 0.65,
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    backgroundColor:'#4CAF50',
    borderRadius:50,

  }
  
});

export default Home;