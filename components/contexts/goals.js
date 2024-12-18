export const addGoal = (data, setData, newGoal) => {
  setData((prevData) => ({
    ...prevData,
    goals: [
      ...prevData.goals,
      {
        id: Date.now(),
        ...newGoal,
        desiredDate: newGoal.desiredDate || new Date(),
      },
    ],
  }));
};

export const updateGoal = (data, setData, goalId, amountToAdd) => {
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

export const deleteGoal = (data, setData, goalId) => {
  setData((prevData) => ({
    ...prevData,
    goals: prevData.goals.filter((goal) => goal.id !== goalId),
  }));
};
