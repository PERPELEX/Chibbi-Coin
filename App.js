import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DataProvider } from "./components/contexts/DataContext"; // Import DataProvider
import HomeScreen from "./components/screens/HomeScreen";
import DetailsScreen from "./components/screens/DetailsScreen";
import Login from "./components/authentication/Login";
import SignUp from "./components/authentication/SignUp";
import ForgotPassword from "./components/authentication/ForgotPassword";
import ConfirmPassword from "./components/authentication/ConfirmPassword";
import FrontPage from "./components/authentication/FrontPage";
import BudgetBox from "./components/budget/BudgetBox";
import GoalBox from "./components/goals/GoalBox";
import BudgetDetail from "./components/screens/BudgetDetail";
import GoalDetail from "./components/screens/GoalDetail";
import CreateBudget from "./components/create/CreateBudget";
import CreateGoal from "./components/create/CreateGoal";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function LoginTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      activeColor="#000" // Replace with static color
      inactiveColor="#888" // Replace with static color
      barStyle={{ backgroundColor: "#fff", display: "none" }} // Replace with static color
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
        name="Confirm"
        component={ConfirmPassword}
        options={{
          tabBarLabel: "Confirm",
          tabBarIcon: ({ color }) => (
            <Icon name="login" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Forgot"
        component={ForgotPassword}
        options={{
          tabBarLabel: "Forgot",
          tabBarIcon: ({ color }) => (
            <Icon name="login" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#02192B" // Replace with static color
      inactiveColor="#fff" // Replace with static color
      barStyle={{
        backgroundColor: "#02192B",
        borderRadius: 26,
        paddingTop: 16,
      }}
      screenOptions={{
        tabBarLabel: () => null, // Hide the tab labels
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "home" : "home-outline"}
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "rocket" : "rocket-outline"}
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <DataProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="FrontPage">
            <Stack.Screen
              name="FrontPage"
              component={FrontPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BudgetBox"
              component={BudgetBox}
              options={{ title: "Budgets" }}
            />
            <Stack.Screen
              name="GoalBox"
              component={GoalBox}
              options={{ title: "Goals" }}
            />
            <Stack.Screen
              name="BudgetDetail"
              component={BudgetDetail}
              options={{ title: "Budget Detail" }}
            />
            <Stack.Screen
              name="GoalDetail"
              component={GoalDetail}
              options={{ title: "Goal Detail" }}
            />
            <Stack.Screen
              name="CreateBudget"
              component={CreateBudget}
              options={{ title: "Create Budget" }}
            />
            <Stack.Screen
              name="CreateGoal"
              component={CreateGoal}
              options={{ title: "Create Goal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DataProvider>
    </PaperProvider>
  );
}