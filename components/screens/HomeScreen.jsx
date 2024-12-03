// src/screens/HomeScreen.js
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { ThemeContext } from "../theme/themeContext";

export default function HomeScreen({ navigation }) {
  const { toggleTheme } = React.useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
