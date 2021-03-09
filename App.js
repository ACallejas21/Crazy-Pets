import React from "react";
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
import theme from "./src/theme";
import PersistLogin from "./src/utils/persistLogin";

const Stack = createStackNavigator();

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
          <Stack.Navigator>
          {user ? (
            <>
            <Stack.Screen name="Home" component={Home} initialParams={{ user: user }} />
            <Stack.Screen name="Addpets" component={Addpets} />
            <Stack.Screen name="Detailspets" component={Detailspets} />
            <Stack.Screen name="Tips" component={Tips} />
            <Stack.Screen name="PasswordRecovery" component={PasswordRecovery}/>
            </>
          ) : (
            <>
            <Stack.Screen name="Signin" component={Signin} 
            initialParams={{ userCreated: false }}
              options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} />
            </>
          )}
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