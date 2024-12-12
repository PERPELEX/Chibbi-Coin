import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const Backbar = ({ name, url }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (url) {
      navigation.navigate(url);
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    const backAction = () => {
      handlePress();
      return true; // Prevent default behavior (exit app)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [url]);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handlePress}>
        <Icon name="arrow-left" size={24} color="#FFF" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{name}</Text>
      <View style={{ width: 30 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#2BCB79",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  headerTitle: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default Backbar;
