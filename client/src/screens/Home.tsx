import React, {useState} from "react";
import {TouchableOpacity, Dimensions, ActivityIndicator} from "react-native";

//3rd party
import {useQuery, gql} from "@apollo/client";
import {Box, Text} from "react-native-design-utility";
import AntDesign from "react-native-vector-icons/AntDesign";

//Components
import CreateSpeek from "../components/CreateSpeek";
import Speek from "../components/Speek";
import MyActivityIndicator from "../components/MyActivityIndicator";

//Style
import {theme} from "../constants/theme";

// Query
export const SPEEKS_QUERY = gql`
  query SPEEKS_QUERY {
    speeks {
      id
      title
      excerpt
      content
      likes {
        id
      }
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
  if (error) <Text>{error.message}</Text>;

  return (
    <>
      {loading ? (
        <Box>
          <MyActivityIndicator size="large" color={theme.color.blueLightest} />
        </Box>
      ) : (
        <Box bg={theme.color.white}>
          <Box f={1}>
            {modalOpen && (
              <CreateSpeek show={modalOpen} closeModal={closeModal} />
            )}
          </Box>
          <Box style={{bottom: DEVICE_HEIGHT / DEVICE_HEIGHT - 10}}>
            <Box
              dir="row"
              self="end"
              bg={theme.color.white}
              mx="lg"
              w={0}
              radius="sm"
              style={{elevation: 20}}>
              <TouchableOpacity onPress={() => setModalOpen(true)}>
                <AntDesign name="form" style={{fontSize: 30}} />
              </TouchableOpacity>
            </Box>
          </Box>
          <Speek speek={data.speeks} />
        </Box>
      )}
    </>
  );
};

export default Home;
