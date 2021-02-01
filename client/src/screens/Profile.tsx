import React, {useRef, createRef, useState} from "react";
import {Image, TouchableOpacity} from "react-native";

//3rd Party
import {RNCamera} from "react-native-camera";
import {useCamera} from "react-native-camera-hooks";
import {gql, useQuery} from "@apollo/client";
import {Box, Text} from "react-native-design-utility";
import AntDesign from "react-native-vector-icons/AntDesign";

// Components
import CreateProfile from "./CreateProfile";

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
  // RNCamera state
  const [toggleOn, setToggleOn] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // const [
  //   {cameraRef, type, ratio, autoFocus, autoFocusPoint, isRecording},
  //   {
  //     toggleFacing,
  //     touchToFocus,
  //     textRecognized,
  //     facesDetected,
  //     recordVideo,
  //     setIsRecording,
  //   },
  // ] = useCamera(initialProps);
  const {loading, error, data} = useQuery(ME_QUERY, {});
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
        <Box center my="lg">
          <Image
            source={anonymous_user}
            style={{
              height: 80,
              width: 80,
              borderRadius: 50,
              marginBottom: 2,
            }}
          />
          <Box o={0.7} p="relative">
            <TouchableOpacity>
              {/* <RNCamera
              ref={cameraRef}
              autoFocusPointOfInterest={autoFocusPoint.normalized}
              type={type}
              ratio={ratio}
              style={{flex: 1}}
              autoFocus={autoFocus}
              onTextRecognized={textRecognized}
              onFacesDetected={facesDetected}
            /> */}
              <AntDesign name="camera" style={{fontSize: 18}} />
            </TouchableOpacity>
          </Box>
        </Box>

        <>
          {data.me.Profile && (
            <>
              <Text>{data.me.Profile.bio}</Text>
              <Text>{data.me.Profile.avatar}</Text>
              <Text>{data.me.Profile.location}</Text>
              <Text>{data.me.Profile.website}</Text>
            </>
          )}
        </>

        <Box>
          {!data.me.Profile && <Text>No profile data found</Text>}
          <TouchableOpacity onPress={() => setModalOpen(true)}>
            {!data.me.Profile && <Text> create one</Text>}
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
