import React, { useContext } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import { Context as TipsContext } from "../../providers/TipsContext";
import Comment from "./comment";

const CommentList = ({ navigation, comments }) => {
  const { state, setCurrentTip, deleteTip } = useContext(TipsContext);

  const handleSelectTip = (tip) => {
    setCurrentTip(tip);
  };

  const emptyFlatList = (
    <View style={styles.emptyNotes}>
      <Text>Lista vacia</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={comments}
        emptyFlatList={emptyFlatList}
        numColumns={1}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              onPress={() => {
                handleSelectTip(item.id);
              }}
            >
              <Comment
                usuario={item.usuario}
                comentario={item.comentario}
              />
            </TouchableOpacity>
          </>
        )}
      />
    </ScrollView>
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

export default CommentList;