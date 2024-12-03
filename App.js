import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeProvider, ThemeContext } from "./components/theme/themeContext";
import HomeScreen from "./components/screens/HomeScreen";
import DetailsScreen from "./components/screens/DetailsScreen";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <Tab.Navigator
                initialRouteName="Home"
                activeColor={theme.colors.primary}
                inactiveColor={theme.colors.placeholder}
                barStyle={{ backgroundColor: theme.colors.surface }}
              >
                <Tab.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => (
                      <Icon name="home" color={color} size={26} />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Details"
                  component={DetailsScreen}
                  options={{
                    tabBarLabel: "Details",
                    tabBarIcon: ({ color }) => (
                      <Icon name="details" color={color} size={26} />
                    ),
                  }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </PaperProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}
