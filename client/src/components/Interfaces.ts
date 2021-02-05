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
  author?: any;
  content: string;
  excerpt?: string;
  status?: string;
  title?: string;
  speek?: any;
  avatar?: string;
  createdAt?: Date;
  likes?: [];
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
  title?: string;
  excerpt?: string;
  content?: string;
}

export interface IUserProfile {
  id?: number | undefined;
  bio?: string;
  location?: string;
  website?: string;
  avatar?: string;
}
