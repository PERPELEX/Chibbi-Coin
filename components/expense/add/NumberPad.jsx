// src/components/NumberPad.jsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

const NumberPad = ({ handleKeyPress }) => {
  const renderKey = (item) => (
    <TouchableOpacity
      style={[styles.key, item === "Enter" && styles.enterKey]}
      onPress={() => handleKeyPress(item === "Enter" ? "" : item)}
    >
      <Text style={[styles.keyText, item === "Enter" && styles.enterKeyText]}>
        {item === "Enter" ? "↩" : item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.numberPad}>
      <FlatList
        data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "x", "0", "Enter"]}
        renderItem={({ item }) => renderKey(item)}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  numberPad: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10,
  },
  key: {
    flex: 1,
    margin: 5,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
  },
  keyText: {
    fontSize: 24,
    color: "#000",
  },
  enterKey: {
    backgroundColor: "#00D0A3",
  },
  enterKeyText: {
    color: "#FFF",
  },
});

export default NumberPad;
