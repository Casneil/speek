import React from "react";
import {ActivityIndicator} from "react-native";

//3rd Party
import {Box} from "react-native-design-utility";

//Styles
import {theme} from "../constants/theme";

type MyIndicatorTypes = {
  size: string;
  color: string;
};
const MyActivityIndicator: React.FC<MyIndicatorTypes> = (props) => {
  const {size, color} = props;
  return (
    <Box my="lg" f={1} p="sm" align="center">
      <ActivityIndicator size={size} color={color} />
    </Box>
  );
};

export default MyActivityIndicator;
