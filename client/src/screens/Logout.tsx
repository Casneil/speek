import React from "react";
import {View, Text, TouchableOpacity} from "react-native";

// Context
import {useAuthContext} from "../components/context/AuthContext";

const Logout = () => {
  const {removeToken} = useAuthContext();
  return (
    <View>
      <TouchableOpacity onPress={removeToken}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Logout;
