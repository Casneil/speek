import React from "react";
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
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import {Box, Text} from "react-native-design-utility";

//Context
import {useAuthContext} from "../components/context/AuthContext";

// Emuns and Interfaces
import {IRegisterInterface} from "../components/Interfaces";
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
      .max(15, "Must be 15 characters or less")
      .required("Name required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email required"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Password required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match",
    ),
  });

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="position">
      <>
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
                  <Box>
                    <Box dir="row" align="center">
                      <Box position="absolute" right={0} ml="sm">
                        <AntDesign name="user" size={18} color="black" />
                      </Box>
                      <TextInput
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        placeholder="Enter your username"
                        placeholderTextColor="gray"
                        value={values.name}
                        style={{
                          borderBottomWidth: 1,
                          width: "100%",
                          borderBottomColor: "gray",
                        }}
                      />
                    </Box>
                    {errors.name && (
                      <Text style={{fontSize: 10, color: "red"}}>
                        {errors.name}
                      </Text>
                    )}
                  </Box>
                  <Box>
                    <Box dir="row" align="center">
                      <Box position="absolute" right={0} ml="sm">
                        <AntDesign name="mail" size={18} color="black" />
                      </Box>
                      <TextInput
                        onChangeText={handleChange("email")}
                        placeholder="Enter your email address"
                        onBlur={handleBlur("email")}
                        keyboardType={"email-address"}
                        value={values.email}
                        style={{
                          borderBottomWidth: 1,
                          width: "100%",
                          borderBottomColor: "gray",
                        }}
                      />
                    </Box>
                    {errors.email && (
                      <Text style={{fontSize: 10, color: "red"}}>
                        {errors.email}
                      </Text>
                    )}
                  </Box>
                  <Box>
                    <Box dir="row" align="center">
                      <Box position="absolute" right={0} ml="sm">
                        <AntDesign name="lock" size={18} color="black" />
                      </Box>

                      <TextInput
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        placeholder="password"
                        placeholderTextColor="gray"
                        secureTextEntry={true}
                        value={values.password}
                        style={{
                          borderBottomWidth: 1,
                          width: "100%",
                          borderBottomColor: "gray",
                        }}
                      />
                    </Box>
                    {errors.password && (
                      <Text style={{fontSize: 10, color: "red"}}>
                        {errors.password}
                      </Text>
                    )}
                  </Box>
                  <Box>
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
                        secureTextEntry={true}
                        value={values.confirmPassword}
                        style={{
                          borderBottomWidth: 1,
                          width: "100%",
                          borderBottomColor: "gray",
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
                  <Box
                    center
                    bg="white"
                    w={100}
                    radius="lg"
                    style={{elevation: 10}}>
                    <TouchableOpacity onPress={handleSubmit}>
                      <Text p={8} bold>
                        Register
                      </Text>
                    </TouchableOpacity>
                  </Box>
                </Box>
                {/*Register Links*/}
                <Box dir="row" justify="center" my={4}>
                  <Text size="sm">already have an account?</Text>
                  <TouchableOpacity
                    style={{marginLeft: 10}}
                    onPress={() => navigation.navigate("Login")}>
                    <Text
                      size="sm"
                      bold
                      style={{
                        textDecorationLine: "underline",
                      }}>
                      login
                    </Text>
                  </TouchableOpacity>
                </Box>
              </>
            )}
          </Formik>
        </TouchableWithoutFeedback>
      </>
    </KeyboardAvoidingView>
  );
};

export default Register;
