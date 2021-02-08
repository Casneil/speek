import React from "react";

// Third party
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";

// Screens
import Home from "../../screens/Home";
import Profile from "../../screens/Profile";
import Trending from "../../screens/Trending";

// Styles
import {theme} from "../../constants/theme";

// Tab Navigator
const TabNavigator = createMaterialTopTabNavigator();
let size = 10;
export const MainTabs = () => {
  return (
    <>
      <TabNavigator.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            let iconName;
            let iconProvider;

            if (route.name === "Explore") {
              iconProvider = FontAwesome;
              iconName = focused ? "home" : "home";
            }
            if (route.name === "Trending") {
              iconProvider = Entypo;
              iconName = focused ? "new-message" : "new-message";
            }
            if (route.name === "Profile") {
              iconProvider = FontAwesome;
              iconName = focused ? "tasks" : "tasks";
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
          activeTintColor: theme.color.blue,
          inactiveTintColor: "gray",
          tabStyle: {marginBottom: 4},
          // showIcon: true,
        }}>
        <TabNavigator.Screen name="Explore" component={Home} />
        <TabNavigator.Screen name="Trending" component={Trending} />
        <TabNavigator.Screen name="Profile" component={Profile} />
      </TabNavigator.Navigator>
    </>
  );
};
