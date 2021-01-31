import React from "react";

// 3rd Party
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

// Context
// import {useAuthContext} from "../components/context/AuthContext";
// import {LoginRegisterTabs} from "./tabs/LoginRegisterTabs";
// Main Tabs
import {MainTabs} from "./tabs/MainTabs";

const authenticated = false;
// Stack Navigator
const Stack = createStackNavigator();
const StackNavigator = () => {
  // const {authenticated} = useAuthContext();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={MainTabs}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginRegisterTabs}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
