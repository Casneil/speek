import {FileLocationEnum} from "./enums";

export interface IUSER {
  name: string;
  id: number;
}
export interface ILoginInterface {
  email: string;
  password: string;
  navigation?: any;
}

export interface IRegisterInterface {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  navigation?: any;
}
export interface ISpeekInterface {
  id?: number;
  author?: string;
  content?: string;
  excerpt?: string;
  status?: string;
  title?: string;
  posts?: any;
}
export interface IAuthInterface {
  authenticated?: boolean;
  getUserToken?: () => void;
  removeToken?: () => void;
  token?: string;
  setUserToken?: (token: string) => void;
}

export interface IColorProps {
  email?: string;
  name?: string;
  password?: string;
  confirmPassword?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  website?: string;
}

export interface IUserProfile {
  bio?: string;
  location?: string;
  website?: string;
  avatar?: string;
}
