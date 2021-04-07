import createDataContext from "./createDataContext";
import { firebase } from "../firebase";

// Acciones disponibles para el reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "errorMessage":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { ...state, user: action.payload, loggedIn: true };
      case "signingoogle":
        return { ...state, user: action.payload, loggedIn: true };
    case "signout":
      return { ...state, user: action.payload, loggedIn: false };
    case "persistLogin":
      return {
        ...state,
        user: action.payload.user,
        loggedIn: action.payload.loggedIn,
        loading: false,
      };
    case "signup":
      return {
        ...state,
        user: action.payload.user,
        registered: true,
      };
      case "signupgoogle":
      return {
        ...state,
        user: action.payload.user,
        registered: true,
      };
    default:
      return state;
  }
};

// Permite el inicio de sesión mediante firebase con email y password
const signin = (dispatch) => (email, password) => {
  // Hacer la petición al API de firebasee
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      // Obtener el Unique Identifier generado para cada usuario
      // Firebase -> Authentication
      const uid = response.user.uid;

      // Obtener la colección desde Firebase
      const usersRef = firebase.firestore().collection("usuarios");

      // Verificar que el usuario existe en Firebase authentication
      // y también está almacenado en la colección de usuarios.
      usersRef
        .doc(uid)
        .get()
        .then((firestoreDocument) => {
          if (!firestoreDocument.exists) {
            dispatch({
              type: "errorMessage",
              payload: "El usuario no existe en la base de datos",
            });
          } else {
            // Llamar el reducer y enviarle los valores del usuario al estado
            dispatch({ type: "errorMessage", payload: "" });
            dispatch({ type: "signin", payload: firestoreDocument.data() });
          }
        });
    })
    .catch((error) => {
      dispatch({ type: "errorMessage", payload: error.message });
    });
};

// Cierra la sesión del usuario
const signout = (dispatch) => () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: "signout", payload: {} });
    })
    .catch((error) => {
      dispatch({ type: "errorMessage", payload: error.message });
    });
};

// Verifica si existe el token de firebase para iniciar sesión sin credenciales
const persistLogin = (dispatch) => () => {
  const userRef = firebase.firestore().collection("usuarios");

  // Si el usuario ya se ha autenticado previamente, retornar
  // la información del usuario, caso contrario,retonar un objeto vacío.
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userRef
        .doc(user.uid)
        .get()
        .then((document) => {
          dispatch({
            type: "persistLogin",
            payload: { user: document.data(), loggedIn: true },
          });
        })
        .catch((error) => {
          dispatch({ type: "errorMessage", payload: error.message });
        });
    } else {
      dispatch({
        type: "persistLogin",
        payload: { user: {}, loggedIn: false },
      });
    }
  });
};

const signup = (dispatch) => (fullname, email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      // Obtener el Unique Identifier generado para cada usuario
      // Firebase -> Authentication
      const uid = response.user.uid;

      // Construir el objeto que le enviaremos a la collección de "users"
      const data = {
        id: uid,
        email,
        fullname,
      };

      // Obtener la colección desde Firebase
      const usersRef = firebase.firestore().collection("usuarios");

      // Almacenar la información del usuario que se registra en Firestore
      usersRef
        .doc(uid)
        .set(data)
        .then(() => {
          dispatch({
            type: "signup",
            payload: { user: data, registered: true },
          });
        })
        .catch((error) => {
          dispatch({ type: "errorMessage", payload: error.message });
        });
    });
  dispatch({ type: "errorMessage", payload: error.message });
};


//Se registra usando google
const userprovider = new firebase.auth.GoogleAuthProvider()

const signupgoogle = (dispatch) => () => {
  firebase.auth()
    .signInWithPopup(userprovider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
      // The signed-in user info.
      // ...
      const uid = result.user.uid;
      const email = result.user.email;
      const user = result.user.displayName;

  
    const data = {
      id: uid,
      email : email,
      user : user
    };

    // Obtener la colección desde Firebase
    const usersRef = firebase.firestore().collection("usuarios");

    // Almacenar la información del usuario que se registra en Firestore
    usersRef
        .doc(uid)
        .set(data)
        .then(() => {
          dispatch({
            type: "signupgoogle",
            payload: { user: data, registered: true },
          });
        })
        .catch((error) => {
         // dispatch({ type: "errorMessage", payload: error.message });
        });
    });
  //dispatch({ type: "errorMessage", payload: error.message });
}

//Inicia Sesion Usando Google
const signingoogle = (dispatch) => () => {
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    // This gives you a Google Access Token. You can use it to access the Google API.
   var token = credential.accessToken;
    // The signed-in user info.
    // ...
    const uid = result.user.uid;
    const email = result.user.email;
    const user = result.user.displayName;

  
    const data = {
      id: uid,
      email : email,
      user : user
    };

    // Obtener la colección desde Firebase
    const usersRef = firebase.firestore().collection("usuarios");

    // Almacenar la información del usuario que se registra en Firestore
    usersRef
      .doc(uid)
      .set(data)
      .then((firestoreDocument) => {
       
      });
  })
  .catch((error) => {
    dispatch({ type: "errorMessage", payload: error.message });
  });
};
  const provider = new firebase.auth.GoogleAuthProvider()

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "errorMessage", payload: "" });
};

// Exportar las funcionalidades requeridas al contexto
export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    signout,
    persistLogin,
    signup,
    clearErrorMessage,
    signupgoogle,
    signingoogle,
  },
  {
    user: {},
    errorMessage: "",
    loggedIn: false,
    loading: true,
    registered: false,
  }
);