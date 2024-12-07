import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ForgotPassword = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("./../../assets/logo.png")}
          style={styles.logoImg}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="email" size={20} color="green" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="key" size={20} color="green" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="key"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Verify </Text>
          <Icon name="verified" width={40} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Confirm")} // Navigate to ConfirmPassword screen
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Send</Text>
          <Icon name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2fff1",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: "#000",
  },
  logoImg: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    flex: 0.4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
});
export default ForgotPassword;
