import React, { useState,useContext, useEffect } from "react";
import { StyleSheet, View, Dimensions} from "react-native";
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
    <View>
        <Logo/>
        <Text >Tips</Text>
      <Input
        placeholder="Comentario"
        leftIcon={<FontAwesome5 name="dog" size={24} color="black" />}
        value={comentario}
        onChangeText={setComentario}

      />
      <Button title="agregar comentario"  onPress={() => {
             createTip(comentario, state.user.user);
            }} />
      <Button title="borrar comentario"  onPress={() => {
             deleteTip(tipsState.currentTip);
            }} />

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
    }
});

export default Tips;