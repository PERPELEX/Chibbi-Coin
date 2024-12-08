// src/components/Header.jsx
import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { DataContext } from "../contexts/DataContext";

export default function Header() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { data } = useContext(DataContext);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={openModal} style={styles.iconContainer}>
        <Icon name="account" color="#02192B" size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Notifications")}
        style={styles.iconContainer}
      >
        <Icon name="bell" color="#02192B" size={25} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Account Details</Text>
            {data.user ? (
              <>
                <Text style={styles.modalText}>Name: {data.user.name}</Text>
                <Text style={styles.modalText}>Email: {data.user.email}</Text>
              </>
            ) : (
              <Text style={styles.modalText}>No user data available</Text>
            )}
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#000",
    paddingHorizontal: 10,
    width: "100%",
  },
  iconContainer: {
    padding: 10, // Increase the touchable area
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
