import React from "react";

//3rd party
import {useQuery, gql} from "@apollo/client";
import {Box, Text} from "react-native-design-utility";
import AntDesign from "react-native-vector-icons/AntDesign";

//Components
import Speek from "../components/Speek";
import MyActivityIndicator from "../components/MyActivityIndicator";

//Interfaces
import {IUSER} from "../components/Interfaces";

//Styles
import {theme} from "../constants/theme";

// Query
const USERS_QUERY = gql`
  query USER_QUERY {
    users {
      id
      name
    }
  }
`;

const Users = () => {
  //States
  const {loading, error, data} = useQuery(USERS_QUERY);

  if (error) <Text>{error.message}</Text>;

  return (
    <>
      {loading ? (
        <Box>
          <MyActivityIndicator size="large" color={theme.color.blueLightest} />
        </Box>
      ) : (
        <Box f={1} bg={theme.color.white}>
          {/* <Box my="lg">
        <Box my="lg">
          {data.users.map((user: IUSER) => (
            <Speek user={user} key={user.id} />
          ))}
        </Box>
      </Box> */}
        </Box>
      )}
    </>
  );
};

export default Users;
