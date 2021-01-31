import React, {useState, createContext, useEffect, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Enums and Interfaces
import {StorageKeyEnum} from "../enums";
import {IAuthInterface} from "../Interfaces";
import {axiosInstance} from "../axios/axios";

//TODO: Finish auth flow for global auth context
export const AuthContext = createContext<IAuthInterface>({
  authenticated: false,
  getToken: () => null,
  removeToken: () => null,
  setToken: (accessToken: string, refreshToken: string) => null,
});
export const AuthContextProvider: React.FC = (props) => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  /*Get specified token from Async storgae
   * 1. Access Token .
   * 2. Refresh Token.
   * */
  const getToken = async (): Promise<any> => {
    try {
      const accessToken = await AsyncStorage.getItem(
        StorageKeyEnum.ACCESS_TOKEN,
      );
      const refreshToken = await AsyncStorage.getItem(
        StorageKeyEnum.REFRESH_TOKEN,
      );
      // @ts-ignore
      setAccessToken(accessToken);
      // @ts-ignore
      setRefreshToken(refreshToken);
      if (accessToken !== "" || refreshToken !== "") {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  /*Renoves both access tokens and refresh okens
   */
  const removeToken = async (): Promise<any> => {
    //TODO: solve access and refresh token issue.
    try {
      /* A post to the endpoint "user/logout/blacklist" must be made
      to add the token to the blacklist.
     */
      // await axiosInstance.post("user/logout/blacklist/", {
      //   refreshToken: AsyncStorage.getItem(StorageKeyEnum.REFRESH_TOKEN),
      // });
      // await AsyncStorage.removeItem(StorageKeyEnum.ACCESS_TOKEN);
      // await AsyncStorage.removeItem(StorageKeyEnum.REFRESH_TOKEN);
      setAccessToken("");
      setRefreshToken("");
      setIsAuthenticated(false);
      axiosInstance.defaults.headers["Authorization"] = null;
      // return Promise.resolve();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  /*Takes two parameters which are the type of tokens to set.
   * 1: Access Tokens
   * 2: Refresh Tokens
   * */
  const setToken = async (
    accessToken: string,
    refreshToken: string,
  ): Promise<any> => {
    await AsyncStorage.setItem(StorageKeyEnum.ACCESS_TOKEN, accessToken);
    await AsyncStorage.setItem(StorageKeyEnum.REFRESH_TOKEN, refreshToken);
    setIsAuthenticated(true);
  };

  // Context values
  const values: IAuthInterface = {
    authenticated: isAuthenticated,
    removeToken,
    token: accessToken,
    getToken,
    setToken,
  };

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
