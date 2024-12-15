import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { DataContext } from "../contexts/DataContext";

const ForgotPassword = ({ navigation }) => {
  const { data, setData } = useContext(DataContext);
  const [email, setEmail] = useState("");
  const [verificationKey, setVerificationKey] = useState("");
  const [generatedKey, setGeneratedKey] = useState(null); // Simulate key generation
  const [keySent, setKeySent] = useState(false);

  const handleSendKey = () => {
    const user = data.user;

    if (email === user.email) {
      // Simulate key generation and sending
      const key = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit code
      setGeneratedKey(key);
      setKeySent(true);
      Alert.alert("Success", `Verification key sent to ${email}!`);
    } else {
      Alert.alert("Error", "Email not found.");
    }
  };

  const handleVerifyKey = () => {
    if (verificationKey === generatedKey) {
      Alert.alert("Success", "Key verified! Proceed to reset password.");
      navigation.navigate("Confirm"); // Navigate to ConfirmPassword screen
    } else {
      Alert.alert("Error", "Invalid verification key.");
    }
  };

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
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {keySent && (
        <View style={styles.inputContainer}>
          <Icon name="key" size={20} color="green" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter verification key"
            placeholderTextColor="#888"
            value={verificationKey}
            onChangeText={setVerificationKey}
          />
        </View>
      )}

      <View style={styles.buttons}>
        {keySent ? (
          <TouchableOpacity style={styles.button} onPress={handleVerifyKey}>
            <Text style={styles.buttonText}>Verify</Text>
            <Icon name="verified" size={20} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSendKey}>
            <Text style={styles.buttonText}>Send Key</Text>
            <Icon name="send" size={20} color="white" />
          </TouchableOpacity>
        )}
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
    backgroundColor: "#34c759",
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
