import React, {useState} from "react";
import {TextInput, TouchableOpacity, Image, Keyboard} from "react-native";

import {TouchableWithoutFeedback} from "react-native-gesture-handler";

//3rd Party
import Modal from "react-native-modal";
import {gql, useMutation} from "@apollo/client";
import {Formik} from "formik";
import * as Yup from "yup";
import {Box, Text} from "react-native-design-utility";

import {ME_QUERY} from "./Profile";

//Enums and Interfaces
import {IColorProps, IUserProfile} from "../components/Interfaces";

//Mutation
const CREATE_PROFILE_MUTATION = gql`
  mutation createProfile(
    $bio: String
    $location: String
    $website: String
    $avatar: String
  ) {
    createProfile(
      bio: $bio
      location: $location
      website: $website
      avatar: $avatar
    ) {
      id
    }
  }
`;

const CreateProfile = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [borderColor, setBorderColor] = useState<IColorProps>({
    bio: "gray",
    location: "gray",
    website: "gray",
    avatar: "gray",
  });
  /*
TODO: Extract this to the profile screen if there isnt a profile there
* should be a option to create on then this modal should be opened 
* with the fields for profile information
*/
  // Modal for later use.
  function WrapperComponent() {
    return (
      <Box>
        <Modal isVisible={modalOpen}>
          <Box style={{flex: 1}}>
            <Text>I am the modal content!</Text>
          </Box>
        </Modal>
      </Box>
    );
  }

  const [createProfile] = useMutation(CREATE_PROFILE_MUTATION, {
    refetchQueries: [{query: ME_QUERY}],
  });

  const initialValues: IUserProfile = {
    bio: "",
    location: "",
    website: "",
    avatar: "",
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Box my="lg">
      <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, {setSubmitting}) => {
              setSubmitting(true);
              await createProfile({
                variables: values,
              });
              //@ts-ignore
              setSubmitting(false);
            }}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
              <>
                <Box mx={60}>
                  <Box mb="sm">
                    <Box dir="row" align="center">
                      <TextInput
                        onChangeText={handleChange("avatar")}
                        onBlur={handleBlur("avatar")}
                        placeholder="avatar"
                        placeholderTextColor="gray"
                        maxLength={20}
                        selectionColor={"#2196f3"}
                        onFocus={() =>
                          setBorderColor({...borderColor, bio: "#2196f3"})
                        }
                        value={values.avatar}
                        style={{
                          borderBottomWidth: 1,
                          width: "100%",
                          borderBottomColor: borderColor.bio,
                          paddingVertical: 0,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box mb="sm">
                    <Box dir="row" align="center">
                      <TextInput
                        onChangeText={handleChange("bio")}
                        placeholder="bio"
                        onBlur={handleBlur("bio")}
                        keyboardType={"email-address"}
                        selectionColor={"#2196f3"}
                        onFocus={() =>
                          setBorderColor({...borderColor, website: "#2196f3"})
                        }
                        value={values.bio}
                        style={{
                          borderBottomWidth: 1,
                          width: "100%",
                          borderBottomColor: borderColor.website,
                          paddingVertical: 0,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box mb="sm">
                    <Box dir="row" align="center">
                      <TextInput
                        onChangeText={handleChange("location")}
                        onBlur={handleBlur("location")}
                        placeholder="location"
                        placeholderTextColor="gray"
                        secureTextEntry={true}
                        maxLength={25}
                        selectionColor={"#2196f3"}
                        onFocus={() =>
                          setBorderColor({...borderColor, location: "#2196f3"})
                        }
                        value={values.location}
                        style={{
                          borderBottomWidth: 1,
                          width: "100%",
                          borderBottomColor: borderColor.location,
                          paddingVertical: 0,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box mb="sm">
                    <Box dir="row" align="center">
                      <TextInput
                        onChangeText={handleChange("website")}
                        keyboardType={"email-address"}
                        onBlur={handleBlur("website")}
                        placeholder="website"
                        placeholderTextColor="gray"
                        maxLength={25}
                        secureTextEntry={true}
                        selectionColor={"#2196f3"}
                        onFocus={() =>
                          setBorderColor({
                            ...borderColor,
                            confirmPassword: "#2196f3",
                          })
                        }
                        value={values.website}
                        style={{
                          borderBottomWidth: 1,
                          width: "100%",
                          borderBottomColor: borderColor.confirmPassword,
                          paddingVertical: 0,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box center my="sm">
                  <Box
                    center
                    bg="white"
                    w={100}
                    radius="lg"
                    style={{elevation: 10}}>
                    <TouchableOpacity onPress={handleSubmit}>
                      <Text p={8} bold>
                        Create
                      </Text>
                    </TouchableOpacity>
                  </Box>
                </Box>
              </>
            )}
          </Formik>
        </TouchableWithoutFeedback>
      </>
    </Box>
  );
};

export default CreateProfile;
