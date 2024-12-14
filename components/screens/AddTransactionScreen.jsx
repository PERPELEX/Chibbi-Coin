import React, { useState, useCallback } from "react";
import { View, StyleSheet, Dimensions, Text, Animated } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { useFocusEffect } from "@react-navigation/native";

import DefaultLayout from "../layout/DefaultLayout";
import Header from "../expense/add/TransactionHeader";
import Category from "../expense/add/TransactionCategory";
import AmountInput from "../expense/add/AmountInput";
import NumberPad from "../expense/add/NumberPad";
import TransactionDetails from "../expense/add/TransactionDetails";

const AddTransactionScreen = ({ navigation }) => {
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("expense");
  const [subCategory, setSubCategory] = useState("Food and Drinks");
  const [currency, setCurrency] = useState("PKR");
  const [date, setDate] = useState(new Date());
  const [index, setIndex] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState("daily");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleKeyPress = (value) => {
    if (value === "x") {
      setAmount(amount.slice(0, -1)); // Remove last character
    } else {
      setAmount(amount + value);
    }
  };

  const handleCheckPress = () => {
    if (amount === "") {
      setAlertVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => setAlertVisible(false));
        }, 1000);
      });
    } else {
      handleKeyPress("");
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Reset all states when the screen comes into focus
      return () => {
        setAmount("");
        setNotes("");
        setCategory("expense");
        setSubCategory("");
        setCurrency("PKR");
        setDate(new Date());
        setIndex(0);
        setIsRecurring(false);
        setFrequency("daily");
        setStartDate(new Date());
        setEndDate(new Date());
      };
    }, [])
  );

  const FirstRoute = () => (
    <View style={styles.scene}>
      <Header
        onClose={() => navigation.goBack()}
        title="Add Transaction"
        handleKeyPress={handleCheckPress}
        close={true}
      />
      <Category category={category} setCategory={setCategory} />
      <AmountInput
        amount={amount}
        setAmount={setAmount}
        currency={currency}
        category={category}
        setIndex={setIndex} // Pass setIndex to AmountInput
      />
      <NumberPad handleKeyPress={handleKeyPress} />
      {alertVisible && (
        <Animated.View style={[styles.alert, { opacity: fadeAnim }]}>
          <Text style={styles.alertText}>Please fill in the form</Text>
        </Animated.View>
      )}
    </View>
  );

  const SecondRoute = () => (
    <View style={styles.scene}>
      <Header
        onClose={() => setIndex(0)}
        title={`${currency} ${amount ? amount : "0"}`}
        handleKeyPress={handleCheckPress}
      />
      <TransactionDetails
        notes={notes}
        setNotes={setNotes}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        date={date}
        setDate={setDate}
        isRecurring={isRecurring}
        setIsRecurring={setIsRecurring}
        frequency={frequency}
        setFrequency={setFrequency}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      {alertVisible && (
        <Animated.View style={[styles.alert, { opacity: fadeAnim }]}>
          <Text style={styles.alertText}>Please fill in the form</Text>
        </Animated.View>
      )}
    </View>
  );

  const initialLayout = { width: Dimensions.get("window").width };

  const [routes] = useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);

  return (
    <DefaultLayout>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={() => null} // Hide the tab bar
      />
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scene: {
    flex: 1,
    backgroundColor: "#000",
  },
  alert: {
    position: "absolute",
    left: "50%",
    top: "85%",
    transform: [
      { translateX: -Dimensions.get("window").width * 0.25 },
      { translateY: -50 },
    ],
    width: "50%",
    backgroundColor: "#fa5252",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  alertText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AddTransactionScreen;
