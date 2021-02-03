import React, {useState} from "react";
// Native imports
import {
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";

// Third Party
import {gql, useMutation} from "@apollo/client";
import {Formik} from "formik";
import * as Yup from "yup";
import AntDesign from "react-native-vector-icons/AntDesign";
import {Box, Text} from "react-native-design-utility";

// Components
import MyButton from "../components/MyButton";
import MyImageComponent from "../components/MyImageComponent";

// Context
import {useAuthContext} from "../components/context/AuthContext";
// Emuns and Interfaces
import {ILoginInterface, IColorProps} from "../components/Interfaces";
import {ImageLocationEnum} from "../components/enums";
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
  const [borderColor, setBorderColor] = useState<IColorProps>({
    email: "gray",
    password: "gray",
  });
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
      .max(20, "Must be 25 characters or less")
      .required("Password required"),
  });

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="position">
      <Box bg="white">
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
              <MyImageComponent
                height={110}
                width={110}
                source={icon}
                marginBottom={-1}
                where={ImageLocationEnum.LOCAL}
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
                  <Box mb="md">
                    <Box dir="row" align="center">
                      <Box position="absolute" right={0}>
                        <AntDesign name="mail" size={17} color="black" />
                      </Box>
                      <Box dir="row" align="center">
                        <TextInput
                          onChangeText={handleChange("email")}
                          placeholder="Enter your email address"
                          placeholderTextColor="gray"
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
                    </Box>
                    {errors.email && (
                      <Text style={{fontSize: 10, color: "red"}}>
                        {errors.email}
                      </Text>
                    )}
                  </Box>
                  <Box mb="md">
                    <Box dir="row" align="center">
                      <Box position="absolute" right={0}>
                        <AntDesign name="lock" size={20} color="black" />
                      </Box>
                      <TextInput
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        placeholder="Password"
                        placeholderTextColor="gray"
                        secureTextEntry={true}
                        maxLength={25}
                        selectionColor={"#2196f3"}
                        onFocus={() =>
                          setBorderColor({
                            ...borderColor,
                            password: "#2196f3",
                          })
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
                </Box>
                <Box center mb="sm">
                  <MyButton name={"Log in"} functionHandeler={handleSubmit} />
                </Box>
                {/*Password Reset*/}
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
        <Box bg="white" h="100%"></Box>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default Login;
