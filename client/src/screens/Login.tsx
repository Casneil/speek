import React from "react";
// Native imports
import {
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";

// Third Party
import {gql, useMutation} from "@apollo/client";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import AntDesign from "react-native-vector-icons/AntDesign";
import {Box, Text} from "react-native-design-utility";

// Context
import {useAuthContext} from "../components/context/AuthContext";
// Emuns and Interfaces
import {ILoginInterface} from "../components/Interfaces";
//Resource
const icon = require("../rsc/icon.jpg");
// Styles

// Mutation
const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const [login, {data}] = useMutation(LOGIN_MUTATION);
  const navigation = useNavigation();

  const {setUserToken} = useAuthContext();

  const initialValues: ILoginInterface = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email required"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Password required"),
  });

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="position">
      <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Box my="sm">
            <Text bold size="xl" center>
              Login
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
              const response = await login({
                variables: values,
              });
              //@ts-ignore
              setUserToken(response.data.login.token);

              setSubmitting(false);
            }}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
              <Box>
                <Box mx={60}>
                  <Box>
                    <Box dir="row" align="center">
                      <Box position="absolute" right={0}>
                        <AntDesign name="mail" size={18} color="black" />
                      </Box>
                      <Box dir="row" align="center">
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
                    </Box>
                    {errors.email && (
                      <Text style={{fontSize: 10, color: "red"}}>
                        {errors.email}
                      </Text>
                    )}
                  </Box>
                  <Box>
                    <Box dir="row" align="center">
                      <Box position="absolute" right={0}>
                        <AntDesign name="lock" size={18} color="black" />
                      </Box>
                      <TextInput
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        placeholder="Password"
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
                </Box>
                <Box center my="sm">
                  <Box
                    bg="white"
                    w={100}
                    center
                    radius="lg"
                    style={{elevation: 10}}>
                    <TouchableOpacity onPress={handleSubmit}>
                      <Text p={8} bold>
                        Log in
                      </Text>
                    </TouchableOpacity>
                  </Box>
                </Box>
                {/*Register Links*/}
                <Box dir="row" justify="center" my={4}>
                  <Text size="sm">Don't have an account?</Text>
                  <TouchableOpacity
                    style={{marginLeft: 10}}
                    onPress={() => navigation.navigate("Register")}>
                    <Text
                      size="sm"
                      bold
                      style={{
                        textDecorationLine: "underline",
                      }}>
                      Register
                    </Text>
                  </TouchableOpacity>
                </Box>
                <Box dir="row" justify="center">
                  <Text size="sm">Forget your password?</Text>
                  <TouchableOpacity style={{marginLeft: 10}}>
                    <Text
                      size="sm"
                      bold
                      style={{
                        textDecorationLine: "underline",
                      }}>
                      Reset
                    </Text>
                  </TouchableOpacity>
                </Box>
              </Box>
            )}
          </Formik>
        </TouchableWithoutFeedback>
      </>
    </KeyboardAvoidingView>
  );
};

export default Login;
