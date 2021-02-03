import React from "react";
import {TouchableOpacity} from "react-native";

//3rd Party
import {gql, useMutation} from "@apollo/client";
import {Box, Text} from "react-native-design-utility";

// Queries and Mutations
import {SPEEKS_QUERY} from "../screens/Home";

// Mutations
const LIKE_SPEEK_MUTATION = gql`
  mutation likeSpeek($id: Int) {
    likeSpeek(id: $id) {
      id
    }
  }
`;

type SpeekProps = {
  id: number;
};

const LikeSpeek = ({id}: SpeekProps) => {
  const [likeSpeek] = useMutation(LIKE_SPEEK_MUTATION, {
    refetchQueries: [{query: SPEEKS_QUERY}],
  });

  const handleCreateLike = async () => {
    await likeSpeek({variables: {id}});
  };
  return (
    <Box>
      <TouchableOpacity onPress={() => handleCreateLike}></TouchableOpacity>
    </Box>
  );
};

export default LikeSpeek;
