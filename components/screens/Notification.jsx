import React, { useState, useEffect } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Backbar from "../layout/Backbar";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
//Pre requirement for using this code for backend

//pass the correct end point for data fetching
const Notification = () => {
  const [notifications, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/9298869e-b91a-47ea-91a8-5c517d358cd3"
        );
        const data = await response.json();
        setNotification(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Icon name="message" size={24} color="#2BCB79" />
      <View style={styles.notificationBody}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDetails}>{item.details}</Text>
      </View>
    </View>
  );
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar
          backgroundColor={"#2BCB79"}
          shadowColor={"#000"}
          marginBottom={20}
        ></StatusBar>
        <ActivityIndicator size="large" color="#2BCB79" />
        <Text>Loading...</Text>
      </View>
    );
  }
  if (!loading && notifications.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar
          backgroundColor={"#2BCB79"}
          shadowColor={"#000"}
          marginBottom={20}
        ></StatusBar>
        <Text>No notifications available.</Text>
      </View>
    );
  }
  return (
    <DefaultLayout>
      <Backbar name="Notifications" />
      <View style={styles.container}>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        ></FlatList>
      </View>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2BCB79",
    shadowColor: "#000",
  },
  headingText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  notificationBody: {
    flex: 1,
    paddingLeft: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDetails: {
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Notification;
