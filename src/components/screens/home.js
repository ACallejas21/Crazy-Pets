import React, {useState} from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View, 
  Image, 
  Button} from "react-native";
import { Avatar, ListItem, Header, Icon } from 'react-native-elements';
import {firebase} from "../../firebase";
import CardPets from "../forms/card";

const { width, height } = Dimensions.get("screen");

const Home = ({navigation}) => {

  const [error, setError] = useState(false);


  const handleSignin = () => {
    firebase.auth().signOut().then(() => {
      navigation.navigate("Signin");
      console.log("Cerro Sesion");
    }).catch((error) => {
      console.log("Error");
    });
          
  };
  return (
    <View styles={styles.conteiner}>
      <Header>
        <Text style={styles.header}>Crazy Pets</Text>
    </Header>
   <CardPets/>
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