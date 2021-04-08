import React, { useContext, useState } from "react";
import { StyleSheet, View ,Button} from "react-native";
import theme from "../../theme";
import { Context as AuthContext } from "../../providers/AuthContext";
import { Context as PetsContext } from "../../providers/PetsContext";
import PetForm from "../forms/addPetForm.js"

const AddPet = ({ navigation }) => {
  const { createPet } = useContext(PetsContext);
  const { state } = useContext(AuthContext);

 

  return (
    <View style={styles.container}>
      <PetForm navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.backgroundWhite,
  },
  titleInput: {
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: theme.colors.backgroundWhite,
  },
  contentInput: {
    flex: 1,
    backgroundColor: theme.colors.backgroundWhite,
    borderBottomWidth: 0,
  },
  iconBar: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default AddPet;