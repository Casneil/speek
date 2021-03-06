import React, {useState} from "react";
import {TextInput, TouchableOpacity, Dimensions} from "react-native";

//3rd Party
import Modal from "react-native-modal";
import {gql, useMutation, useQuery} from "@apollo/client";
import {Formik} from "formik";
import * as Yup from "yup";
import AntDesign from "react-native-vector-icons/AntDesign";
import {Box, Text} from "react-native-design-utility";

// Components
import MyButton from "./MyButton";

// Queries
import {SPEEKS_QUERY} from "../screens/Home";

//Enums and Interfaces
import {IColorProps, ISpeekInterface} from "./Interfaces";

//Styles
import {theme} from "../constants/theme";

//Mutation
const CREATE_SPEEK_MUTATION = gql`
  mutation createSpeek($title: String, $excerpt: String, $content: String) {
    createSpeek(title: $title, excerpt: $excerpt, content: $content) {
      id
    }
  }
`;

type ModalProps = {
  show: boolean;
  closeModal: () => void;
};

type InitialValuesType = {
  title: string;
  excerpt: string;
  content: string;
};

const CreateSpeek: React.FC<ModalProps> = (props) => {
  const {show, closeModal} = props;

  const [borderColor, setBorderColor] = useState<IColorProps>({
    title: theme.color.grey,
    excerpt: theme.color.grey,
    content: theme.color.grey,
  });

  const DEVICE_WIDTH = Dimensions.get("screen").width;

  //Validation

  const validationSchema = Yup.object({
    content: Yup.string()
      .required()
      .min(1, "Must be more than 1 character")
      .max(256, "Must be 256 characters or less"),
  });

  // Mutations and Queries

  const [createSpeek] = useMutation(CREATE_SPEEK_MUTATION, {
    refetchQueries: [{query: SPEEKS_QUERY}],
  });

  const initialValues: InitialValuesType = {
    title: "",
    excerpt: "",
    content: "",
  };

  return (
    <Modal
      isVisible={show}
      backdropOpacity={1}
      backdropColor={theme.color.white}
      animationIn="flipInX"
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
            validationSchema={validationSchema}
            onSubmit={async (values, {setSubmitting}) => {
              await setSubmitting(true);
              await createSpeek({
                variables: values,
              });
              //@ts-ignore
              setSubmitting(false);
              closeModal();
            }}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
              <>
                <Box mx={60}>
                  <Box mb="sm"></Box>
                  <Box mb="sm">
                    <Box dir="row" align="center">
                      <TextInput
                        onChangeText={handleChange("title")}
                        placeholder="title"
                        placeholderTextColor={theme.color.grey}
                        onBlur={handleBlur("title")}
                        maxLength={50}
                        selectionColor={theme.color.blueLightest}
                        onFocus={() =>
                          setBorderColor({
                            ...borderColor,
                            website: theme.color.blueLightest,
                          })
                        }
                        value={values.title}
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
                        onChangeText={handleChange("excerpt")}
                        onBlur={handleBlur("excerpt")}
                        placeholder="excerpt"
                        multiline={true}
                        placeholderTextColor={theme.color.grey}
                        maxLength={100}
                        selectionColor={theme.color.blueLightest}
                        onFocus={() =>
                          setBorderColor({
                            ...borderColor,
                            location: theme.color.blueLightest,
                          })
                        }
                        value={values.excerpt}
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
                        onChangeText={handleChange("content")}
                        onBlur={handleBlur("content")}
                        placeholder="content"
                        multiline={true}
                        maxLength={256}
                        placeholderTextColor={theme.color.grey}
                        secureTextEntry={true}
                        selectionColor={theme.color.blueLightest}
                        onFocus={() =>
                          setBorderColor({
                            ...borderColor,
                            content: theme.color.blueLightest,
                          })
                        }
                        value={values.content}
                        style={{
                          borderBottomWidth: 1,
                          width: "100%",
                          borderBottomColor: borderColor.content,
                          paddingVertical: 0,
                        }}
                      />
                    </Box>
                    {errors.content && (
                      <Text style={{fontSize: 10, color: theme.color.red}}>
                        {errors.content}
                      </Text>
                    )}
                  </Box>
                </Box>
                <Box center my="sm">
                  <MyButton name={"Speek"} functionHandeler={handleSubmit} />
                </Box>
              </>
            )}
          </Formik>
        </>
      </Box>
    </Modal>
  );
};

export default CreateSpeek;
