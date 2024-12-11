import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select"; 

const User = () => {
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("$"); 

  const userName = async () => {
    try {
      const fetch = await fetch("https://run.mocky.io/v3/9298869e-b91a-47ea-91a8-5c517d358cd3");
      const data = await fetch.json();
      setName(data.name);
      setEmail(data.email);
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    try {
      console.log("Requesting media library permission...");
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        console.log("Permission denied.");
        Alert.alert("Permission required", "You need to grant camera roll permissions to select a photo.");
        return;
      }
      console.log("Permission granted.");

      console.log("Opening image picker...");
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      console.log("Image picker result:", result);

      if (result.canceled) {
        console.log("User cancelled image picker.");
        Alert.alert("No image selected", "You didn't select an image.");
        return;
      } else {
        const imageUri = result.assets[0].uri;
        console.log("Image selected:", imageUri);
        setImageUri(imageUri);
      }
    } catch (error) {
      console.log("Error selecting image:", error);
    }
  };

  useEffect(() => {
    userName(); 
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#2BCB79"} shadowColor={"#000"} marginBottom={20}></StatusBar>

      <View style={styles.heading}>
        <Text style={styles.headingText}>Profile</Text>
        <Image style={styles.image} source={{ uri: imageUri }} />
      </View>

      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.profileImage} />
          ) : (
            <Text style={styles.addPhotoText}>Add a Photo</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.profileDetailsContainer}>
        <Text style={styles.profileDetailsText}>Name: {name}</Text>
        <Text style={styles.profileDetailsText}>Email: {email}</Text>

        {/* Currency Selector */}
        <Text style={styles.profileDetailsText}>Currency:</Text>
        <RNPickerSelect
          onValueChange={(value) => setCurrency(value)}
          items={[
            { label: "$ USD", value: "$" },
            { label: "Rs PKR", value: "Rs" },        
          ]}
          value={currency}
          style={{
            inputAndroid: {
              backgroundColor: "white",
              borderColor: "#2BCB79",
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              color: "#000",
            },
            inputIOS: {
              backgroundColor: "white",
              borderColor: "#2BCB79",
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              color: "#000",
            },
          }}
        />
      </View>
      <View style={styles.button}>
          <TouchableOpacity
            onPress={() => console.log("Logout")}
            style={styles.logoutButton}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#2BCB79",
    shadowColor: "#000",
  },
  headingText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    paddingLeft: 10,
  },
  image: {
    width: 35,
    height: 30,
    borderRadius: 20,
    marginRight: 10,
    resizeMode: "contain",
  },
  profileContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#2BCB79",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    resizeMode: "cover",
  },
  addPhotoText: {
    fontSize: 16,
    color: "#2BCB79",
    fontWeight: "bold",
  },
  profileDetailsContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 10,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  profileDetailsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  button: {
    alignItems: "center",
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: "#2BCB79",
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default User;
