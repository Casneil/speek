import React from "react";

import {createDrawerNavigator} from "@react-navigation/drawer";
import StackNavigator from "../NavStack";
import SpeekView from "../../screens/SpeekView";
import Logout from "../../screens/Logout";
import {useAuthContext} from "../../components/context/AuthContext";
import {theme} from "../../constants/theme";

//Context
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const {authenticated} = useAuthContext();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={StackNavigator} />
      {authenticated && (
        <>
          <Drawer.Screen name="SpeekView" component={SpeekView} />
          <Drawer.Screen name="Log out" component={Logout} />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
