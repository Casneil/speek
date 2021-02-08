import React from "react";
import {TouchableOpacity} from "react-native";

// 3rd Party
import {createStackNavigator} from "@react-navigation/stack";
import AntDesign from "react-native-vector-icons/AntDesign";
import {useNavigation} from "@react-navigation/native";

// Context
import {useAuthContext} from "../components/context/AuthContext";
// import {LoginRegisterTabs} from "./tabs/LoginRegisterTabs";
// Main Tabs
import {MainTabs} from "./tabs/MainTabs";
import {LoginRegisterTabs} from "./tabs/LoginRegister";

// Stack Navigator
const Stack = createStackNavigator();
const StackNavigator = () => {
  const navigation = useNavigation();
  const {authenticated} = useAuthContext();

  return (
    <Stack.Navigator>
      {authenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={MainTabs}
            options={{
              headerShown: true,
              headerTitle: () => (
                // @ts-ignore
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <AntDesign name="menuunfold" style={{fontSize: 20}} />
                </TouchableOpacity>
              ),
              headerStyle: {height: 50},
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginRegisterTabs}
            options={{
              headerShown: true,
              headerTitle: () => (
                // @ts-ignore
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <AntDesign name="menuunfold" style={{fontSize: 20}} />
                </TouchableOpacity>
              ),
              headerStyle: {height: 50},
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
