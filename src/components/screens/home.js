import React, {useState} from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View, 
  Image, 
  Button} from "react-native";
import { Avatar, ListItem, Header, Icon } from 'react-native-elements'
import {firebase} from "../../firebase"

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
      <Text>Crazy Pets</Text>
   </Header>
      <ListItem>
  <Avatar
    title={"Hola"}
    source={{ uri: ("../../../assets/logo.png") }}
  />
  <ListItem.Content>
    <ListItem.Title>{"Hola"}</ListItem.Title>
  </ListItem.Content>
  <ListItem.Chevron/>
  </ListItem>
  <Button title="Cerrar Sesión" onPress={handleSignin} />
    </View>
  );
};

const styles = StyleSheet.create({
  conteiner:{
    flex: 1,
    padding: 15,
    marginTop: width*0.5,
  },
  
});

export default Home;