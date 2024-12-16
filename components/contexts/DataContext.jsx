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
        startDate: null,
        endDate: null,
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
      {
        id: 1,
        name: "Grocery",
        amount: 50.75,
        type: "deducted",
        currency: "USD",
      },
      { id: 2, name: "Salary", amount: 1200.0, type: "added", currency: "USD" },
      {
        id: 3,
        name: "Internet Bill",
        amount: 60.0,
        type: "deducted",
        currency: "PKR",
      },
    ],
    upcomingTransactions: [
      {
        id: 1,
        name: "Rent",
        amount: 800.0,
        date: "2024-12-01",
        currency: "USD",
      },
      {
        id: 2,
        name: "Car Insurance",
        amount: 200.0,
        date: "2024-12-05",
        currency: "PKR",
      },
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
            currency: newTransaction.currency,
            type: newTransaction.type,
            date: newTransaction.date,
            notes: newTransaction.notes,
            category: newTransaction.category,
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
            currency: newTransaction.currency,
            type: newTransaction.type,
            date: newTransaction.date,
            notes: newTransaction.notes,
            category: newTransaction.category,
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
          id: Date.now(),
          name: newBudget.name,
          amount: newBudget.amount,
          spent: newBudget.spent || 0,
          duration: newBudget.duration,
          categories: newBudget.categories || [],
          date: new Date(),
          startDate: newBudget.startDate || null,
          endDate: newBudget.endDate || null,
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
          id: Date.now(),
          name: newGoal.name,
          target: newGoal.target,
          saved: newGoal.saved || 0,
          desiredDate: newGoal.desiredDate || new Date(),
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
            }
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

  const deleteGoal = (goalId) => {
    setData((prevData) => ({
      ...prevData,
      goals: prevData.goals.filter((goal) => goal.id !== goalId),
    }));
  };

  const deleteBudget = (budgetId) => {
    setData((prevData) => ({
      ...prevData,
      budget: prevData.budget.filter((budget) => budget.id !== budgetId),
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
        deleteGoal,
        deleteBudget,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
