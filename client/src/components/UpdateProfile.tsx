import React, {useState} from "react";
import {
  TextInput,
  TouchableOpacity,
  Dimensions,
  PermissionsAndroid,
  Image,
} from "react-native";

//3rd Party
import Modal from "react-native-modal";
import * as ImagePicker from "react-native-image-picker";
import {gql, useMutation, useQuery} from "@apollo/client";
import {Formik} from "formik";
import AntDesign from "react-native-vector-icons/AntDesign";
import {Box, Text} from "react-native-design-utility";

// Components
import MyButton from "./MyButton";
import MyActivityIndicator from "./MyActivityIndicator";

import {ME_QUERY} from "../screens/Profile";

//Enums and Interfaces
import {IColorProps, IUserProfile} from "./Interfaces";
import {FileLocationEnum, PhotoFileEnum} from "./enums";

//Styles
import {theme} from "../constants/theme";

//Mutation
const UPDATE_PROFILE_MUTATION = gql`
  mutation updateProfile(
    $id: Int!
    $bio: String
    $location: String
    $website: String
    $avatar: String
  ) {
    updateProfile(
      id: $id
      bio: $bio
      location: $location
      website: $website
      avatar: $avatar
    ) {
      id
    }
  }
`;

type ModalProps = {
  show: boolean;
  closeModal: () => void;
};

const UpdateProfile: React.FC<ModalProps> = (props) => {
  const {show, closeModal} = props;
  const [imageUrl, setImageUrl] = useState<string>();
  const [borderColor, setBorderColor] = useState<IColorProps>({
    bio: theme.color.grey,
    location: theme.color.grey,
    website: theme.color.grey,
    avatar: theme.color.grey,
  });

  const DEVICE_WIDTH = Dimensions.get("screen").width;

  // Choose image location function
  const chooseLocation = (location: FileLocationEnum) => {
    // Global options
    const options = {
      mediaType: "photo",
      maxWidth: 200,
      maxHeight: 200,
      quality: 0.8,
      includeBase64: true,
      saveToPhotos: false,
    };
    const fromCamera = async (): Promise<any> => {
      try {
        // Check permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "App Camera Permission",
            message: "App needs access to your camera ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // @ts-ignore
          ImagePicker.launchCamera(options, (response: any) => {
            // console.log("Response = ", response);
            setImageUrl(response.base64);
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fromFiles = async (): Promise<any> => {
      // Pick a single file
      try {
        // @ts-ignore
        ImagePicker.launchImageLibrary(options, (response: any) => {
          // console.log("Response = ", response);
          setImageUrl(response.base64);
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (location === FileLocationEnum.FILES) {
      fromFiles();
    }

    if (location === FileLocationEnum.CAMERA) {
      fromCamera();
    }
  };

  // Mutations and Queries

  const {loading, error, data} = useQuery(ME_QUERY);
  if (error) return <Text>{error.message}</Text>;

  const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION, {
    refetchQueries: [{query: ME_QUERY}],
  });

  const initialValues: IUserProfile = {
    id: data.me.Profile.id,
    bio: data.me.Profile.bio,
    location: data.me.Profile.location,
    website: data.me.Profile.website,
    avatar: "",
  };

  return (
    <>
      <Modal
        isVisible={show}
        backdropOpacity={1}
        backdropColor={theme.color.white}
        animationIn="bounceInLeft"
        animationOut="bounceOutLeft">
        <Box my="lg">
          <>
            {!loading && (
              <Box p="absolute" bottom={100} left={DEVICE_WIDTH - 100}>
                <TouchableOpacity onPress={closeModal}>
                  <AntDesign name="closecircle" style={{fontSize: 24}} />
                </TouchableOpacity>
              </Box>
            )}
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, {setSubmitting}) => {
                await setSubmitting(true);
                await updateProfile({
                  variables: {...values, avatar: imageUrl},
                });
                //@ts-ignore
                setSubmitting(false);
                closeModal();
              }}>
              {({handleChange, handleBlur, handleSubmit, values, errors}) => (
                <>
                  {loading ? (
                    <Box>
                      <MyActivityIndicator
                        size="large"
                        color={theme.color.blueLightest}
                      />
                    </Box>
                  ) : (
                    <>
                      <Box mx={60}>
                        <Box mb="sm">
                          {!imageUrl ? (
                            <Box dir="row" align="center">
                              <Box dir="row" align="center">
                                <Text size="sm" mr="xl">
                                  Photo
                                </Text>
                                <Box mr="sm">
                                  <TouchableOpacity
                                    onPress={() =>
                                      chooseLocation(FileLocationEnum.CAMERA)
                                    }>
                                    <AntDesign
                                      name="camera"
                                      style={{fontSize: 20}}
                                    />
                                  </TouchableOpacity>
                                </Box>
                                <Box>
                                  <TouchableOpacity
                                    onPress={() =>
                                      chooseLocation(FileLocationEnum.FILES)
                                    }>
                                    <AntDesign
                                      name="folderopen"
                                      style={{fontSize: 20}}
                                    />
                                  </TouchableOpacity>
                                </Box>
                              </Box>
                            </Box>
                          ) : (
                            <Box align="center" justify="center">
                              <Image
                                source={{
                                  uri: `data:image/jpeg;base64,${imageUrl}`,
                                }}
                                style={{
                                  height: PhotoFileEnum.HEIGHT,
                                  width: PhotoFileEnum.WIDTH,
                                  borderRadius: PhotoFileEnum.BORDER_RADIUS,
                                  marginBottom: PhotoFileEnum.MARGIN_BOTTOM,
                                }}
                              />
                            </Box>
                          )}
                        </Box>
                        <Box mb="sm">
                          <Box dir="row" align="center">
                            <TextInput
                              onChangeText={handleChange("bio")}
                              placeholder="bio"
                              placeholderTextColor="gray"
                              onBlur={handleBlur("bio")}
                              keyboardType={"email-address"}
                              selectionColor={theme.color.blueLightest}
                              onFocus={() =>
                                setBorderColor({
                                  ...borderColor,
                                  bio: theme.color.blueLightest,
                                })
                              }
                              value={values.bio}
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
                              onChangeText={handleChange("location")}
                              onBlur={handleBlur("location")}
                              placeholder="location"
                              placeholderTextColor={theme.color.grey}
                              maxLength={25}
                              selectionColor={theme.color.blueLightest}
                              onFocus={() =>
                                setBorderColor({
                                  ...borderColor,
                                  location: theme.color.blueLightest,
                                })
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
                              placeholderTextColor={theme.color.grey}
                              secureTextEntry={true}
                              selectionColor={theme.color.blueLightest}
                              onFocus={() =>
                                setBorderColor({
                                  ...borderColor,
                                  website: theme.color.blueLightest,
                                })
                              }
                              value={values.website}
                              style={{
                                borderBottomWidth: 1,
                                width: "100%",
                                borderBottomColor: borderColor.website,
                                paddingVertical: 0,
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Box center my="sm">
                        <MyButton
                          name={"Update"}
                          functionHandeler={handleSubmit}
                        />
                      </Box>
                    </>
                  )}
                </>
              )}
            </Formik>
          </>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateProfile;
