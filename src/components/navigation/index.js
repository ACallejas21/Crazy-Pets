import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import * as SplashScreen from "expo-splash-screen";
import { Context as AuthContext } from "../../providers/AuthContext";
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
import Icon from 'react-native-vector-icons/Ionicons'
import {StyleSheet} from "react-native";



const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();


const myTabBar =() =>{

  return(
    <Tab.Navigator style={styles.tab}>
      <Tab.Screen   name = "Home" 
          component = {Home}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => (
              <Icon name="home-outline" />
            )

          }}
      />
      <Tab.Screen   name = "Tips" 
          component = {Tips}
          options={{
            tabBarLabel: 'Consejos',
            tabBarIcon: () => (
              <Icon name="chatbubbles-outline" />
            )

          }}
      />
      <Tab.Screen   name = "Profile" 
          component = {Profile}
          options={{
            tabBarIcon: () => (
              <Icon name="person-circle-outline" />
            )

          }}
      />
    </Tab.Navigator>
  )
}

const Navigation = () => {
  const { state, persistLogin } = useContext(AuthContext);

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
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={myTabBar}
                options={{ headerShown: false }}
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
  tab:{
    color: "#607D8B",
  }
});

export default Navigation;