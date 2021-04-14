# Crazy-Pets
<p align="center" >
  <img width="200px" height="200px" src="assets/logo.png">
</p>


# Crazy-Pets
Es una aplicación que permite al usuario agregar los datos de sus mascotas e interactuar con los demás usuarios compartiendo consejos para el cuidado y bienestar de sus mascotas.

## Pantallas

<div style="flex-direction: row" align="center">
  <table>
    <tr>
      <td align="center">
      <img src="https://cdn.discordapp.com/attachments/816172134581534780/832019322167623686/Screenshot_20210414-162637.png" height=400 width=200>
      <h6>Pantalla de inicio de sesión de la aplicación</h6>
      </td>
      <td align="center">
        <img src="https://cdn.discordapp.com/attachments/816172134581534780/832019321739149342/Screenshot_20210414-162648.png" height=400 width=200>
        <h6>Pantalla de registro de la aplicación</h6>
      </td>
      <td align="center">
        <img src="https://cdn.discordapp.com/attachments/816172134581534780/832019321973768252/Screenshot_20210414-162643.png" height=400 width=200>
        <h6>Pantalla de recuperación de contraseña</h6>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://cdn.discordapp.com/attachments/816172134581534780/832019323861598278/Screenshot_20210414-162556.png" height=400 width=200>
        <h6>Pantalla de inicio de la aplicación</h6>
      </td>
      <td align="center">
        <img src="https://cdn.discordapp.com/attachments/816172134581534780/832019322808696892/Screenshot_20210414-162616.png" height=400 width=200>
        <h6>Pantalla de agregar mascotas</h6>
      </td>
      <td align="center">
        <img src="https://cdn.discordapp.com/attachments/816172134581534780/832022126282014750/Screenshot_20210414-163830.png" height=400 width=200>
        <h6>Pantalla de información de la mascota</h6>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://cdn.discordapp.com/attachments/816172134581534780/832022126071513098/Screenshot_20210414-163835.png" height=400 width=200>
        <h6>Pantalla de edición de la mascota</h6>
      </td>
      <td align="center">
        <img src="https://cdn.discordapp.com/attachments/816172134581534780/832019323408220168/Screenshot_20210414-162608.png" height=400 width=200>
        <h6>Pantalla de perfil del usuario</h6>
      </td>
      <td align="center">
        <img src="https://cdn.discordapp.com/attachments/816172134581534780/832019323627241482/Screenshot_20210414-162604.png" height=400 width=200>
        <h6>Pantalla de consejos de los usuarios</h6>
      </td>
    </tr>
  </table>
</div>

## Tecnologías utilizadas
- React native elements
- React native
- Expo
- React navigation
- React navigation tab navigation
- firebase
- font awensome

## Instrucciones para la instalación

Clona este repositorio. Necesitas tener instalado <code>node</code>, <code>npm</code> y <code>expo-cli</code> de manera global en tu computadora.

para que la aplicación funcione con la base de datos necesitas tener un key de <code>firebase</code>, 

Una vez que clones el repositorio y tengas tu apiKey, debes crear el archivo <code>enviroment.js</code> en la raíz del directorio y configurarlo de la siguiente manera:
<br>
<br>

```js
import Constant from "expo-constants";

const ENV = {
  dev: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  },
  production: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  },
};
const getEnvVars = (env = Constant.manifest.releaseChannel) => {
  if (__DEV__) return ENV.dev;
  else if (env == "staging") return ENV.dev;
  else if (env === "production" || env === "default") return ENV.production;
};
export default getEnvVars;
```
<br>

Instalación:<br>
<code>npm install</code>

Iniciar Expo Metro:<br>
<code>expo start</code>

