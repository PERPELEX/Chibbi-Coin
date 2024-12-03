// src/components/theme/theme.js
import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6200ee",
    accent: "#03dac4",
    background: "#f6f6f6",
    surface: "#ffffff",
    text: "#000000",
    disabled: "#f0f0f0",
    placeholder: "#a0a0a0",
    backdrop: "#f0f0f0",
  },
};

export default theme;
