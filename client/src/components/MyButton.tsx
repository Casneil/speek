import React from "react";
import {TouchableOpacity} from "react-native";

//3rd Party
import {Box, Text} from "react-native-design-utility";

//Styles
import {theme} from "../constants/theme";

type MyButtonType = {
  name: string;
  functionHandeler: () => void;
  textWeight?: string;
};

const MyButton: React.FC<MyButtonType> = (props) => {
  const {name, functionHandeler} = props;

  return (
    <Box
      bg={theme.color.white}
      w={100}
      center
      radius="lg"
      style={{elevation: 10}}>
      <TouchableOpacity onPress={functionHandeler}>
        <Text p={8} bold>
          {name}
        </Text>
      </TouchableOpacity>
    </Box>
  );
};

export default MyButton;
