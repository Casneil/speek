import React from "react";

//3rd party
import {useQuery, gql} from "@apollo/client";
import {Box, Text} from "react-native-design-utility";
import AntDesign from "react-native-vector-icons/AntDesign";

//Enums and Interfaces
import {IUSER, ISpeekInterface} from "./Interfaces";

type SpeekTypes = {
  user: IUSER;
};

const Speek: React.FC<SpeekTypes> = (props) => {
  const {user} = props;

  return (
    <Box mx={60} key={user.id}>
      <Text color="black" size="xl">
        {user.name}
      </Text>
    </Box>
  );
};

export default Speek;
