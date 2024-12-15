import React, { useContext } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Backbar from "../layout/Backbar";
import { DataContext } from "../contexts/DataContext";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Notification = () => {
  const { data } = useContext(DataContext);
  const { notifications } = data;

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Icon name="message" size={24} color="#2BCB79" />
      <View style={styles.notificationBody}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDetails}>{item.details}</Text>
      </View>
    </View>
  );

  if (!notifications || notifications.length === 0) {
    return (
      <DefaultLayout>
        <Backbar name="Notifications" />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No notifications available.</Text>
        </View>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Backbar name="Notifications" />
      <View style={styles.container}>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
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
