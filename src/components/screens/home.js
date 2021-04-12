import React, {useEffect,useContext, useState} from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View, 
  TouchableOpacity} from "react-native";
import { Avatar, ListItem, Header, Icon } from 'react-native-elements';
import {firebase} from "../../firebase";
import PetList from "../shared/petList";
import Comment from "../shared/comment";
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
    <TouchableOpacity style={styles.boton} onPress={() => {
             navigation.navigate("addPets")
            }} >
            <Icon name="add"/>
    </TouchableOpacity>
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
  boton:{
    position: "absolute",
    right: 0,
    margin: 20,
    top: height * 0.75,
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    backgroundColor:'#4CAF50',
    borderRadius:50,

  }
  
});

export default Home;