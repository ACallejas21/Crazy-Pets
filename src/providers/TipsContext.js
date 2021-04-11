import createDataContext from "./createDataContext";
import { firebase } from "../firebase";

// Acciones disponibles para el reducer
const tipReducer = (state, action) => {
  switch (action.type) {
    case "errorMessage":
      return { ...state, errorMessage: action.payload };
    case "createTip":
      return { ...state, tips: [...tips, action.payload] };
    case "getTips":
      return { ...state, tips: action.payload };
    case "setCurrentTip":
      return { ...state, currentTip: action.payload };
    case "deleteTip":
      return { ...state, tips: action.payload };
    default:
      return state;
  }
};

// Referencia al nombre de la colección de notas
const TipsRef = firebase.firestore().collection("tips");

// Almacena una nueva nota para el usuario actual
const createTip = (dispatch) => (comentario, autor) => {
  const data = {  
    comentario,
    usuario: autor,
  };

  TipsRef
    .add(data)
    .then((_doc) => {
      dispatch({ type: "errorMessage", payload: "Tip added!" });
    })
    .catch((error) => {
      dispatch({ type: "errorMessage", payload: error.message });
    });
};

const deleteTip = (dispatch) => (id) => {
  TipsRef
    .doc(id)
    .delete()
    .then((_doc) => {
      dispatch({ type: "errorMessage", payload: "Tip deleted" });
    })
    .catch((error) => {
      dispatch({ type: "errorMessage", payload: error.message });
    });
};

// Obtener las notas del usuario
const getTips = (dispatch) => () => {
  TipsRef
  .onSnapshot(
    (querySnapshot) => {
      const tips = [];

      querySnapshot.forEach((doc) => {
        const tip = doc.data();
        tip.id = doc.id;
        tips.push(tip);
      });

      dispatch({ type: "getTips", payload: tips });
    },
    (error) => {
      dispatch({ type: "errorMessage", payload: error.message });
    }
  );
};
const setCurrentTip = (dispatch) => (tip) => {
  dispatch({ type: "setCurrentTip", payload: tip });
};

// Exportar las funcionalidades requeridas al contexto
export const { Provider, Context } = createDataContext(
    tipReducer,
  {
    createTip,
    getTips,
    setCurrentTip,
    deleteTip
  },
  {
    pets: [],
    errorMessage: "",
  }
);
