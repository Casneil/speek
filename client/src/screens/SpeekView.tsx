import React from "react";

import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";

import {Box, Text} from "react-native-design-utility";

const TabNavigator = createMaterialTopTabNavigator();
const SpeekView = () => {
  const View = () => {
    return (
      <Box>
        <Text>Hello from Speek View Screen</Text>
      </Box>
    );
  };
  return (
    <TabNavigator.Navigator>
      <TabNavigator.Screen name="SpeekView" component={View} />
    </TabNavigator.Navigator>
  );
};

export default SpeekView;
