import React from "react";
// Third party
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
// Screens
import Login from "../../screens/Login";
import Register from "../../screens/Register";
// Styles
import {globalColors} from "../../components/styles/globalStyles";
// Tab Navigator
const TabNavigator = createBottomTabNavigator();

export const LoginRegisterTabs = () => {
  return (
    <>
      <TabNavigator.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let iconProvider;

            if (route.name === "Login") {
              iconProvider = AntDesign;
              iconName = focused ? "login" : "login";
              size = 25;
            } else if (route.name === "Register") {
              iconProvider = FontAwesome;
              iconName = focused ? "user-check" : "user-check";
              size = 25;
            } else if (route.name === "Home") {
              iconProvider = FontAwesome;
              iconName = focused ? "home" : "home";
              size = 25;
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
        }}>
        <TabNavigator.Screen name="Login" component={Login} />
        <TabNavigator.Screen name="Register" component={Register} />
      </TabNavigator.Navigator>
    </>
  );
};
