import React, {useState} from "react";
import {TouchableOpacity} from "react-native";

//3rd party
import {useQuery, gql} from "@apollo/client";
import {Box, Text} from "react-native-design-utility";
import AntDesign from "react-native-vector-icons/AntDesign";

//Components
import CreateSpeek from "../components/CreateSpeek";
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

const Home = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const {loading, error, data} = useQuery(USERS_QUERY);

  if (loading) return <Text>Loading...</Text>;
  if (error) <Text>{error.message}</Text>;

  return (
    <Box f={1} bg="white">
      {modalOpen && <CreateSpeek show={modalOpen} closeModal={closeModal} />}
      <Box my="lg">
        <Box
          dir="row"
          self="end"
          bg="white"
          mx="lg"
          w={30}
          center
          radius="sm"
          style={{elevation: 20}}>
          <TouchableOpacity onPress={() => setModalOpen(true)}>
            <AntDesign name="form" style={{fontSize: 30}} />
          </TouchableOpacity>
        </Box>
        <Box my="lg">
          {data.users.map((user: IUSER) => (
            <Speek user={user} key={user.id} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
