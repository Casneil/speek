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
export interface IPostInterface {
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
