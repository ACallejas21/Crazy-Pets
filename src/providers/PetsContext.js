import createDataContext from "./createDataContext";
import { firebase } from "../firebase";

// Acciones disponibles para el reducer
const petReducer = (state, action) => {
  switch (action.type) {
    case "errorMessage":
      return { ...state, errorMessage: action.payload };
    case "createPet":
      return { ...state, pets: [...pets, action.payload] };
    case "getPets":
      return { ...state, pets: action.payload };
    case "setCurrentPet":
      return { ...state, currentNote: action.payload };
    default:
      return state;
  }
};

// Referencia al nombre de la colección de notas
const PetsRef = firebase.firestore().collection("mascotas");

// Almacena una nueva nota para el usuario actual
const createPet = (dispatch) => (nombre, edad, raza, descripcion, notas, autor) => {
  const data = {
    nombre,
    edad,
    raza,
    descripcion,
    notas,
    id: autor,
  };

  PetsRef
    .add(data)
    .then((_doc) => {
      dispatch({ type: "errorMessage", payload: "Pet added!" });
    })
    .catch((error) => {
      dispatch({ type: "errorMessage", payload: error.message });
    });
};

// Obtener las notas del usuario
const getPets = (dispatch) => (userId) => {
    PetsRef
    .where("id", "==", userId)
    .onSnapshot(
      (querySnapshot) => {
        const pets = [];

        querySnapshot.forEach((doc) => {
          const pet = doc.data();
          pet.id = doc.id;
          pets.push(pet);
        });

        dispatch({ type: "getPets", payload: pets });
      },
      (error) => {
        dispatch({ type: "errorMessage", payload: error.message });
      }
    );
};
const setCurrentPet = (dispatch) => (pet) => {
  dispatch({ type: "setCurrentPet", payload: pet });
};

// Exportar las funcionalidades requeridas al contexto
export const { Provider, Context } = createDataContext(
  petReducer,
  {
    createPet,
    getPets,
    setCurrentPet
  },
  {
    pets: [],
    errorMessage: "",
  }
);
