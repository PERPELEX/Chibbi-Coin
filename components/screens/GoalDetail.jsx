// import React, { useState, useContext, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import { DataContext } from "../contexts/DataContext";
// import { formatDate } from "../utils/dateUtils"; // Import the utility function
// import { ProgressCircle } from "react-native-svg-charts"; // Ensure to install this package
// import { formatCurrency } from "../utils/currencyUtils";

// export default function GoalDetail({ route }) {
//   const { goal } = route.params;
//   const { data, updateGoal } = useContext(DataContext);
//   const [currentGoal, setCurrentGoal] = useState(goal);
//   const [amountToAdd, setAmountToAdd] = useState("");

//   useEffect(() => {
//     const updatedGoal = data.goals.find((g) => g.id === goal.id);
//     if (updatedGoal) {
//       setCurrentGoal(updatedGoal);
//     }
//   }, [data.goals, goal.id]);

//   const handleAddAmount = () => {
//     const amount = parseFloat(amountToAdd);
//     if (!isNaN(amount) && amount > 0) {
//       updateGoal(goal.id, amount);
//       setAmountToAdd("");
//     }
//   };

//   const progress = (currentGoal.saved / currentGoal.target) * 100;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{currentGoal.name} Details</Text>
//       <View style={styles.progressContainer}>
//         <View style={styles.progressCircleContainer}>
//           <ProgressCircle
//             style={styles.progressCircle}
//             progress={currentGoal.saved / currentGoal.target}
//             progressColor={"#34c759"}
//             strokeWidth={20}
//           />
//           <View style={styles.percentageContainer}>
//             <Text style={styles.progressPercentage}>
//               {Math.round(progress)}%
//             </Text>
//           </View>
//         </View>
//         <Text style={styles.amountText}>
//           {formatCurrency(currentGoal.saved)} PKR /{" "}
//           {formatCurrency(currentGoal.target)} PKR
//         </Text>
//       </View>
//       <Text style={styles.detailText}>
//         Desired Date: {formatDate(currentGoal.desiredDate)}
//       </Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Amount to Add"
//         value={amountToAdd}
//         onChangeText={setAmountToAdd}
//         keyboardType="numeric"
//       />
//       <TouchableOpacity style={styles.button} onPress={handleAddAmount}>
//         <Text style={styles.buttonText}>Add Amount</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#E8F5E9",
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 2, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#34c759",
//     textAlign: "center",
//   },
//   progressContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   progressCircleContainer: {
//     position: "relative",
//     alignItems: "center",
//   },
//   progressCircle: {
//     height: 150,
//     width: 150,
//   },
//   percentageContainer: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   progressPercentage: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#34c759",
//   },
//   amountText: {
//     textAlign: "center",
//     fontSize: 18,
//     marginTop: 10,
//     color: "#333",
//   },
//   detailText: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: "#333",
//   },
//   input: {
//     height: 40,
//     borderColor: "#A5D6A7",
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   button: {
//     backgroundColor: "#34c759",
//     padding: 15,
//     borderRadius: 5,
//     alignItems: "center",
//     marginVertical: 5,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
// });

import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { DataContext } from "../contexts/DataContext";
import { formatDate } from "../utils/dateUtils"; // Import the utility function
import { ProgressCircle } from "react-native-svg-charts"; // Ensure to install this package
import { formatCurrency } from "../utils/currencyUtils";

// Utility function to format numbers with commas
const formatWithCommas = (value) => {
  const numericValue = value.replace(/[^\d]/g, ""); // Remove non-digit characters
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas
};

export default function GoalDetail({ route }) {
  const { goal } = route.params;
  const { data, updateGoal } = useContext(DataContext);
  const [currentGoal, setCurrentGoal] = useState(goal);
  const [amountToAdd, setAmountToAdd] = useState("");

  useEffect(() => {
    const updatedGoal = data.goals.find((g) => g.id === goal.id);
    if (updatedGoal) {
      setCurrentGoal(updatedGoal);
    }
  }, [data.goals, goal.id]);

  const handleAddAmount = () => {
    const amount = parseFloat(amountToAdd.replace(/,/g, "")); // Remove commas for calculation
    if (!isNaN(amount) && amount > 0) {
      updateGoal(goal.id, amount);
      setAmountToAdd("");
    }
  };

  const handleInputChange = (text) => {
    const formattedValue = formatWithCommas(text);
    setAmountToAdd(formattedValue);
  };

  const progress = (currentGoal.saved / currentGoal.target) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentGoal.name} Details</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressCircleContainer}>
          <ProgressCircle
            style={styles.progressCircle}
            progress={currentGoal.saved / currentGoal.target}
            progressColor={"#34c759"}
            strokeWidth={20}
          />
          <View style={styles.percentageContainer}>
            <Text style={styles.progressPercentage}>
              {Math.round(progress)}%
            </Text>
          </View>
        </View>
        <Text style={styles.amountText}>
          {formatCurrency(currentGoal.saved)} PKR /{" "}
          {formatCurrency(currentGoal.target)} PKR
        </Text>
      </View>
      <Text style={styles.detailText}>
        Desired Date: {formatDate(currentGoal.desiredDate)}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Amount to Add"
        value={amountToAdd}
        onChangeText={handleInputChange} // Use the new input handler
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddAmount}>
        <Text style={styles.buttonText}>Add Amount</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#34c759",
    textAlign: "center",
  },
  progressContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  progressCircleContainer: {
    position: "relative",
    alignItems: "center",
  },
  progressCircle: {
    height: 150,
    width: 150,
  },
  percentageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#34c759",
  },
  amountText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 10,
    color: "#333",
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#A5D6A7",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#34c759",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
