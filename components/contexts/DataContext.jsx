// src/contexts/DataContext.js
import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    user: null,
    budget: [
      {
        name: "Food",
        amount: 500,
        spent: 300,
      },
      {
        name: "Fun",
        amount: 10000,
        spent: 5000,
      },
    ],
    goals: [
      {
        name: "Car",
        target: 500000,
        saved: 150000,
      },
      {
        name: "Bike",
        target: 100000,
        saved: 50000,
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

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
