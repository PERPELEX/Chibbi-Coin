import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DataContext } from "../contexts/DataContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import ViewHeader from "./ViewHeader";
import DefaultLayout from "../layout/DefaultLayout";

export default function ViewRecentTransaction() {
  const { data, updateRecentTransaction, deleteRecentTransaction } =
    useContext(DataContext);
  const route = useRoute();
  const navigation = useNavigation();
  const { transactionId } = route.params;

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [type, setType] = useState("deducted");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("Others");
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState("daily");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempNotes, setTempNotes] = useState("");

  // Effect to update state when transactionId changes
  useEffect(() => {
    const transaction = data.recentTransactions.find(
      (tx) => tx.id === transactionId
    );

    if (transaction) {
      setName(transaction.name);
      setAmount(transaction.amount.toString());
      setCurrency(transaction.currency);
      setType(transaction.type);
      setDate(new Date(transaction.date));
      setNotes(transaction.notes || "");
      setCategory(transaction.category || "Others");
      setIsRecurring(transaction.isRecurring || false);
      setFrequency(transaction.frequency || "daily");
      setStartDate(new Date(transaction.startDate || Date.now()));
      setEndDate(new Date(transaction.endDate || Date.now()));
    }
  }, [transactionId, data.recentTransactions]);

  const handleDateChange = (event, selectedDate) => {
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const handleStartDateChange = (event, selectedDate) => {
    if (event.type === "set" && selectedDate) {
      setStartDate(selectedDate);
    }
    setShowStartDatePicker(false);
  };

  const handleEndDateChange = (event, selectedDate) => {
    if (event.type === "set" && selectedDate) {
      setEndDate(selectedDate);
    }
    setShowEndDatePicker(false);
  };

  const handleSaveNotes = () => {
    setNotes(tempNotes);
    setModalVisible(false);
  };

  const handleSaveTransaction = () => {
    const updatedTransaction = {
      id: transactionId,
      name,
      amount: parseFloat(amount),
      currency,
      type,
      date: date.toISOString(),
      notes,
      category,
      isRecurring,
      frequency,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    updateRecentTransaction(updatedTransaction);
    Alert.alert("Success", "Transaction updated successfully!");
    navigation.goBack();
  };

  const handleDeleteTransaction = () => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteRecentTransaction(transactionId);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const categories = [
    { label: "Food and Drinks", icon: "cutlery" },
    { label: "Shopping", icon: "shopping-cart" },
    { label: "Transportation", icon: "bus" },
    { label: "Studies", icon: "book" },
    { label: "Others", icon: "ellipsis-h" },
  ];

  return (
    <DefaultLayout>
      <View style={styles.container}>
        <ViewHeader
          onClose={() => navigation.goBack()}
          title="Transaction Details"
          handleSaveTransaction={handleSaveTransaction}
          close={true}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Currency</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={currency}
              onValueChange={(itemValue) => setCurrency(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="USD" value="USD" />
              <Picker.Item label="PKR" value="PKR" />
            </Picker>
          </View>

          <Text style={styles.label}>Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={type}
              onValueChange={(itemValue) => setType(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Expense" value="deducted" />
              <Picker.Item label="Income" value="added" />
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

          <Text style={styles.label}>Notes</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.notesText}>{notes || "Add notes"}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {categories.map((category, index) => (
                <Picker.Item
                  key={index}
                  label={category.label}
                  value={category.label}
                  color="#000"
                />
              ))}
            </Picker>
          </View>

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
                    <Text style={styles.dateText}>
                      {startDate.toDateString()}
                    </Text>
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
                    <Text style={styles.dateText}>
                      {endDate.toDateString()}
                    </Text>
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

          {/* <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveTransaction}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteTransaction}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Notes</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter notes"
                value={tempNotes}
                onChangeText={setTempNotes}
                multiline
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleSaveNotes}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
  },
  label: {
    color: "#000",
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    fontSize: 16,
    backgroundColor: "#eee",
    color: "#000",
    padding: 18,
    marginBottom: 15,
    borderRadius: 5,
  },
  notesText: {
    color: "#000",
    fontSize: 16,
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
    color: "#000",
  },
  dateText: {
    fontSize: 16,
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
  },
  saveButton: {
    backgroundColor: "#2BCB79",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  deleteButton: {
    backgroundColor: "#fa5252",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  modalInput: {
    fontSize: 16,
    backgroundColor: "#eee",
    color: "#000",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    height: 100,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 40,
  },
  modalButton: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#fa5252",
  },
  saveButton: {
    backgroundColor: "#2BCB79",
  },
});
