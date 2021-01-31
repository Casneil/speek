import React, {useState} from "react";
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
// Components
// import {axiosInstance} from "../../components/axios/axios";
// Emuns and Interfaces
import {ILoginInterface} from "../components/Interfaces";

//Resource
const bgImg = require("../../rsc/0100.jpg");
// Styles
import {useAuthContext} from "../components/context/AuthContext";
import {layout, globalColors} from "../components/styles/globalStyles";
const Login: React.FC<ILoginInterface> = (props) => {
  const navigation = useNavigation();

  const [user, setUser] = useState<ILoginInterface>({
    email: "",
    password: "",
  });

  const {setToken, getToken} = useAuthContext();

  const handleLoginSubmit = async (): Promise<any> => {
    // axiosInstance
    //   .post("token/", {
    //     email: user.email.trim(),
    //     password: user.password.trim(),
    //   })
    //   .then(async (response: any) => {
    //     try {
    //       // @ts-ignore
    //       setToken(response.data.access, response.data.refresh);
    //       axiosInstance.defaults.headers["Authorization"] = "JWT " + getToken;
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   })
    //   .catch((error: any) => {
    //     console.warn(error);
    //   });
    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <View
      style={{
        height: "100%",
      }}>
      <ImageBackground
        source={bgImg}
        style={layout.image}
        imageStyle={layout.image}>
        <View style={layout.container}>
          <View style={layout.loginContainer}>
            <View style={layout.inputContainer}>
              <AntDesign name="user" size={25} style={layout.iconStyle} />
              <TextInput
                placeholder="username"
                style={layout.textInput}
                placeholderTextColor="gray"
                onChangeText={(event) =>
                  setUser({
                    ...user,
                    email: event,
                  })
                }
                keyboardType={"email-address"}
                value={user.email}
                maxLength={25}
              />
            </View>
            <View style={layout.inputContainer}>
              <AntDesign name="lock" size={30} style={layout.iconStyle} />
              <TextInput
                placeholder="password"
                style={layout.textInput}
                placeholderTextColor="gray"
                onChangeText={(event) =>
                  setUser({
                    ...user,
                    password: event,
                  })
                }
                secureTextEntry={true}
                value={user.password}
                maxLength={25}
              />
            </View>
            {/*  Sign In*/}
            <TouchableOpacity
              style={{
                alignSelf: "center",
                marginTop: 20,
                backgroundColor: globalColors.grayPrimary,
                borderRadius: 25,
                padding: 8,
                width: "25%",
              }}
              onPress={handleLoginSubmit}>
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "white",
                }}>
                sign In
              </Text>
            </TouchableOpacity>
            {/*Register Links*/}
            <View style={layout.loginLinks}>
              <Text style={{fontSize: 14, color: "white", fontWeight: "bold"}}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                style={{marginLeft: 10}}
                onPress={() => navigation.navigate("Register")}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "white",
                    textDecorationLine: "underline",
                    fontWeight: "bold",
                  }}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[layout.loginLinks, {marginTop: -20}]}>
              <Text style={{fontSize: 14, color: "white", fontWeight: "bold"}}>
                Forget your password?
              </Text>
              <TouchableOpacity style={{marginLeft: 10}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "white",
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                  }}>
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;
