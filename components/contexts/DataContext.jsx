import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    user: null,
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
      { id: 1, name: "Grocery", amount: 50.75 },
      { id: 2, name: "Electricity Bill", amount: 120.0 },
      { id: 3, name: "Internet Bill", amount: 60.0 },
    ],
    upcomingExpenses: [
      { id: 1, name: "Rent", amount: 800.0, date: "2024-12-01" },
      { id: 2, name: "Car Insurance", amount: 200.0, date: "2024-12-05" },
    ],
  });

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

  return (
    <DataContext.Provider
      value={{ data, setData, addBudget, addGoal, updateGoal }}
    >
      {children}
    </DataContext.Provider>
  );
};
