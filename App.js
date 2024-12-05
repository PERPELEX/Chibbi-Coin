import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeProvider, ThemeContext } from "./components/theme/themeContext";
import { Provider as PaperProvider } from "react-native-paper";
import Login from "./components/AuthenticationModule/login";
import HomeScreen from "./components/screens/HomeScreen";
import DetailsScreen from "./components/screens/DetailsScreen";
import SignUp from "./components/AuthenticationModule/SignUp";
import ForgetPassw from "./components/AuthenticationModule/forgetpassw";
import newPass from "./components/AuthenticationModule/confirmpass";
import FrontPage from "./components/AuthenticationModule/FrontPage";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <Tab.Navigator
                initialRouteName="ForgetPassword"
                activeColor={theme.colors.primary}
                inactiveColor={theme.colors.placeholder}
                barStyle={{ backgroundColor: theme.colors.surface }}
              >
                <Tab.Screen
                  name="Login"
                  component={Login}
                  options={{
                    tabBarLabel: "Login",
                    tabBarIcon: ({ color }) => (
                      <Icon name="login" color={color} size={26} />
                    ),
                  }}
                />
                <Tab.Screen
                  name="SignUp"
                  component={SignUp}
                  options={{
                    tabBarLabel: "SignUp",
                    tabBarIcon: ({ color }) => (
                      <Icon name="account" color={color} size={26} />
                    ),
                  }}
                />
              
                  <Tab.Screen
                  name="ForgetPassword"
                  component={newPass}
                  options={{
                    tabBarLabel: "forget",
                    tabBarIcon: ({ color }) => (
                      <Icon name="login" color={color} size={26} />
                    ),
                  }}
                />
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
};
