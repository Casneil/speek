import React, {useState, createContext, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Enums and Interfaces
import {StorageKeyEnum} from "../enums";
import {IAuthInterface} from "../Interfaces";

//TODO: Finish auth flow for global auth context
export const AuthContext = createContext<IAuthInterface>({
  authenticated: false,
  getUserToken: () => null,
  removeToken: () => null,
  setUserToken: (token: string) => null,
});
export const AuthContextProvider: React.FC = (props) => {
  const [token, setToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  /*Get specified token from Async storgae
   * 1. Access Token .
   * */
  const getUserToken = async (): Promise<any> => {
    try {
      const token = await AsyncStorage.getItem(StorageKeyEnum.TOKEN);
      token && setIsAuthenticated(true);
      // @ts-ignore
      setToken(token);
    } catch (error) {
      console.log(error);
    }
  };
  /*Renoves both access tokens and refresh okens
   */
  const removeToken = async (): Promise<any> => {
    try {
      await AsyncStorage.removeItem(StorageKeyEnum.TOKEN);

      setToken("");
      setIsAuthenticated(false);
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  /*Takes two parameters which are the type of tokens to set.
   * 1: Access Tokens
   * */
  const setUserToken = async (token: string): Promise<any> => {
    await AsyncStorage.setItem(StorageKeyEnum.TOKEN, token);
    setIsAuthenticated(true);
  };

  React.useEffect(() => {
    getUserToken();
  }, [token]);

  // Context values
  const values: IAuthInterface = {
    authenticated: isAuthenticated,
    removeToken,
    getUserToken,
    setUserToken,
  };

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
