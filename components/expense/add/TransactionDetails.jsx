import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";

const TransactionDetails = ({
  notes,
  setNotes,
  subCategory,
  setSubCategory,
  date,
  setDate,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState("daily");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const categories = [
    { label: "Food and Drinks", icon: "cutlery" },
    { label: "Shopping", icon: "shopping-cart" },
    { label: "Transportation", icon: "bus" },
    { label: "Studies", icon: "book" },
    { label: "Others", icon: "ellipsis-h" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={styles.input}
        placeholder="Add notes"
        value={notes}
        onChangeText={setNotes}
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={subCategory}
          onValueChange={(itemValue) => setSubCategory(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {categories.map((category, index) => (
            <Picker.Item
              key={index}
              label={category.label}
              value={category.label}
              color="#000" // Set text color to black
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Date</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.input}
      >
        <Text style={styles.dateText}>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Recurring Expense</Text>
        <Switch
          value={isRecurring}
          onValueChange={(value) => setIsRecurring(value)}
          trackColor={{ false: "#767577", true: "#76dbbc" }}
          thumbColor={isRecurring ? "#16B773" : "#f4f3f4"}
        />
      </View>

      {isRecurring && (
        <>
          <Text style={styles.label}>Frequency</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={frequency}
              onValueChange={(itemValue) => setFrequency(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Daily" value="daily" />
              <Picker.Item label="Weekly" value="weekly" />
              <Picker.Item label="Monthly" value="monthly" />
              <Picker.Item label="Yearly" value="yearly" />
            </Picker>
          </View>

          <View style={styles.dateRow}>
            <View style={styles.dateColumn}>
              <Text style={styles.label}>Start Date</Text>
              <TouchableOpacity
                onPress={() => setShowStartDatePicker(true)}
                style={styles.input}
              >
                <Text style={styles.dateText}>{startDate.toDateString()}</Text>
              </TouchableOpacity>
              {showStartDatePicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="spinner"
                  onChange={handleStartDateChange}
                />
              )}
            </View>

            <View style={styles.dateColumn}>
              <Text style={styles.label}>End Date</Text>
              <TouchableOpacity
                onPress={() => setShowEndDatePicker(true)}
                style={styles.input}
              >
                <Text style={styles.dateText}>{endDate.toDateString()}</Text>
              </TouchableOpacity>
              {showEndDatePicker && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="spinner"
                  onChange={handleEndDateChange}
                />
              )}
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    color: "#000",
  },
  label: {
    color: "#000",
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    backgroundColor: "#eee",
    color: "#000",
    padding: 18,
    marginBottom: 15,
    borderRadius: 5,
  },
  pickerContainer: {
    backgroundColor: "#eee",
    borderRadius: 5,
    marginBottom: 15,
    color: "#000",
  },
  picker: {
    color: "#000",
  },
  pickerItem: {
    color: "#000", // Set text color to black
  },
  dateText: {
    fontSize: 16, // Increase the font size for the date text
    color: "#000",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  dateColumn: {
    flex: 1,
    // marginRight: 10,
  },
});

export default TransactionDetails;
