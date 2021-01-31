import React from "react";
// Third party
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
// Screens

import Home from "../../screens/Home";
import CreatePost from "../../screens/CreatePost";
import Users from "../../components/Users";
import Category from "../../screens/Category";
import Logout from "../../screens/Logout";

// Styles
import {globalColors} from "../../components/styles/globalStyles";

// Tab Navigator
const TabNavigator = createBottomTabNavigator();
export const MainTabs = () => {
  return (
    <>
      <TabNavigator.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let iconProvider;

            if (route.name === "Home") {
              iconProvider = FontAwesome;
              iconName = focused ? "home" : "home";
              size = 25;
            }
            if (route.name === "CreatePost") {
              iconProvider = Entypo;
              iconName = focused ? "new-message" : "new-message";
              size = 25;
            }
            if (route.name === "Categories") {
              iconProvider = FontAwesome;
              iconName = focused ? "tasks" : "tasks";
              size = 25;
            }
            if (route.name === "Users") {
              iconProvider = FontAwesome;
              iconName = focused ? "users" : "users";
              size = 25;
            }
            if (route.name === "LogOut") {
              iconProvider = FontAwesome;
              iconName = focused ? "user-times" : "user-times";
              size = 25;
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
        }}>
        <TabNavigator.Screen name="Home" component={Home} />
        <TabNavigator.Screen name="CreatePost" component={CreatePost} />
        <TabNavigator.Screen name="Categories" component={Category} />
        <TabNavigator.Screen name="Users" component={Users} />
        <TabNavigator.Screen name="LogOut" component={Logout} />
      </TabNavigator.Navigator>
    </>
  );
};
