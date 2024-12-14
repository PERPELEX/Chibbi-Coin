import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const NumberPad = ({ handleKeyPress }) => {
  const renderKey = (item) => (
    <TouchableOpacity
      style={[
        styles.key,
        item === "x" && styles.deleteKey,
        item === "Enter" && styles.enterKey,
      ]}
      onPress={() => handleKeyPress(item === "Enter" ? "" : item)}
    >
      {item === "x" ? (
        <Icon
          name="remove"
          size={16}
          color="#FFFFFF"
          style={styles.deleteKeyText}
        />
      ) : item === "Enter" ? (
        <Icon
          name="check"
          size={16}
          color="#FFFFFF"
          style={styles.enterKeyText}
        />
      ) : (
        <Text style={styles.keyText}>{item}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.numberPad}>
      <FlatList
        data={["7", "8", "9", "4", "5", "6", "1", "2", "3", ".", "0", "x"]}
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
    backgroundColor: "#000", // Green background as per the theme
    height: "auto",
  },
  key: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#eee",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Darker green for keys
  },
  keyText: {
    fontSize: 26,
    fontWeight: 600,
    color: "#16B773", // White text for keys
  },
  deleteKey: {
    backgroundColor: "#fa5252", // Slightly lighter green for the Enter key
  },
  deleteKeyText: {
    color: "#FFFFFF", // White text for the Enter key
    fontSize: 26,
  },
  enterKey: {
    backgroundColor: "#008256", // Green background for the Enter key
  },
  enterKeyText: {
    color: "#FFFFFF", // White text for the Enter key
    fontSize: 26,
  },
});

export default NumberPad;
