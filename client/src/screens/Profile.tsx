import React from "react";

//3rd Party
import {gql, useQuery} from "@apollo/client";
import {Box, Text} from "react-native-design-utility";

//Query
export const ME_QUERY = gql`
  query me {
    me {
      id
      Profile {
        id
        bio
        location
        website
        avatar
      }
    }
  }
`;

const Profile = () => {
  const {loading, error, data} = useQuery(ME_QUERY);

  if (loading) return <Text>loading...</Text>;
  if (error) return <Text>{error.message}</Text>;

  return (
    <Box>
      <Text>{data.me.profile.bio}</Text>
      {data.me.profile.avatar && <Text>{data.me.profile.avatar}</Text>}
      <Text>{data.me.profile.location}</Text>
      <Text>{data.me.profile.website}</Text>
    </Box>
  );
};

export default Profile;
