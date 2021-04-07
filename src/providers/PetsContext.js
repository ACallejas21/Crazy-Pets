import createDataContext from "./createDataContext";
import { firebase } from "../firebase";

// Acciones disponibles para el reducer
const petReducer = (state, action) => {
  switch (action.type) {
    case "errorMessage":
      return { ...state, errorMessage: action.payload };
    case "createPet":
      return { ...state, notes: [...notes, action.payload] };
    case "getPets":
      return { ...state, notes: action.payload };
    default:
      return state;
  }
};

// Referencia al nombre de la colección de notas
const PetsRef = firebase.firestore().collection("mascotas");

// Almacena una nueva nota para el usuario actual
const createPet = (dispatch) => (title, content, timestamp, author) => {
  const data = {
    title,
    content,
    timestamp,
    userId: author,
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
    .orderBy("timestamp", "desc")
    .onSnapshot(
      (querySnapshot) => {
        const pets = [];

        querySnapshot.forEach((doc) => {
          const pet = doc.data();
          pet.id = doc.id;
          pets.push(note);
        });

        dispatch({ type: "getPets", payload: notes });
      },
      (error) => {
        dispatch({ type: "errorMessage", payload: error.message });
      }
    );
};

// Exportar las funcionalidades requeridas al contexto
export const { Provider, Context } = createDataContext(
  PetReducer,
  {
    createPet,
    getPets,
  },
  {
    pets: [],
    errorMessage: "",
  }
);