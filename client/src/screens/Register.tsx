import React, {useState} from "react";
// import axios from "axios";
// Native imports
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Third Party
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
//Context
import {useAuthContext} from "../components/context/AuthContext";
// Emuns and Interfaces
import {IRegisterInterface} from "../components/Interfaces";
//Resource
const bgImg = require("../rsc/0100.jpg");
// Styles
import {globalColors, layout} from "../components/styles/globalStyles";

const Register: React.FC<IRegisterInterface> = (props) => {
  const navigation = useNavigation();
  const [user, setUser] = useState<IRegisterInterface>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {setToken, getToken} = useAuthContext();

  const handleRegistrationSubmit = async (): Promise<any> => {
    // await axios.post(`${APP_BASE_URL}user/register/`, {
    //   email: user.email.trim(),
    //   user_name: user.username.trim(),
    //   password: user.password.trim(),
    // });
    // const token = await axios.post(`${APP_BASE_URL}token/`, {
    //   email: user.email.trim(),
    //   password: user.password.trim(),
    // });
    // @ts-ignore
    setToken(token.data.access, token.data.refresh);
    setUser({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  // Set icon color;
  let iconColor = "";
  user.confirmPassword.trim() !== "" &&
  user.confirmPassword.trim() === user.password.trim()
    ? (iconColor = globalColors.greenPrimary)
    : (iconColor = globalColors.backgroundColorTomato);

  return (
    <View style={{height: "100%"}}>
      <ImageBackground
        source={bgImg}
        style={layout.image}
        imageStyle={layout.image}>
        <View style={layout.container}>
          <View style={layout.loginContainer}>
            <View style={layout.inputContainer}>
              <AntDesign name="mail" size={25} style={layout.iconStyle} />
              <TextInput
                placeholder="email"
                style={layout.textInput}
                placeholderTextColor="gray"
                onChangeText={(value: string) => {
                  setUser({...user, email: value});
                }}
                keyboardType={"email-address"}
                value={user.email}
                maxLength={30}
              />
            </View>
            <View style={layout.inputContainer}>
              <AntDesign name="user" size={25} style={layout.iconStyle} />
              <TextInput
                placeholder="username"
                style={layout.textInput}
                placeholderTextColor="gray"
                onChangeText={(value: string) => {
                  setUser({...user, username: value});
                }}
                keyboardType={"email-address"}
                value={user.username}
                maxLength={25}
              />
            </View>
            <View style={layout.inputContainer}>
              <AntDesign name="lock" size={30} style={layout.iconStyle} />
              <TextInput
                placeholder="password"
                style={layout.textInput}
                placeholderTextColor="gray"
                onChangeText={(value: string) => {
                  setUser({...user, password: value});
                }}
                secureTextEntry={true}
                value={user.password}
                maxLength={25}
              />
            </View>
            <View style={layout.inputContainer}>
              <TextInput
                placeholder="confirm password"
                style={[layout.textInput, {marginLeft: 45}]}
                placeholderTextColor="gray"
                onChangeText={(value: any) => {
                  setUser({...user, confirmPassword: value});
                }}
                secureTextEntry={true}
                value={user.confirmPassword}
                maxLength={25}
              />
              <Feather
                name={
                  user.confirmPassword !== "" &&
                  user.confirmPassword === user.password
                    ? "check-circle"
                    : "x-circle"
                }
                size={30}
                style={[
                  layout.iconStyle,
                  {position: "absolute", right: 8, color: iconColor},
                ]}
              />
            </View>
            {/*  Register*/}
            <TouchableOpacity
              style={{
                alignSelf: "center",
                marginTop: 20,
                backgroundColor: globalColors.grayPrimary,
                borderRadius: 25,
                padding: 8,
                width: "25%",
              }}
              onPress={handleRegistrationSubmit}>
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "white",
                }}>
                register
              </Text>
            </TouchableOpacity>
            {/*Register Links*/}
            <View style={layout.loginLinks}>
              <Text style={{fontSize: 14, color: "white", fontWeight: "bold"}}>
                already have an account?
              </Text>
              <TouchableOpacity
                style={{marginLeft: 10}}
                onPress={() => navigation.navigate("Login")}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "white",
                    textDecorationLine: "underline",
                    fontWeight: "bold",
                  }}>
                  login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Register;
