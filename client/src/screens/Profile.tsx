import React, {useRef, createRef, useState} from "react";
import {Image, TouchableOpacity} from "react-native";

//3rd Party
import {gql, useQuery} from "@apollo/client";
import {Box, Text} from "react-native-design-utility";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

// Components
import CreateProfile from "./CreateProfile";

// Enums and Interfaces
import {PhotoFileEnum} from "../components/enums";

// Resource
const anonymous_user = require("../rsc/anonymous_user.png");

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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const {loading, error, data} = useQuery(ME_QUERY);
  console.log(data);

  if (loading) return <Text>loading...</Text>;
  if (error) return <Text>{error.message}</Text>;

  // Modal
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Box bg="white" f={1}>
      <Box mx={60}>
        {modalOpen && (
          <CreateProfile show={modalOpen} closeModal={closeModal} />
        )}
        <Box my="xl">
          {data.me.Profile ? (
            <Box center>
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${data.me.Profile.avatar}`,
                }}
                style={{
                  height: PhotoFileEnum.HEIGHT,
                  width: PhotoFileEnum.WIDTH,
                  borderRadius: PhotoFileEnum.BORDER_RADIUS,
                  marginBottom: PhotoFileEnum.MARGIN_BOTTOM,
                }}
              />
              <Box my="lg" center>
                <Text>{data.me.Profile.bio}</Text>
                <Box dir="row" align="center">
                  <Entypo name="location-pin" style={{fontSize: 12}} />
                  <Text mx={4}>{data.me.Profile.location}</Text>
                </Box>
                <Box dir="row" align="center">
                  <AntDesign name="link" style={{fontSize: 12}} />
                  <Text mx={4} size={12}>
                    {data.me.Profile.website}
                  </Text>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box>
              <Box>
                <Image
                  source={anonymous_user}
                  style={{
                    height: PhotoFileEnum.HEIGHT,
                    width: PhotoFileEnum.WIDTH,
                    borderRadius: PhotoFileEnum.BORDER_RADIUS,
                    marginBottom: PhotoFileEnum.MARGIN_BOTTOM,
                  }}
                />
              </Box>
              <Box>
                {!data.me.Profile && <Text>No profile data found</Text>}
                <TouchableOpacity onPress={() => setModalOpen(true)}>
                  {!data.me.Profile && <Text> create one</Text>}
                </TouchableOpacity>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
