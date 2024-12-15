import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // Use expo-image-picker
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { DataContext } from "../contexts/DataContext";

const User = ({ navigation }) => {
  const { data, setData } = useContext(DataContext);
  const [uploading, setUploading] = useState(false);

  const handleCurrencyChange = (value) => {
    setData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        currency: value,
      },
    }));
  };

  const pickImageAndUpload = async () => {
    try {
      // Request media library permissions
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission required", "Please allow access to your media library.");
        return;
      }

      // Launch the image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled) {
        console.log("User canceled image picker.");
        return;
      }

      const imageUri = result.assets[0].uri;

      // Update user data with the selected image URI
      setData((prevData) => ({
        ...prevData,
        user: {
          ...prevData.user,
          imageUri,
        },
      }));

      // Prepare the image for upload
      const formData = new FormData();
      formData.append("profile_picture", {
        uri: imageUri,
        type: "image/jpeg",
        name: "profile.jpg",
      });

      // Upload the image to the server
      setUploading(true);
      const response = await axios.post(
        "http://your-backend-url/api/users/upload-profile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setUploading(false);
      Alert.alert("Success", "Profile picture uploaded successfully!");
    } catch (error) {
      setUploading(false);
      console.error("Error uploading image:", error);
      Alert.alert("Upload Failed", "Something went wrong during the upload.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2BCB79" barStyle="light-content" />

      {/* Header */}
      <View style={styles.heading}>
        <Icon name="menu" size={30} color="#fff" />
        <Text style={styles.headingText}>Profile</Text>
        {data.user.imageUri ? (
          <Image style={styles.image} source={{ uri: data.user.imageUri }} />
        ) : (
          <Icon name="account-circle" size={35} color="#fff" />
        )}
      </View>

      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <TouchableOpacity
          onPress={pickImageAndUpload}
          style={styles.profileImageContainer}
        >
          {uploading ? (
            <ActivityIndicator size="large" color="#2BCB79" />
          ) : data.user.imageUri ? (
            <Image source={{ uri: data.user.imageUri }} style={styles.profileImage} />
          ) : (
            <Text style={styles.addPhotoText}>Add a Photo</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Profile Details */}
      <View style={styles.profileDetailsContainer}>
        <Text style={styles.profileDetailsText}>{data.user.name}</Text>
        <Text style={styles.profileDetailsText}>{data.user.email}</Text>

        {/* Currency Selector */}
        <Text style={styles.profileDetailsText}>Currency</Text>
        <RNPickerSelect
          onValueChange={handleCurrencyChange}
          items={[
            { label: "$ USD", value: "$" },
            { label: "Rs PKR", value: "Rs" },
          ]}
          value={data.user.currency}
          style={pickerStyles}
        />
      </View>

      {/* Logout Button */}
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
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
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#2BCB79",
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 25,
    resizeMode: "cover",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#2BCB79",
    justifyContent: "center",
    alignItems: "center",
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
    alignItems: "center",
    backgroundColor: "#2BCB79",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },
  profileDetailsText: {
    fontSize: 16,
    color: "white",
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
    color: "#fff",
    fontWeight: "bold",
  },
});

const pickerStyles = {
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
};

export default User;