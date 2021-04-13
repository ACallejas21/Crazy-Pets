import React, { useState,useContext, useEffect } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity, TextInput} from "react-native";
import { Input, Button, Text,SocialIcon } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Logo from "../shared/logo"
import CommentList from "../shared/commentList";
import { Context as AuthContext } from "../../providers/AuthContext";
import { Context as TipsContext } from "../../providers/TipsContext";


const { width, height } = Dimensions.get("screen");

const Tips = ({navigation}) => {
  const { state } = useContext(AuthContext);
  const { state: tipsState, getTips, createTip,deleteTip} = useContext(TipsContext);
  useEffect(() => {
    getTips();
  }, []);
  const [comentario, setComentario] = useState("");
  console.log(tipsState.currentTip);

 return (
    <View style={styles.container}>
        <Logo/>
        <Text >Tips</Text>
      <Input
        placeholder="Comentario"
        leftIcon={<FontAwesome5 name="dog" size={24} color="black" />}
        value={comentario}
        onChangeText={setComentario}

      />
       <TouchableOpacity style={styles.boton} onPress={() => {
                 createTip(comentario, state.user.user);
                }} >
                <Icon style={styles.icon}  name="save"/>
        </TouchableOpacity>

      <CommentList comments={tipsState.tips}/>

      
      
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
    },
    icon:{
      fontSize: 20,
    },
    container:{
      flex:1,
      padding:20,
    },
    boton:{
      flex:1,
      position: "absolute",
      right: 0,
      top: height * 0.35,
      marginRight: 15,
      alignItems:'center',
      justifyContent:'center',
      width:40,
      height:40,
      backgroundColor:'#4CAF50',
      borderRadius:50,
  
    },
    searchIcon: {
      padding: 10,
  },
  input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      backgroundColor: '#fff',
      color: '#424242',
  },
});

export default Tips;