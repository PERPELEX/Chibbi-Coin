import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      password: null,
      currency: "PKR",
      imageUri: null,
    },
    budget: [
      {
        id: 1,
        name: "Food",
        amount: 500,
        spent: 300,
        duration: "Month",
        categories: ["Food and Drinks"],
        date: new Date(),
        startDate: null, // For "one-time" budgets, optional
        endDate: null, // For "one-time" budgets, optional
      },
      {
        id: 2,
        name: "Fun",
        amount: 10000,
        spent: 5000,
        duration: "Year",
        categories: ["Entertainment"],
        date: new Date(),
        startDate: null,
        endDate: null,
      },
    ],
    goals: [
      {
        id: 1,
        name: "Car",
        target: 500000,
        saved: 150000,
        desiredDate: new Date(),
      },
      {
        id: 2,
        name: "Bike",
        target: 100000,
        saved: 50000,
        desiredDate: new Date(),
      },
    ],
    balance: 1200.5,
    income: 3000.0,
    expense: 1800.0,
    recentTransactions: [
      { id: 1, name: "Grocery", amount: 50.75, type: "deducted" },
      { id: 2, name: "Salary", amount: 1200.0, type: "added" },
      { id: 3, name: "Internet Bill", amount: 60.0, type: "deducted" },
    ],
    upcomingTransactions: [
      { id: 1, name: "Rent", amount: 800.0, date: "2024-12-01" },
      { id: 2, name: "Car Insurance", amount: 200.0, date: "2024-12-05" },
    ],
    notifications: [
      { id: 1, title: "Welcome", details: "Welcome to Chibi-Coin!" },
      {
        id: 2,
        title: "Budget Alert",
        details: "You have exceeded your budget for Food.",
      },
      {
        id: 3,
        title: "Goal Achieved",
        details: "Congratulations! You have achieved your Bike goal.",
      },
    ],
  });

  const addTransaction = (newTransaction) => {
    const transactionDate = new Date(newTransaction.date);
    const currentDate = new Date();

    if (transactionDate > currentDate) {
      // Add to upcomingTransactions if the transaction date is in the future
      setData((prevData) => ({
        ...prevData,
        upcomingTransactions: [
          ...prevData.upcomingTransactions,
          {
            id: Date.now(), // Generate unique ID
            name: newTransaction.name,
            amount: newTransaction.amount,
            date: newTransaction.date,
            notes: newTransaction.notes,
            subCategory: newTransaction.subCategory,
            isRecurring: newTransaction.isRecurring,
            frequency: newTransaction.frequency,
            startDate: newTransaction.startDate,
            endDate: newTransaction.endDate,
          },
        ],
      }));
    } else {
      // Add to recentTransactions if the transaction date is in the past or today
      setData((prevData) => ({
        ...prevData,
        recentTransactions: [
          ...prevData.recentTransactions,
          {
            id: Date.now(), // Generate unique ID
            name: newTransaction.name,
            amount: newTransaction.amount,
            type: newTransaction.type,
            date: newTransaction.date,
            notes: newTransaction.notes,
            subCategory: newTransaction.subCategory,
            isRecurring: newTransaction.isRecurring,
            frequency: newTransaction.frequency,
            startDate: newTransaction.startDate,
            endDate: newTransaction.endDate,
          },
        ],
      }));
    }
  };

  const addBudget = (newBudget) => {
    setData((prevData) => ({
      ...prevData,
      budget: [
        ...prevData.budget,
        {
          id: Date.now(), // Generate unique ID
          name: newBudget.name,
          amount: newBudget.amount,
          spent: newBudget.spent || 0, // Default spent to 0 if not provided
          duration: newBudget.duration,
          categories: newBudget.categories || [], // Default to empty array if not provided
          date: new Date(), // Automatically set to current date
          startDate: newBudget.startDate || null, // Optional for "one-time" budgets
          endDate: newBudget.endDate || null, // Optional for "one-time" budgets
        },
      ],
    }));
  };

  const addGoal = (newGoal) => {
    setData((prevData) => ({
      ...prevData,
      goals: [
        ...prevData.goals,
        {
          id: Date.now(), // Generate unique ID
          name: newGoal.name,
          target: newGoal.target,
          saved: newGoal.saved || 0, // Default saved to 0 if not provided
          desiredDate: newGoal.desiredDate || new Date(), // Default to current date if not provided
        },
      ],
    }));
  };

  const updateGoal = (goalId, amountToAdd) => {
    setData((prevData) => ({
      ...prevData,
      goals: prevData.goals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              saved: parseFloat((goal.saved + amountToAdd).toFixed(2)),
            } // Ensure precision
          : goal
      ),
    }));
  };

  const updateUserImage = (imageUri) => {
    setData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        imageUri,
      },
    }));
  };

  const updateUserField = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        [field]: value,
      },
    }));
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        addBudget,
        addGoal,
        updateGoal,
        updateUserImage,
        updateUserField,
        addTransaction,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
