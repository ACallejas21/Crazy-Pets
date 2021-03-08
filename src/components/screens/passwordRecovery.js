import React, { useState } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity, Text } from "react-native";
import theme from "../../theme/index";
import Logo from "../shared/logo";
import PasswordRecoveryForm from "../forms/passwordRecoveryForm";

const { width, height } = Dimensions.get("screen");

const PasswordRecovery = ({navigation}) => {
   return (
    <View style={styles.container}>
      <Logo/>
      <PasswordRecoveryForm />
      <TouchableOpacity onPress={() => {navigation.goBack()}}>
      <Text style={styles.Text}>Inicio Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
    backgroundColor: theme.colors.backgroundWhite,
  },
  Text:{
    textAlign: "center",
    marginTop: width*0.03,
    fontSize: 15,
  }
});

export default PasswordRecovery;