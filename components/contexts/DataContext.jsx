import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
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
      { id: 1, name: "Grocery", amount: 50.75, type: "deducted" },
      { id: 2, name: "Salary", amount: 1200.0, type: "added" },
      { id: 3, name: "Internet Bill", amount: 60.0, type: "deducted" },
    ],
    upcomingTransactions: [
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
        deleteGoal,
        deleteBudget,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
