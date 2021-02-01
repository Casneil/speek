import React from "react";
// Third party
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
// Screens

import Home from "../../screens/Home";
import CreatePost from "../../screens/CreatePost";
import Users from "../../components/Users";
import Logout from "../../screens/Logout";

// Styles
import {globalColors} from "../../components/styles/globalStyles";

// Tab Navigator
const TabNavigator = createMaterialTopTabNavigator();
export const MainTabs = () => {
  return (
    <>
      <TabNavigator.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            let iconName;
            let iconProvider;

            if (route.name === "Home") {
              iconProvider = FontAwesome;
              iconName = focused ? "home" : "home";
            }
            if (route.name === "CreatePost") {
              iconProvider = Entypo;
              iconName = focused ? "new-message" : "new-message";
            }
            if (route.name === "Categories") {
              iconProvider = FontAwesome;
              iconName = focused ? "tasks" : "tasks";
            }
            if (route.name === "Users") {
              iconProvider = FontAwesome;
              iconName = focused ? "users" : "users";
            }
            if (route.name === "LogOut") {
              iconProvider = FontAwesome;
              iconName = focused ? "user-times" : "user-times";
            }

            // You can return any component that you like here!
            return iconProvider === Entypo ? (
              // @ts-ignore
              <Entypo name={iconName} size={size} color={color} />
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
        <TabNavigator.Screen name="Home" component={Home} />
        <TabNavigator.Screen name="Post" component={CreatePost} />
        <TabNavigator.Screen name="Users" component={Users} />
        <TabNavigator.Screen name="LogOut" component={Logout} />
      </TabNavigator.Navigator>
    </>
  );
};
