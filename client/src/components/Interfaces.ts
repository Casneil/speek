
export interface ILoginInterface {
  email: string;
  password: string;
  navigation?: any;
}

export interface IRegisterInterface {
  email: string;
  username: string;
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
  getToken?: () => void;
  removeToken?: () => void;
  token?: string;
  setToken?: (accessToken: string, refreshToken: string) => void;
}
