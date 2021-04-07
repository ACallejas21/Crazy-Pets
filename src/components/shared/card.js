import React from "react";
import { StyleSheet, View, Text, Dimensions, Button } from "react-native";
import {Card, Image} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get("screen");

const PetsCard = ({Titulo, descripcion}) => {
  return (
    <View style={styles.container}>
        <View style={styles.card}>
            <View style={{flex: 0.4 }}>
                <Image style={styles.logo}
                source={ require("../../../assets/logo.png")}/>
            </View>
            <View style={{ flex: 0.6 }}>
                <Text style={styles.nombre}>{Titulo}</Text>
                <Text style={styles.descrip}>{descripcion}
                </Text>
                <Icon style={styles.icon} name="arrow-right"></Icon>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  logo: {
    width: width * 0.27,
    height: height * 0.155,
    resizeMode: "contain",
    marginLeft:3,
  },
  titulo: {
      textAlign: "center",
      fontSize: 30,

  },
  card:{
        flexDirection: "row",
        height: height*0.19,
        width: width*0.91,
        marginRight: width * 0.02,
        backgroundColor: "#fff",
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 15,
  },
  nombre:{
      fontSize: 18,
      textAlign: "center",
  },
  icon:{
    fontSize: 24,
    color:"black",
    textAlign: "right",
    marginRight: 5,
  }
  ,
  descrip:{
    maxHeight:30
  }
});

export default PetsCard;