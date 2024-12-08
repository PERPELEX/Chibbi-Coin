// src/screens/AddTransactionScreen.jsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import DefaultLayout from "../layout/DefaultLayout";
import Header from "../expense/add/TransactionHeader";
import Category from "../expense/add/TransactionCategory";
import AmountInput from "../expense/add/AmountInput";
import Details from "../expense/add/TransactionDetails";
import NumberPad from "../expense/add/NumberPad";

const AddTransactionScreen = ({ navigation }) => {
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("expense");

  const handleKeyPress = (value) => {
    if (value === "x") {
      setAmount(amount.slice(0, -1)); // Remove last character
    } else {
      setAmount(amount + value);
    }
  };

  return (
    <DefaultLayout>
      <View style={styles.container}>
        <Header onClose={() => navigation.goBack()} />
        <Category category={category} setCategory={setCategory} />
        <AmountInput amount={amount} setAmount={setAmount} />
        <Details notes={notes} setNotes={setNotes} />
        <NumberPad handleKeyPress={handleKeyPress} />
      </View>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

export default AddTransactionScreen;
