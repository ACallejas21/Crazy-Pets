import React, {useContext} from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import Logo from "../shared/logo";
import {Text, Button} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import {firebase} from "../../firebase";
import {Context as AuthContext} from "../../providers/AuthContext";



const { width, height } = Dimensions.get("screen");

const Profile = ({navigation}) => {

  const { state, signout } = useContext(AuthContext);






  return (
    <View style={styles.container}>
        <Logo/>
        <Text h4 style={styles.text}>Usuario</Text>
        <Text h5 style={styles.text}>{state.user.user}</Text>
        <Text h4 style={styles.text}>Correo</Text>
        <Text h5 style={styles.text}>{state.user.email}</Text>
    </View>

  );
};

const styles = StyleSheet.create({
  icon:{
    fontSize: 20,
  },
    text: {
        textAlign: "center",
        marginTop: 30,
        fontSize: 15,
      },
    button:{
        padding:15
    },
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
    },
    boton:{
      flex:1,
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
  
    },
});

export default Profile;