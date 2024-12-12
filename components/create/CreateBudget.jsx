// import React, { useState, useEffect, useContext } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   TouchableOpacity,
// } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { useNavigation } from "@react-navigation/native";
// import { DataContext } from "../contexts/DataContext";
// import { formatDate } from "../utils/dateUtils"; // Import the utility function
// import { Picker } from "@react-native-picker/picker"; // Import Picker from the new package

// export default function CreateBudget() {
//   const { addBudget } = useContext(DataContext);
//   const navigation = useNavigation();
//   const [name, setName] = useState("");
//   const [amount, setAmount] = useState("");
//   const [duration, setDuration] = useState("weekly");
//   const [categories, setCategories] = useState([]);
//   const [showStartDatePicker, setShowStartDatePicker] = useState(false);
//   const [showEndDatePicker, setShowEndDatePicker] = useState(false);
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());

//   useEffect(() => {
//     // Reset fields when the component is mounted
//     setName("");
//     setAmount("");
//     setDuration("weekly");
//     setCategories([]);
//     setStartDate(new Date());
//     setEndDate(new Date());
//   }, []);

//   const handleSave = () => {
//     if (name && amount && categories.length > 0) {
//       const newBudget = {
//         name,
//         amount: parseFloat(amount),
//         spent: 0,
//         duration,
//         categories,
//         startDate: duration === "one-time" ? startDate : null,
//         endDate: duration === "one-time" ? endDate : null,
//       };
//       addBudget(newBudget);
//       navigation.goBack();
//     } else {
//       Alert.alert("Validation Error", "Please fill in all fields.");
//     }
//   };

