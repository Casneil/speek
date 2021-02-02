import React from "react";

//3rd party
import {Box, Text} from "react-native-design-utility";
import AntDesign from "react-native-vector-icons/AntDesign";

// Components
import MyImageComponent from "./MyImageComponent";

//Enums and Interfaces
import {ISpeekInterface} from "./Interfaces";
import {ImageLocationEnum} from "./enums";

//Resources
const anonymous_user = require("../rsc/anonymous_user.png");

type SpeekTypes = {
  speek: ISpeekInterface;
};

const Speek: React.FC<SpeekTypes> = (props) => {
  const {speek} = props;
  console.log(speek.author.Profile.avatar);

  return (
    <Box mx={60} key={speek.id}>
      {speek?.author?.Profile.avatar ? (
        <MyImageComponent
          width={40}
          height={40}
          where={ImageLocationEnum.INTERNET}
          source={speek.author.Profile.avatar}
          type={"jpeg"}
        />
      ) : (
        <MyImageComponent source={anonymous_user} width={40} height={40} />
      )}

      <Box>
        <Text mb={4} size="sm" lineH="tight" color="blue">
          {speek.title}
        </Text>
      </Box>
      <Box>
        <Text mb={2} size="sm" lineH="tight" color="blueLightest">
          {speek.excerpt}
        </Text>
      </Box>
      <Box>
        <Text color="black" size="sm" lineH="tight">
          {speek.content}
        </Text>
      </Box>
    </Box>
  );
};

export default Speek;
