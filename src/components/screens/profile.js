import React from "react";
import {
  Dimensions,
  StyleSheet,
  View
} from "react-native";
import Logo from "../shared/logo"
import {Text, Button} from "react-native-elements"
import {firebase} from "../../firebase"



const { width, height } = Dimensions.get("screen");

const Profile = ({navigation}) => {

    const handleSignOut = () => {
        firebase.auth().signOut().then(() => {
          navigation.navigate("Signin");
          console.log("Cerrar Sesion");
        }).catch((error) => {
          console.log("Error");
        });
              
      };

  return (
    <View>
        <Logo/>
        <Text h4 style={styles.text}>Usuario</Text>
        <Text h5 style={styles.text}>Nombre del usuario</Text>
        <Text h4 style={styles.text}>Correo</Text>
        <Text h5 style={styles.text}>Correo del usuario</Text>

        <Button style={styles.button} title="Cerrar Sesión" onPress={handleSignOut} />
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

export default Profile;