import React, {useState} from "react";
import {TextInput, TouchableOpacity, Dimensions} from "react-native";

//3rd Party
import Modal from "react-native-modal";
import {gql, useMutation, useQuery} from "@apollo/client";
import {Formik} from "formik";
import * as Yup from "yup";
import AntDesign from "react-native-vector-icons/AntDesign";
import {Box, Text} from "react-native-design-utility";
import {formatDistance, subDays} from "date-fns";

// Components
import MyButton from "./MyButton";
import MyImageComponent from "./MyImageComponent";

// Queries
import {SPEEKS_QUERY} from "../screens/Home";

//Enums and Interfaces
import {IColorProps, ISpeekInterface} from "./Interfaces";
import {ImageLocationEnum} from "./enums";

//Styles
import {theme} from "../constants/theme";

//Mutation
const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($id: Int!, $content: String!) {
    createComment(id: $id, content: $content) {
      id
    }
  }
`;

type ModalProps = {
  show: boolean;
  closeModal: () => void;
  id: number;
  data: ISpeekInterface;
};

type InitialValuesType = {
  content: string;
};

const CreateComment: React.FC<ModalProps> = (props) => {
  const {show, closeModal, id, data} = props;

  const [borderColor, setBorderColor] = useState<IColorProps>({
    content: theme.color.grey,
  });

  const DEVICE_WIDTH = Dimensions.get("screen").width;

  //Validation

  const validationSchema = Yup.object({
    content: Yup.string()
      .required()
      .min(1, "Must be more than 1 character")
      .max(200, "Must be 200 characters or less"),
  });

  // Mutations and Queries

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    refetchQueries: [{query: SPEEKS_QUERY}],
  });

  const initialValues: InitialValuesType = {
    content: "",
  };

  return (
    <Modal
      isVisible={show}
      backdropOpacity={1}
      backdropColor={theme.color.white}
      animationIn="flipInX"
      animationOut="bounceOutLeft">
      <Box my="sm">
        <Box mx={35}>
          <Box radius="lg" w={40} style={{elevation: 12}}>
            <MyImageComponent
              width={40}
              height={40}
              where={ImageLocationEnum.INTERNET}
              source={data.author.Profile.avatar}
              type={"jpeg"}
            />
          </Box>
          <Box dir="row" align="center">
            <Box mr="lg">
              <TouchableOpacity>
                <Box>
                  <Text size={14} color={theme.color.blueLightest} bold>
                    {data.author.name}
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
            <Text size={11.5} color={theme.color.grey}>
              {formatDistance(
                // @ts-ignore
                subDays(new Date(data.createdAt), 0),
                new Date(),
              )}
              ago
            </Text>
          </Box>
          <Box>
            <Text mb={4} size="base" lineH="tight" color={theme.color.blue}>
              {data.title}
            </Text>
          </Box>
        </Box>
        <Box>
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
              await createComment({
                variables: {...values, id},
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
                      <TextInput
                        onChangeText={handleChange("content")}
                        onBlur={handleBlur("content")}
                        placeholder="comment"
                        multiline={true}
                        maxLength={200}
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
                  <MyButton name={"Comment"} functionHandeler={handleSubmit} />
                </Box>
              </>
            )}
          </Formik>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateComment;
