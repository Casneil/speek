import React from "react";
import {TouchableOpacity} from "react-native";

//3rd Party
import {Box, Text} from "react-native-design-utility";

// Context
import {useAuthContext} from "../components/context/AuthContext";

const Logout = () => {
  const {removeToken} = useAuthContext();
  return (
    <Box f={1} bg="white">
      <TouchableOpacity onPress={removeToken}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </Box>
  );
};

export default Logout;
