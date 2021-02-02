import React from "react";

//3rd party
import {useQuery, gql} from "@apollo/client";
import {Box, Text} from "react-native-design-utility";
import AntDesign from "react-native-vector-icons/AntDesign";

//Components
import Speek from "../components/Speek";

//Interfaces
import {IUSER} from "../components/Interfaces";

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

  if (loading) return <Text>Loading...</Text>;
  if (error) <Text>{error.message}</Text>;

  return (
    <Box f={1} bg="white">
      <Box my="lg">
        <Box my="lg">
          {data.users.map((user: IUSER) => (
            <Speek user={user} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Users;
