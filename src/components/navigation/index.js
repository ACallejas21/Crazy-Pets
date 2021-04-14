import React, { useContext, useEffect } from "react";
import {Button, Image, TouchableOpacity, Dimensions} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import * as SplashScreen from "expo-splash-screen";
import { Context as AuthContext } from "../../providers/AuthContext";
import Icon from "react-native-vector-icons/FontAwesome";
import Signin from "../screens/SignIn";
import Signup from "../screens/Signup";
import Home from "../screens/home";
import addPets from "../screens/addPets";
import passwordRecovery from "../screens/passwordRecovery";
import Tips from "../screens/tips";
import Profile from "../screens/profile";
import detailsPets from "../screens/detailsPets";
import editPet from "../screens/editPet";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {StyleSheet} from "react-native";


const { width, height } = Dimensions.get("screen");

const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      style={styles.header}
      source={require("../../../assets/titulo.png")}
      
    />
    
  );
}


const myTabBar =() =>{


  return(
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#000"
      barStyle={{ backgroundColor: '#4CAF61' }}
      >
      <Tab.Screen   name = "Home" 
          component = {Home}
          options={{
            tabBarLabel: 'Inicio',
            tabBarIcon: () => (
              <Icon style={styles.icon}  name="home" />
            )

          }}
      />
      <Tab.Screen   name = "Tips" 
          component = {Tips}
          options={{
            tabBarLabel: 'Consejos',
            tabBarIcon: () => (
              <Icon style={styles.icon} name="comments" />
            )

          }}
      />
      <Tab.Screen   name = "Profile" 
          component = {Profile}
          options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: () => (
              <Icon style={styles.icon} name="user" />
            )

          }}
      />
    </Tab.Navigator>
  )
}

const Navigation = () => {
  const { state, persistLogin, signout } = useContext(AuthContext);

  // Verificar si ya existen credenciales de autenticación
  useEffect(() => {
    persistLogin();
  }, []);

  // Prevenir que se oculte la pantalla de splash
  //SplashScreen.preventAutoHideAsync();

  // Ocultar la pantalla de splash al verificar que existe un token de inicio
  //if (!state.loading) SplashScreen.hideAsync();

  return (
    <NavigationContainer>
      {!state.loading && (
        <>
          {state.loggedIn ? (
            <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#4caf50',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
              <Stack.Screen style={styles.header}
                name="Home"
                component={myTabBar}
                options={{
                  title: 'My home',
                  headerTitle: props => <LogoTitle {...props} />,
                  headerRight: () => (
                    <TouchableOpacity style={styles.boton} onPress={() => {
                      signout();
                     }} >
                     <Icon style={styles.icon2} name="sign-out"/>
                  </TouchableOpacity>
                  )
                
                }}
              />
              <Stack.Screen
                name="addPets"
                component={addPets}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="detailsPets"
                component={detailsPets}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="editPet"
                component={editPet}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                name="Signin"
                component={Signin}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
              />
               <Stack.Screen
                name="passwordRecovery"
                component={passwordRecovery}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )}
        </>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header:{
    width: width*0.17,
    height: 50,   
    marginLeft: width*0.38, 
    flex:1
  },
  icon:{
    fontSize: 20,
  },
  icon2:{
    fontSize: 30,


  },
});

export default Navigation;