import React from "react";
import {ThemeProvider } from 'react-native-elements';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./src/components/navigation";
import theme from "./src/theme";
import { Provider as AuthProvider } from "./src/providers/AuthContext";
import { Provider as PetsContext } from "./src/providers/PetsContext";
import { Provider as TipsContext } from "./src/providers/TipsContext";

import LongTimers from "./src/utils/LongTimers";



export default function App() {
  LongTimers();

  return (
    <AuthProvider>
      <PetsContext>
          <TipsContext>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <Navigation />
          </SafeAreaProvider>
        </ThemeProvider>
        </TipsContext>
        </PetsContext>
    </AuthProvider>
  );
}