//   const handleCategoryChange = (category) => {
//     setCategories((prevCategories) =>
//       prevCategories.includes(category)
//         ? prevCategories.filter((cat) => cat !== category)
//         : [...prevCategories, category]
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create Budget</Text>
//       <ScrollView>
//         <TextInput
//           style={styles.input}
//           placeholder="Budget Name"
//           value={name}
//           onChangeText={setName}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Budget Amount"
//           value={amount}
//           onChangeText={setAmount}
//           keyboardType="numeric"
//         />
//         <Text style={styles.label}>Duration</Text>
//         <Picker
//           selectedValue={duration}
//           style={styles.picker}
//           onValueChange={(itemValue) => setDuration(itemValue)}
//         >
//           <Picker.Item label="Week" value="weekly" />
//           <Picker.Item label="Month" value="monthly" />
//           <Picker.Item label="Year" value="yearly" />
//           <Picker.Item label="One-Time" value="one-time" />
//         </Picker>
//         {duration === "one-time" && (
//           <>
//             <TouchableOpacity
//               style={styles.dateButton}
//               onPress={() => setShowStartDatePicker(true)}
//             >
//               <Text style={styles.buttonText}>Select Start Date</Text>
//             </TouchableOpacity>
//             {showStartDatePicker && (
//               <DateTimePicker
//                 value={startDate}
//                 mode="date"
//                 display="spinner"
//                 onChange={(event, date) => {
//                   setShowStartDatePicker(false);
//                   if (date) setStartDate(date);
//                 }}
//               />
//             )}
//             <Text style={styles.selectedDate}>
//               Start Date: {formatDate(startDate)}
//             </Text>
//             <TouchableOpacity
//               style={styles.dateButton}
//               onPress={() => setShowEndDatePicker(true)}
//             >
//               <Text style={styles.buttonText}>Select End Date</Text>
//             </TouchableOpacity>
//             {showEndDatePicker && (
//               <DateTimePicker
//                 value={endDate}
//                 mode="date"
//                 display="spinner"
//                 onChange={(event, date) => {
//                   setShowEndDatePicker(false);
//                   if (date) setEndDate(date);
//                 }}
//               />
//             )}
//             <Text style={styles.selectedDate}>
//               End Date: {formatDate(endDate)}
//             </Text>
//           </>
//         )}
//         <Text style={styles.label}>Categories</Text>
//         {[
//           "Food and Drinks",
//           "Shopping",
//           "Transportation",
//           "Studies",
//           "Others",
//         ].map((category) => (
//           <View key={category} style={styles.checkboxContainer}>
//             <TouchableOpacity onPress={() => handleCategoryChange(category)}>
//               <Text style={styles.checkbox}>
//                 {categories.includes(category) ? "☑" : "☐"} {category}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         ))}
//       </ScrollView>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={styles.cancelBtn}
//           onPress={() => navigation.goBack()}
//         >
//           <Text style={styles.buttonText}>Cancel</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
//           <Text style={styles.buttonText}>Save</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#E8F5E9", // Light background color
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   input: {
//     height: 45,
//     borderColor: "#A5D6A7", // Light green border
//     borderWidth: 1,
//     borderRadius: 5, // Rounded corners
//     marginBottom: 15,
//     paddingHorizontal: 10,
//     backgroundColor: "#FFFFFF", // White background for inputs
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   picker: {
//     height: 50,
//     marginBottom: 15,
//     borderColor: "#A5D6A7",
//     borderWidth: 1,
//     borderRadius: 5,
//     backgroundColor: "#FFFFFF",
//   },
//   checkboxContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   checkbox: {
//     fontSize: 18,
//     marginRight: 10,
//   },
//   selectedDate: {
//     marginTop: 10,
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   dateButton: {
//     backgroundColor: "#34c759", // Button color
//     padding: 15,
//     borderRadius: 5,
//     marginBottom: 15,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   saveBtn: {
//     backgroundColor: "#34c759",
//     padding: 15,
//     borderRadius: 5,
//     flex: 1,
//   },
//   cancelBtn: {
//     backgroundColor: "tomato",
//     padding: 15,
//     borderRadius: 5,
//     flex: 1,
//     marginRight: 10,
//   },
//   buttonText: {
//     color: "white",
//     textAlign: "center",
//     fontWeight: "bold",
//   },
// });

import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { DataContext } from "../contexts/DataContext";
import { formatDate } from "../utils/dateUtils"; // Import the utility function
import { Picker } from "@react-native-picker/picker"; // Import Picker from the new package
import DefaultLayout from "../layout/DefaultLayout";
import Backbar from "../layout/Backbar";

// Utility function to format numbers with commas
const formatWithCommas = (value) => {
  const numericValue = value.replace(/[^\d]/g, ""); // Remove non-digit characters
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas
};

export default function CreateBudget() {
  const { addBudget } = useContext(DataContext);
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("weekly");
  const [categories, setCategories] = useState([]);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    // Reset fields when the component is mounted
    setName("");
    setAmount("");
    setDuration("weekly");
    setCategories([]);
    setStartDate(new Date());
    setEndDate(new Date());
  }, []);

  const handleSave = () => {
    if (name && amount && categories.length > 0) {
      const newBudget = {
        name,
        amount: parseFloat(amount.replace(/,/g, "")), // Remove commas for calculation
        spent: 0,
        duration,
        categories,
        startDate: duration === "one-time" ? startDate : null,
        endDate: duration === "one-time" ? endDate : null,
      };
      addBudget(newBudget);
      navigation.goBack();
    } else {
      Alert.alert("Validation Error", "Please fill in all fields.");
    }
  };

  const handleCategoryChange = (category) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  const handleAmountChange = (text) => {
    const formattedValue = formatWithCommas(text);
    setAmount(formattedValue);
  };

  return (
    <DefaultLayout>
      <Backbar name="Create Budget" url="Details" />
      <View style={styles.container}>
        <Text style={styles.title}>Create Budget</Text>
        <ScrollView>
          <TextInput
            style={styles.input}
            placeholder="Budget Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Budget Amount"
            value={amount}
            onChangeText={handleAmountChange} // Use the new input handler
            keyboardType="numeric"
          />
          <Text style={styles.label}>Duration</Text>
          <Picker
            selectedValue={duration}
            style={styles.picker}
            onValueChange={(itemValue) => setDuration(itemValue)}
          >
            <Picker.Item label="Week" value="weekly" />
            <Picker.Item label="Month" value="monthly" />
            <Picker.Item label="Year" value="yearly" />
            <Picker.Item label="One-Time" value="one-time" />
          </Picker>
          {duration === "one-time" && (
            <>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowStartDatePicker(true)}
              >
                <Text style={styles.buttonText}>Select Start Date</Text>
              </TouchableOpacity>
              {showStartDatePicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="spinner"
                  onChange={(event, date) => {
                    setShowStartDatePicker(false);
                    if (date) setStartDate(date);
                  }}
                />
              )}
              <Text style={styles.selectedDate}>
                Start Date: {formatDate(startDate)}
              </Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowEndDatePicker(true)}
              >
                <Text style={styles.buttonText}>Select End Date</Text>
              </TouchableOpacity>
              {showEndDatePicker && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="spinner"
                  onChange={(event, date) => {
                    setShowEndDatePicker(false);
                    if (date) setEndDate(date);
                  }}
                />
              )}
              <Text style={styles.selectedDate}>
                End Date: {formatDate(endDate)}
              </Text>
            </>
          )}
          <Text style={styles.label}>Categories</Text>
          {[
            "Food and Drinks",
            "Shopping",
            "Transportation",
            "Studies",
            "Others",
          ].map((category) => (
            <View key={category} style={styles.checkboxContainer}>
              <TouchableOpacity onPress={() => handleCategoryChange(category)}>
                <Text style={styles.checkbox}>
                  {categories.includes(category) ? "☑" : "☐"} {category}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E8F5E9", // Light background color
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 45,
    borderColor: "#A5D6A7", // Light green border
    borderWidth: 1,
    borderRadius: 5, // Rounded corners
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF", // White background for inputs
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  picker: {
    height: 50,
    marginBottom: 15,
    borderColor: "#A5D6A7",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    fontSize: 18,
    marginRight: 10,
  },
  selectedDate: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  dateButton: {
    backgroundColor: "#34c759", // Button color
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  saveBtn: {
    backgroundColor: "#34c759",
    padding: 15,
    borderRadius: 5,
    flex: 1,
  },
  cancelBtn: {
    backgroundColor: "tomato",
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
