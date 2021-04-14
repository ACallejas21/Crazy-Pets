import React from "react";
import { StyleSheet, View, Text, Dimensions, Button } from "react-native";
import {Card, Image} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get("screen");

const comment = ({usuario, comentario}) => {
  return (
    <View style={styles.container}>
        <View style={styles.card}>
            <Text style={styles.usuario} >{usuario}</Text>
            <Text style={styles.comentario} >{comentario}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  usuario: {
      textAlign: "left",
      fontSize: 15,
      marginTop:5,
      marginLeft: 25,
  },
  comentario: {
    fontSize: 20,
    marginTop:30,
},
card:{
    flexDirection: "row",
    height: height*0.19,
    width: width*0.78,
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 15,
},



});

export default comment;