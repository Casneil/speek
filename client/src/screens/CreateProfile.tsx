import React, {useState} from "react";
import {
  TextInput,
  TouchableOpacity,
  Dimensions,
  PermissionsAndroid,
} from "react-native";

//3rd Party
import Modal from "react-native-modal";
import * as ImagePicker from "react-native-image-picker";
import {gql, useMutation} from "@apollo/client";
import {Formik} from "formik";
import AntDesign from "react-native-vector-icons/AntDesign";
import {Box, Text} from "react-native-design-utility";

import {ME_QUERY} from "./Profile";

//Enums and Interfaces
import {IColorProps, IUserProfile} from "../components/Interfaces";
import {FileLocationEnum} from "../components/enums";

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

type ModalProps = {
  show: boolean;
  closeModal: () => void;
};

const CreateProfile: React.FC<ModalProps> = (props) => {
  const {show, closeModal} = props;
  const [borderColor, setBorderColor] = useState<IColorProps>({
    bio: "gray",
    location: "gray",
    website: "gray",
    avatar: "gray",
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
            console.log("Response = ", response);
            if (response.didCancel) {
              console.log("User cancelled image picker");
            } else if (response.error) {
              console.log("ImagePicker Error: ", response.error);
            } else if (response.customButton) {
              console.log("User tapped custom button: ", response.customButton);
            } else {
              return;
            }
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
          console.log("Response = ", response);
          if (response.didCancel) {
            console.log("User cancelled image picker");
          } else if (response.error) {
            console.log("ImagePicker Error: ", response.error);
          } else if (response.customButton) {
            console.log("User tapped custom button: ", response.customButton);
          } else {
            return;
          }
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

  // This needs to be in Profile after profile creating this refetch should be called.
  // refetchQueries: [{query: ME_QUERY}],

  const [createProfile] = useMutation(CREATE_PROFILE_MUTATION);

  const initialValues: IUserProfile = {
    bio: "",
    location: "",
    website: "",
    avatar: "",
  };
  return (
    <Modal
      isVisible={show}
      backdropOpacity={1}
      backdropColor="white"
      animationIn="bounceInLeft"
      animationOut="bounceOutLeft">
      <Box my="lg">
        <>
          <Box p="absolute" bottom={100} left={DEVICE_WIDTH - 100}>
            <TouchableOpacity onPress={closeModal}>
              <AntDesign name="closecircle" style={{fontSize: 24}} />
            </TouchableOpacity>
          </Box>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, {setSubmitting}) => {
              await setSubmitting(true);
              await createProfile({
                variables: values,
              });
              //@ts-ignore
              setSubmitting(false);
              closeModal();
            }}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
              <>
                <Box mx={60}>
                  <Box mb="sm">
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
                            <AntDesign name="picture" style={{fontSize: 20}} />
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
                  </Box>
                  <Box mb="sm">
                    <Box dir="row" align="center">
                      <TextInput
                        onChangeText={handleChange("bio")}
                        placeholder="bio"
                        placeholderTextColor="gray"
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
                        maxLength={25}
                        selectionColor={"#2196f3"}
                        onFocus={() =>
                          setBorderColor({
                            ...borderColor,
                            location: "#2196f3",
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
                        placeholderTextColor="gray"
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
        </>
      </Box>
    </Modal>
  );
};

export default CreateProfile;
