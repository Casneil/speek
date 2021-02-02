import React, {useState} from "react";
import {TouchableOpacity, Dimensions} from "react-native";

//3rd party
import {useQuery, gql} from "@apollo/client";
import {Box, Text} from "react-native-design-utility";
import AntDesign from "react-native-vector-icons/AntDesign";

//Components
import CreateSpeek from "../components/CreateSpeek";
import Speek from "../components/Speek";

// Query
export const SPEEKS_QUERY = gql`
  query SPEEKS_QUERY {
    speeks {
      id
      title
      excerpt
      content
      createdAt
      author {
        id
        name
        Profile {
          id
          avatar
        }
      }
    }
  }
`;

const Home = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const DEVICE_HEIGHT = Dimensions.get("screen").height;

  // Modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const {loading, error, data} = useQuery(SPEEKS_QUERY);

  if (loading) return <Text>Loading...</Text>;
  if (error) <Text>{error.message}</Text>;

  return (
    <Box bg="white">
      <Box f={1}>
        {modalOpen && <CreateSpeek show={modalOpen} closeModal={closeModal} />}
        <Box style={{bottom: DEVICE_HEIGHT / DEVICE_HEIGHT - 10}}>
          <Box
            dir="row"
            self="end"
            bg="white"
            mx="lg"
            w={0}
            radius="sm"
            style={{elevation: 20}}>
            <TouchableOpacity onPress={() => setModalOpen(true)}>
              <AntDesign name="form" style={{fontSize: 30}} />
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
      <Speek speek={data.speeks} />
    </Box>
  );
};

export default Home;
