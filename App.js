import React,{useEffect, useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "./src/components/screens/Signup";
import Signin from "./src/components/screens/SignIn";
import Home from "./src/components/screens/home";
import Addpets from "./src/components/screens/addPets";
import Detailspets from "./src/components/screens/detailsPets";
import Tips from "./src/components/screens/tips";
import PasswordRecovery from "./src/components/screens/passwordRecovery";
import Profile from "./src/components/screens/profile";
import theme from "./src/theme";
import PersistLogin from "./src/utils/persistLogin";

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


const myTabBar =() =>{

  return(
    <Tab.Navigator>
      <Tab.Screen   name = "Home" 
          component = {Home}
          options={{
            tabBarLabel: 'Inicio',

          }}
      />
      <Tab.Screen   name = "Tips" 
          component = {Tips}
          options={{
            tabBarLabel: 'Consejos',

          }}
      />
      <Tab.Screen   name = "Profile" 
          component = {Profile}
          options={{
            tabBarLabel: 'Perfin',

          }}
      />
    </Tab.Navigator>
  )
}


export default function App() {
  const [user, setUser] = useState({});

  // Verificar si ya existen credenciales de autenticación
  useEffect(() => {
    const userData = PersistLogin();
    setUser(userData);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Signin">
              <Stack.Screen name="Home" component={myTabBar} initialParams={{ user: user }} />
              <Stack.Screen name="Addpets" component={Addpets} />
              <Stack.Screen name="Detailspets" component={myTabBar} />
              <Stack.Screen name="Tips" component={myTabBar} />
            <Stack.Screen name="PasswordRecovery" component={PasswordRecovery}/>
            <Stack.Screen name="Profile" component={myTabBar}/>

            <Stack.Screen name="Signin" component={Signin} 
            initialParams={{ userCreated: false }}
              options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup}options={{ headerShown: false }}  />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});