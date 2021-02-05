import React, {useState} from "react";
import {TouchableOpacity} from "react-native";

//3rd Party
import {gql, useQuery} from "@apollo/client";
import {Box, Text} from "react-native-design-utility";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

// Components
import CreateProfile from "../components/CreateProfile";
import MyButton from "../components/MyButton";
import UpdateProfile from "../components/UpdateProfile";
import MyImageComponent from "../components/MyImageComponent";
import MyActivityIndicator from "../components/MyActivityIndicator";

// Enums and Interfaces
import {PhotoFileEnum, ImageLocationEnum} from "../components/enums";

// Resource
const anonymous_user = require("../rsc/anonymous_user.png");

// Styles
import {theme} from "../constants/theme";

//Query
export const ME_QUERY = gql`
  query me {
    me {
      id
      name
      likedSpeek {
        id
        speek {
          id
        }
      }
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
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const {loading, error, data} = useQuery(ME_QUERY);

  if (error) return <Text>{error.message}</Text>;

  // Modal
  const closeEdit = () => {
    setEditModalOpen(false);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Box bg={theme.color.white} f={1}>
      <Box mx={60}>
        {modalOpen && (
          <CreateProfile show={modalOpen} closeModal={closeModal} />
        )}
        {editModalOpen && (
          <UpdateProfile show={editModalOpen} closeModal={closeEdit} />
        )}
        <>
          {loading ? (
            <MyActivityIndicator
              size="large"
              color={theme.color.blueLightest}
            />
          ) : (
            <Box my="xl">
              {data.me.Profile ? (
                <Box>
                  <Box
                    dir="col"
                    self="end"
                    bg={theme.color.white}
                    mx="base"
                    w={30}
                    center
                    radius="sm"
                    style={{elevation: 20}}>
                    {!loading && (
                      <TouchableOpacity onPress={() => setEditModalOpen(true)}>
                        <AntDesign name="edit" style={{fontSize: 30}} />
                      </TouchableOpacity>
                    )}
                  </Box>
                  <Box>
                    <Box center>
                      <Box style={{elevation: 40}}>
                        <MyImageComponent
                          source={data.me.Profile.avatar}
                          where={ImageLocationEnum.INTERNET}
                          height={PhotoFileEnum.HEIGHT}
                          width={PhotoFileEnum.WIDTH}
                          marginBottom={PhotoFileEnum.MARGIN_BOTTOM}
                        />
                      </Box>
                      <Text size={14} color={theme.color.blueLightest} bold>
                        {data.me.name}
                      </Text>
                      <Box my="sm" center>
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
                  </Box>
                </Box>
              ) : (
                <Box my="sm" center>
                  <Box>
                    <MyImageComponent
                      height={PhotoFileEnum.HEIGHT}
                      width={PhotoFileEnum.WIDTH}
                      marginBottom={PhotoFileEnum.MARGIN_BOTTOM}
                    />
                  </Box>
                  <Box my="sm" center>
                    {!data.me.Profile && (
                      <Box dir="row" align="center">
                        <Text mx={4}>No profile data found</Text>
                        <Entypo name="emoji-sad" style={{fontSize: 14}} />
                      </Box>
                    )}
                    <Box center mt="sm">
                      <MyButton
                        name={"Make one"}
                        functionHandeler={() => setModalOpen(true)}
                      />
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </>
      </Box>
    </Box>
  );
};
export default Profile;
