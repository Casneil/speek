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

// Queries and Mutations
import {ME_QUERY} from "../screens/Profile";

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
      createdAt
      comments {
        id
        content
      }
      likes {
        id
      }
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

  // Modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const {loading, error, data} = useQuery(SPEEKS_QUERY);
  const {loading: meLoading, error: meError, data: meData} = useQuery(ME_QUERY);
  if (error) <Text>{error.message}</Text>;

  return (
    <>
      {loading || meLoading ? (
        <Box>
          <MyActivityIndicator size="large" color={theme.color.blueLightest} />
        </Box>
      ) : (
        <Box bg={theme.color.white}>
          <Box>
            {modalOpen && (
              <CreateSpeek show={modalOpen} closeModal={closeModal} />
            )}
          </Box>
          <Box>
            <TouchableOpacity
              onPress={() => setModalOpen(true)}
              style={{
                top: 20,
                left: "85%",
                backgroundColor: theme.color.white,
                zIndex: 2000,
                width: 30,
                height: 30,
                elevation: 20,
              }}>
              <AntDesign
                name="form"
                style={{fontSize: 30}}
                color={theme.color.black}
              />
            </TouchableOpacity>
          </Box>
          <Speek speek={data.speeks} meData={meData} />
        </Box>
      )}
    </>
  );
};

export default Home;
