export const updateUserImage = (data, setData, imageUri) => {
  setData((prevData) => ({
    ...prevData,
    user: {
      ...prevData.user,
      imageUri,
    },
  }));
};

export const updateUserField = (data, setData, field, value) => {
  setData((prevData) => ({
    ...prevData,
    user: {
      ...prevData.user,
      [field]: value,
    },
  }));
};
