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
// import { formatDate } from "../utils/dateUtils";

// export default function CreateGoal() {
//   const { addGoal } = useContext(DataContext);
//   const navigation = useNavigation();
//   const [name, setName] = useState("");
//   const [target, setTarget] = useState("");
//   const [saved, setSaved] = useState("");
//   const [desiredDate, setDesiredDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   useEffect(() => {
//     // Reset fields when the component is mounted
//     setName("");
//     setTarget("");
//     setSaved("");
//     setDesiredDate(new Date());
//   }, []);

//   const handleSave = () => {
//     // Validate input fields
//     if (!name || !target || !saved) {
//       Alert.alert("Validation Error", "Please fill in all fields.");
//       return;
//     }

//     const newGoal = {
//       name,
//       target: parseFloat(target),
//       saved: parseFloat(saved) || 0,
//       desiredDate,
//     };

//     addGoal(newGoal);
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create Goal</Text>
//       <ScrollView>
//         <TextInput
//           style={styles.input}
//           placeholder="Goal Name"
//           value={name}
//           onChangeText={setName}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Target Amount"
//           value={target}
//           onChangeText={setTarget}
//           keyboardType="numeric"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Saved Already"
//           value={saved}
//           onChangeText={setSaved}
//           keyboardType="numeric"
//         />
//         <TouchableOpacity
//           style={styles.dateButton}
//           onPress={() => setShowDatePicker(true)}
//         >
//           <Text style={styles.buttonText}>Select Desired Date</Text>
//         </TouchableOpacity>
//         {showDatePicker && (
//           <DateTimePicker
//             value={desiredDate}
//             mode="date"
//             display="spinner"
//             onChange={(event, date) => {
//               setShowDatePicker(false);
//               if (date) setDesiredDate(date);
//             }}
//           />
//         )}
//         <Text style={styles.selectedDate}>
//           Desired Date: {formatDate(desiredDate)}
//         </Text>
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
//     backgroundColor: "#E8F5E9",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   input: {
//     height: 45,
//     borderColor: "#A5D6A7",
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//     backgroundColor: "#FFFFFF",
//   },
//   selectedDate: {
//     marginTop: 10,
//     marginBottom: 10,
//     textAlign: "center",
//     fontSize: 16,
//     color: "#555",
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
//   dateButton: {
//     backgroundColor: "#34c759",
//     padding: 15,
//     borderRadius: 5,
//     marginBottom: 15,
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
import { formatDate } from "../utils/dateUtils";

const formatWithCommas = (value) => {
  const numericValue = value.replace(/[^\d]/g, "");
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function CreateGoal() {
  const { addGoal } = useContext(DataContext);
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");
  const [desiredDate, setDesiredDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    setName("");
    setTarget("");
    setSaved("");
    setDesiredDate(new Date());
  }, []);

  const handleInputChange = (text, setter) => {
    const formattedValue = formatWithCommas(text);
    setter(formattedValue);
  };

  const handleSave = () => {
    if (!name || !target || !saved) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    const newGoal = {
      name,
      target: parseFloat(target.replace(/,/g, "")), // Remove commas for calculation
      saved: parseFloat(saved.replace(/,/g, "")) || 0,
      desiredDate,
    };

    addGoal(newGoal);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Goal</Text>
      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Goal Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Target Amount"
          value={target}
          onChangeText={(text) => handleInputChange(text, setTarget)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Saved Already"
          value={saved}
          onChangeText={(text) => handleInputChange(text, setSaved)}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.buttonText}>Select Desired Date</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={desiredDate}
            mode="date"
            display="spinner"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setDesiredDate(date);
            }}
          />
        )}
        <Text style={styles.selectedDate}>
          Desired Date: {formatDate(desiredDate)}
        </Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E8F5E9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 45,
    borderColor: "#A5D6A7",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
  },
  selectedDate: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
    color: "#555",
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
  dateButton: {
    backgroundColor: "#34c759",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
});
