// src/screens/HomeScreen.js
import React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Dashboard from "../expense/Dashboard";
import RecentTransactions from "../expense/RecentTransactions";
import UpcomingTransactions from "../expense/UpcomingTransactions";
import DefaultLayout from "../layout/HomeLayout";

const initialLayout = { width: Dimensions.get("window").width };

export default function HomeScreen({ navigation }) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "recent", title: "Recent Transactions" },
    { key: "upcoming", title: "Upcoming Expenses" },
  ]);

  const renderScene = SceneMap({
    recent: RecentTransactions,
    upcoming: UpcomingTransactions,
  });

  return (
    <DefaultLayout>
      <Dashboard />
      <View style={styles.accounts}>
        <Text style={styles.TitleText}>Accounts</Text>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={styles.tabBar}
              indicatorStyle={styles.indicator}
              labelStyle={styles.tabLabel} // Apply label style
              activeColor="#fff" // Color when focused
              inactiveColor="#eee" // Default color
            />
          )}
        />
      </View>
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  accounts: {
    flex: 1,
    backgroundColor: "#f2fff1",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 16,
  },
  TitleText: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "#000",
    marginVertical: 10,
  },
  tabBar: {
    backgroundColor: "#2BCB79",
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  },
  indicator: {
    backgroundColor: "transparent",
  },
  tabLabel: {
    fontSize: 16, // Increase font size
    fontWeight: "bold",
  },
});
