import React, {useState} from "react";
// import axios from "axios";
// Native imports
import {View, TextInput, ImageBackground, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import {StorageKeyEnum} from "../components/enums";
import {IRegisterInterface} from "../components/Interfaces";
//Resource
const bgImg = require("../rsc/0100.jpg");
// Styles
import {globalColors, layout} from "../components/styles/globalStyles";

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

  const {setUserToken} = useAuthContext();

  return (
    <Box>
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
            <Box mx={20}>
              <Box>
                <Box dir="row" align="center">
                  <AntDesign name="user" size={25} color="black" />
                  <TextInput
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    placeholder="name"
                    placeholderTextColor="gray"
                    value={values.name}
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
                  <AntDesign name="mail" size={25} color="black" />
                  <TextInput
                    onChangeText={handleChange("email")}
                    placeholder="email"
                    onBlur={handleBlur("email")}
                    keyboardType={"email-address"}
                    value={values.email}
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
                  <AntDesign name="lock" size={30} color="black" />
                  <TextInput
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    placeholder="password"
                    placeholderTextColor="gray"
                    secureTextEntry={true}
                    value={values.password}
                  />
                </Box>
                {errors.password && (
                  <Text style={{fontSize: 10, color: "red"}}>
                    {errors.password}
                  </Text>
                )}
              </Box>
              <Box>
                <Box dir="row">
                  <Feather
                    color={
                      values.confirmPassword !== "" && !errors.confirmPassword
                        ? "green"
                        : "red"
                    }
                    size={30}
                    name={
                      values.confirmPassword !== "" && !errors.confirmPassword
                        ? "check-circle"
                        : "x-circle"
                    }
                  />
                  <TextInput
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    placeholder="confirm password"
                    placeholderTextColor="gray"
                    secureTextEntry={true}
                    value={values.confirmPassword}
                  />
                </Box>
                {errors.confirmPassword && (
                  <Text style={{fontSize: 10, color: "red"}}>
                    {errors.confirmPassword}
                  </Text>
                )}
              </Box>
            </Box>
            <Box center>
              <TouchableOpacity onPress={handleSubmit}>
                <Text>Register</Text>
              </TouchableOpacity>
            </Box>
            {/*Register Links*/}
            <Box style={layout.loginLinks}>
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
    </Box>
    // <View style={{height: "100%"}}>
    //   <ImageBackground
    //     source={bgImg}
    //     style={layout.image}
    //     imageStyle={layout.image}>
    //     <View style={layout.container}>
    //       <View style={layout.loginContainer}>
    //         <View style={layout.inputContainer}>
    //           <AntDesign name="mail" size={25} style={layout.iconStyle} />
    //           <TextInput
    //             placeholder="email"
    //             style={layout.textInput}
    //             placeholderTextColor="gray"
    //             onChangeText={(value: string) => {
    //               setUser({...user, email: value});
    //             }}
    //             keyboardType={"email-address"}
    //             value={user.email}
    //             maxLength={30}
    //           />
    //         </View>
    //         <View style={layout.inputContainer}>
    //           <AntDesign name="user" size={25} style={layout.iconStyle} />
    //           <TextInput
    //             placeholder="username"
    //             style={layout.textInput}
    //             placeholderTextColor="gray"
    //             onChangeText={(value: string) => {
    //               setUser({...user, username: value});
    //             }}
    //             keyboardType={"email-address"}
    //             value={user.username}
    //             maxLength={25}
    //           />
    //         </View>
    //         <View style={layout.inputContainer}>
    //           <AntDesign name="lock" size={30} style={layout.iconStyle} />
    //           <TextInput
    //             placeholder="password"
    //             style={layout.textInput}
    //             placeholderTextColor="gray"
    //             onChangeText={(value: string) => {
    //               setUser({...user, password: value});
    //             }}
    //             secureTextEntry={true}
    //             value={user.password}
    //             maxLength={25}
    //           />
    //         </View>
    //         <View style={layout.inputContainer}>
    //           <TextInput
    //             placeholder="confirm password"
    //             style={[layout.textInput, {marginLeft: 45}]}
    //             placeholderTextColor="gray"
    //             onChangeText={(value: any) => {
    //               setUser({...user, confirmPassword: value});
    //             }}
    //             secureTextEntry={true}
    //             value={user.confirmPassword}
    //             maxLength={25}
    //           />
    // <Feather
    //   name={
    //     user.confirmPassword !== "" &&
    //     user.confirmPassword === user.password
    //       ? "check-circle"
    //       : "x-circle"
    //   }
    //             size={30}
    //             style={[
    //               layout.iconStyle,
    //               {position: "absolute", right: 8, color: iconColor},
    //             ]}
    //           />
    //         </View>
    //         {/*  Register*/}
    //         <TouchableOpacity
    //           style={{
    //             alignSelf: "center",
    //             marginTop: 20,
    //             backgroundColor: globalColors.grayPrimary,
    //             borderRadius: 25,
    //             padding: 8,
    //             width: "25%",
    //           }}
    //           onPress={handleRegistrationSubmit}>
    //           <Text
    //             style={{
    //               alignSelf: "center",
    //               fontSize: 18,
    //               fontWeight: "bold",
    //               color: "white",
    //             }}>
    //             register
    //           </Text>
    //         </TouchableOpacity>
    // {/*Register Links*/}
    // <View style={layout.loginLinks}>
    //   <Text style={{fontSize: 14, color: "white", fontWeight: "bold"}}>
    //     already have an account?
    //   </Text>
    //   <TouchableOpacity
    //     style={{marginLeft: 10}}
    //     onPress={() => navigation.navigate("Login")}>
    //     <Text
    //       style={{
    //         fontSize: 14,
    //         color: "white",
    //         textDecorationLine: "underline",
    //         fontWeight: "bold",
    //       }}>
    //       login
    //     </Text>
    //   </TouchableOpacity>
    // </View>
    //       </View>
    //     </View>
    //   </ImageBackground>
    // </View>
  );
};

export default Register;
