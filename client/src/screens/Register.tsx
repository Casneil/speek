import React, {useState} from "react";
import {
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";

// 3rd Party
import {gql, useMutation} from "@apollo/client";
import {Formik} from "formik";
import * as Yup from "yup";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import {Box, Text} from "react-native-design-utility";

// Components
import MyButton from "../components/MyButton";

//Context
import {useAuthContext} from "../components/context/AuthContext";

// Emuns and Interfaces
import {IRegisterInterface, IColorProps} from "../components/Interfaces";
//Resource
const icon = require("../rsc/icon.jpg");

// Mutation
const SIGN_UP_MUTATION = gql`
  mutation signup($name: String, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

const Register = () => {
  const [borderColor, setBorderColor] = useState<IColorProps>({
    name: "gray",
    email: "gray",
    password: "gray",
    confirmPassword: "gray",
  });
  const [signup, {data}] = useMutation(SIGN_UP_MUTATION);

  const navigation = useNavigation();
  const {setUserToken} = useAuthContext();

  const initialValues: IRegisterInterface = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(15, "Must be 20 characters or less")
      .required("Name required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email required"),
    password: Yup.string()
      .max(20, "Must be 25 characters or less")
      .required("Password required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match",
    ),
  });

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="position">
      <Box bg="white">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Box my="sm">
            <Text bold size="xl" center>
              Register
            </Text>
          </Box>
          <Box center my="sm">
            <Box
              bg="white"
              style={{elevation: 20}}
              mb="lg"
              radius={100}
              w={110}>
              <Image
                source={icon}
                style={{
                  overflow: "hidden",
                  height: 110,
                  width: 110,
                  borderRadius: 100,
                }}
              />
            </Box>
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, {setSubmitting}) => {
              setSubmitting(true);
              const response = await signup({
                variables: values,
              });
              //@ts-ignore
              setUserToken(response.data.signup.token);

              setSubmitting(false);
            }}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
              <>
                <Box mx={60}>
                  <Box mb="sm">
                    <Box dir="row" align="center">
                      <Box position="absolute" right={0} ml="sm">
                        <AntDesign name="user" size={18} color="black" />
                      </Box>
                      <TextInput
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        placeholder="Enter your username"
                        placeholderTextColor="gray"
                        maxLength={20}
                        selectionColor={"#2196f3"}
                        onFocus={() =>
                          setBorderColor({...borderColor, name: "#2196f3"})
                        }
                        value={values.name}
                        style={{
                          borderBottomWidth: 1,
                          width: "100%",
                          borderBottomColor: borderColor.name,
                          paddingVertical: 0,
                        }}
                      />
                    </Box>
                    {errors.name && (
                      <Text style={{fontSize: 10, color: "red"}}>
                        {errors.name}
                      </Text>
                    )}
                  </Box>
                  <Box mb="sm">
                    <Box dir="row" align="center">
                      <Box position="absolute" right={0} ml="sm">
                        <AntDesign name="mail" size={18} color="black" />
                      </Box>
                      <TextInput
                        onChangeText={handleChange("email")}
                        placeholder="Enter your email address"
                        onBlur={handleBlur("email")}
                        keyboardType={"email-address"}
                        maxLength={34}
                        selectionColor={"#2196f3"}
                        onFocus={() =>
                          setBorderColor({...borderColor, email: "#2196f3"})
                        }
                        value={values.email}
                        style={{
                          borderBottomWidth: 1,
                          width: "100%",
                          borderBottomColor: borderColor.email,
                          paddingVertical: 0,
                        }}
                      />
                    </Box>
                    {errors.email && (
                      <Text style={{fontSize: 10, color: "red"}}>
                        {errors.email}
                      </Text>
                    )}
                  </Box>
                  <Box mb="sm">
                    <Box dir="row" align="center">
                      <Box position="absolute" right={0} ml="sm">
                        <AntDesign name="lock" size={20} color="black" />
                      </Box>

                      <TextInput
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        placeholder="password"
                        placeholderTextColor="gray"
                        secureTextEntry={true}
                        maxLength={25}
                        selectionColor={"#2196f3"}
                        onFocus={() =>
                          setBorderColor({...borderColor, password: "#2196f3"})
                        }
                        value={values.password}
                        style={{
                          borderBottomWidth: 1,
                          width: "100%",
                          borderBottomColor: borderColor.password,
                          paddingVertical: 0,
                        }}
                      />
                    </Box>
                    {errors.password && (
                      <Text style={{fontSize: 10, color: "red"}}>
                        {errors.password}
                      </Text>
                    )}
                  </Box>
                  <Box mb="sm">
                    <Box dir="row" align="center">
                      <Box position="absolute" right={0} ml="sm">
                        <Feather
                          color={
                            values.confirmPassword !== "" &&
                            !errors.confirmPassword
                              ? "green"
                              : "red"
                          }
                          size={18}
                          name={
                            values.confirmPassword !== "" &&
                            !errors.confirmPassword
                              ? "check-circle"
                              : "x-circle"
                          }
                        />
                      </Box>
                      <TextInput
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                        placeholder="confirm password"
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
                        value={values.confirmPassword}
                        style={{
                          borderBottomWidth: 1,
                          width: "100%",
                          borderBottomColor: borderColor.confirmPassword,
                          paddingVertical: 0,
                        }}
                      />
                    </Box>
                    {errors.confirmPassword && (
                      <Text style={{fontSize: 10, color: "red"}}>
                        {errors.confirmPassword}
                      </Text>
                    )}
                  </Box>
                </Box>
                <Box center my="sm">
                  <MyButton name={"Register"} functionHandeler={handleSubmit} />
                </Box>
              </>
            )}
          </Formik>
          <Box bg="white" h="100%"></Box>
        </TouchableWithoutFeedback>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default Register;
