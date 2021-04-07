import React, { useContext } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Context as PetsContext } from "../../providers/PetsContext";
import PetsCard from "./card";

const PetsList = ({ navigation, pets }) => {
  const { state, setCurrentNote } = useContext(PetsContext);

//   const handleSelectNote = (note) => {
//     setCurrentNote(note);
//     navigation.navigate("ModifyNote");
//   };

  const emptyFlatList = (
    <View style={styles.emptyNotes}>
      <Text>Lista vacia</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        emptyFlatList={emptyFlatList}
        numColumns={1}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
            //   onPress={() => {
            //     handleSelectNote(item);
            //   }}
            >
              <PetsCard
                Titulo={item.titulo}
                descripcion={item.contenido}
              />
            </TouchableOpacity>
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyNotes: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default PetsList;