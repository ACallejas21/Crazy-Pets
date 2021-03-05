import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View, ScrollView} from "react-native";
import { Button, Input, Text } from "react-native-elements";
import Logo from "../shared/Logo.js";
import SignupForm from "../forms/SignupForm";

const { width, height } = Dimensions.get("screen");

const Signup = ({ navigation }) => {
  return (

      <ScrollView style={styles.container}>
        <Logo/>
        <SignupForm />
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text>Inicio Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default Signup;