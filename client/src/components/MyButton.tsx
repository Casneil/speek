import React from "react";

import {TouchableOpacity} from "react-native";

//3rd Party
import {Box, Text} from "react-native-design-utility";
import {useNavigation} from "@react-navigation/native";

//Styles
import {theme} from "../constants/theme";

type MyButtonType = {
  name: string;
  functionHandeler: () => void;
  textWeight?: string;
  navigateToScreen?: string;
};

/**
 *
 * @param props: name: Button name, functionHandeler: callback function
 */
const MyButton: React.FC<MyButtonType> = (props) => {
  const navigation = useNavigation();
  const {name, functionHandeler, navigateToScreen} = props;

  return (
    <Box
      bg={theme.color.white}
      w={100}
      center
      radius="lg"
      style={{elevation: 10}}>
      <TouchableOpacity
        onPress={() => {
          !navigateToScreen
            ? functionHandeler()
            : navigation.navigate(navigateToScreen);
          functionHandeler();
        }}>
        <Text p={8} bold>
          {name}
        </Text>
      </TouchableOpacity>
    </Box>
  );
};

export default MyButton;
