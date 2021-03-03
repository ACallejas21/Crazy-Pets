import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { Button, Input, Text } from "react-native-elements";
import Logo from "../shared/Logo";
import SignupForm from "../forms/SignupForm";

const { width, height } = Dimensions.get("screen");

const Signup = ({ navigation }) => {
  return (
    <ScrollView>
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

const styles = StyleSheet.create({});

export default Signup;