import React, {useContext} from "react";
import {
  Dimensions,
  StyleSheet,
  View
} from "react-native";
import Logo from "../shared/logo"
import {Text, Button} from "react-native-elements"
import {firebase} from "../../firebase"
import {Context as AuthContext} from "../../providers/AuthContext";



const { width, height } = Dimensions.get("screen");

const Profile = ({navigation}) => {

  const { state, signout } = useContext(AuthContext);






  return (
    <View>
        <Logo/>
        <Text h4 style={styles.text}>Usuario</Text>
        <Text h5 style={styles.text}>{state.user.user}</Text>
        <Text h4 style={styles.text}>Correo</Text>
        <Text h5 style={styles.text}>{state.user.email}</Text>

        <Button style={styles.button} title="Cerrar Sesión" onPress={() => { signout();  }} />
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