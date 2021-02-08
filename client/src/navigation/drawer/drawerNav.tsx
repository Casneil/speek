import React from "react";

import {createDrawerNavigator} from "@react-navigation/drawer";
import StackNavigator from "../NavStack";
import SpeekView from "../../screens/SpeekView";
import Logout from "../../screens/Logout";
import {useAuthContext} from "../../components/context/AuthContext";
import {TouchableOpacity} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

//Context
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const {authenticated} = useAuthContext();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={StackNavigator} />
      {authenticated && (
        <>
          <Drawer.Screen
            name="SpeekView"
            component={SpeekView}
            options={{headerShown: false}}
          />
          <Drawer.Screen name="Log out" component={Logout} />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
