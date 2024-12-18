export const addBudget = (data, setData, newBudget) => {
  setData((prevData) => ({
    ...prevData,
    budget: [
      ...prevData.budget,
      {
        id: Date.now(),
        ...newBudget,
        date: new Date(),
      },
    ],
  }));
};

export const deleteBudget = (data, setData, budgetId) => {
  setData((prevData) => ({
    ...prevData,
    budget: prevData.budget.filter((budget) => budget.id !== budgetId),
  }));
};
