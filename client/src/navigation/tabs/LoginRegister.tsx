import React from "react";
// Third party
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
// Screens

// Styles
import {globalColors} from "../../components/styles/globalStyles";
import Login from "../../screens/Login";
import Register from "../../screens/Register";
// Tab Navigator
const TabNavigator = createMaterialTopTabNavigator();

export const LoginRegisterTabs = () => {
  return (
    <>
      <TabNavigator.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            let iconName;
            let iconProvider;

            if (route.name === "Login") {
              iconProvider = AntDesign;
              iconName = focused ? "login" : "login";
            } else if (route.name === "Register") {
              iconProvider = FontAwesome;
              iconName = focused ? "user-check" : "user-check";
            } else if (route.name === "Home") {
              iconProvider = FontAwesome;
              iconName = focused ? "home" : "home";
            }

            // You can return any component that you like here!
            return iconProvider === AntDesign ? (
              // @ts-ignore
              <AntDesign name={iconName} size={size} color={color} />
            ) : (
              // @ts-ignore
              <FontAwesome name={iconName} size={size} color={color} />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: globalColors.backgroundColorTomato,
          inactiveTintColor: "gray",

          tabStyle: {marginBottom: 4},
        }}>
        <TabNavigator.Screen name="Login" component={Login} />
        <TabNavigator.Screen name="Register" component={Register} />
      </TabNavigator.Navigator>
    </>
  );
};
