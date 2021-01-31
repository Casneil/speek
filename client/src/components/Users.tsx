import React from "react";

import {useQuery, gql} from "@apollo/client";

import {Box, Text} from "react-native-design-utility";

// Query
const USERS_QUERY = gql`
  query USER_QUERY {
    users {
      id
      name
    }
  }
`;

interface IUSER {
  name: string;
  id: number;
}

const Users = () => {
  //States
  const {loading, error, data} = useQuery(USERS_QUERY);

  if (loading) return <Text>Loading...</Text>;
  if (error) <Text>{error.message}</Text>;

  return (
    <>
      {data.users.map((user: IUSER) => (
        <Text color="black" size="xl" key={user.id}>
          {user.name}
        </Text>
      ))}
    </>
  );
};

export default Users;
