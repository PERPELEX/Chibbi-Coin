import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const AmountInput = ({ amount, setAmount, currency, category, setIndex }) => {
  const [fontSize, setFontSize] = useState(106); // Default font size
  const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    // Adjust font size dynamically based on amount length and container width
    const threshold = 3; // Number of digits before decreasing font size
    const newFontSize =
      amount.length > threshold
        ? Math.max(32, 106 - (amount.length - threshold) * 8) // Decrease by 8 for each additional digit
        : 106;
    setFontSize(newFontSize);
  }, [amount, windowWidth]);

  const handleKeyPress = (value) => {
    if (value === "x") {
      setAmount(amount.slice(0, -1)); // Remove last character
    } else if (amount.length < 11) {
      setAmount(amount + value);
    }
  };

  const symbol = category === "expense" ? "minus" : "plus";
  const symbolColor = category === "expense" ? "#FF0000" : "#2BCB79";

  return (
    <View style={styles.container}>
      <Icon name={symbol} size={40} color={symbolColor} style={styles.symbol} />

      <TextInput
        style={[styles.amountInput, { fontSize }]} // Apply dynamic font size
        value={amount}
        placeholder="0"
        placeholderTextColor="#C1C1C1"
        keyboardType="numeric"
        editable={false}
      />
      <TouchableOpacity style={styles.currencyButton}>
        <Text style={styles.currencyText}>{currency}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.arrow} onPress={() => setIndex(1)}>
        <Icon name="arrow-left" size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: "40%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingRight: 35,
    backgroundColor: "#FFF",
  },
  arrow: {
    width: 25,
    height: 90,
    backgroundColor: "#16B773",
    position: "absolute",
    top: 65,
    right: 0,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 2,
  },
  symbol: {
    marginRight: 10,
    position: "relative",
    top: -60,
  },
  currencyButton: {
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "#16B773",
    borderRadius: 20,
    marginLeft: 10,
    position: "relative",
    top: -60,
  },
  currencyText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  amountInput: {
    fontWeight: "bold",
    color: "#000",
    flex: 1,
    textAlign: "right",
    overflow: "scroll",
    position: "relative",
    top: -60,
  },
});

export default AmountInput;
