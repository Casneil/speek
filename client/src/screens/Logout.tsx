import React from "react";

//3rd Party
import {Box} from "react-native-design-utility";

//Components
import MyButton from "../components/MyButton";

// Context
import {useAuthContext} from "../components/context/AuthContext";

const Logout = () => {
  const {removeToken} = useAuthContext();
  return (
    <Box f={1} bg="white">
      <Box align="center" my="lg">
        <MyButton
          name={"Log out"}
          // @ts-ignore
          functionHandeler={removeToken}
          navigateToScreen="Home"
        />
      </Box>
    </Box>
  );
};

export default Logout;
