import React from "react";

// Third party
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import {createDrawerNavigator} from "@react-navigation/drawer";

// Screens
import Home from "../../screens/Home";
import Logout from "../../screens/Logout";
import Profile from "../../screens/Profile";
import CreateProfile from "../../screens/CreateProfile";

// Styles
import {globalColors} from "../../components/styles/globalStyles";

// Drawer Navigator
const Drawer = createDrawerNavigator();

const myDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
};
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
        <TabNavigator.Screen name="Explore" component={Home} />
        <TabNavigator.Screen name="Create" component={CreateProfile} />
        <TabNavigator.Screen name="Profile" component={Profile} />
        <TabNavigator.Screen name="LogOut" component={Logout} />
      </TabNavigator.Navigator>
    </>
  );
};
