import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View, ScrollView} from "react-native";
import { Button, Input, Text } from "react-native-elements";
import Logo from "../shared/logo.js";
import SignupForm from "../forms/SignupForm";

const { width, height } = Dimensions.get("screen");

const Signup = ({ navigation }) => {
  return (

      <ScrollView style={styles.container}>
        <Logo/>
        <SignupForm navigation={navigation}/>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.text}>Inicio Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    padding: 10,
    
  },
  text: {
    marginBottom: 30,
    textAlign: "center",
    marginTop: width*0.04,
    fontSize: 15,

  },
});

export default Signup;