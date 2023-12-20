import AuthAxiosFactory from "../AuthAxiosFactory";
import ApiFactory from "../apis/ApiFactory";

export interface AuthUser {
    _id: string;
    fullName: string;
    username: string;
    picture: string;
    role: 'NORMAL' | 'ADMIN';
    email: string;
    isEmailVerified: boolean;
    strategies: 'EMAIL_OTP' | 'GOOGLE' | 'FACEBOOK' | 'APPLE' | 'MOBILE_OTP' | 'PASSWORD';
  }
  
  export interface AppState {
    user?: AuthUser;
  }
  
  export interface Tokens {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    };
  }


  export interface SuccessfulLoginResponse extends Tokens {
    user: AuthUser
  }
  
  export interface SSOAppI {
    appId: string;
    name: string;
    description: string;
    icon: string;
    allowAllDomains: boolean;
    allowedDomains: string;
    callbackUrl: string;
  }
  

export interface KunjiConfigurationProps { 
    children: React.ReactNode;
    config: {appId: string, authorizationServerUrl?: string, loginPageUrl?: string, axiosBaseUrl?: string};
 }

export enum LoginPageQueryParams {
  REDIRECT = 'redirect',
  SESSION_EXPIRED = 'session_expired',
  LOGOUT_SUCCESS = 'logout',
  IS_SSO = 'sso',
  APP_ID = 'app',
  AUTH_CODE = 'code',
}

export interface AuthStateI {
  user: AuthUser | null;
}

export interface AuthContextValueI {
  user: AuthUser | null;
  appId: string;
  authorizationServerUrl: string;
  loginPageUrl: string;
  initiateAuthentication: () => void
  logout: (config ?: {reload?: boolean}) => void,
  getAccessToken: () => string | null,
  getRefreshToken: () => string | null,
  API: InstanceType<typeof ApiFactory>,
  oAxios: ReturnType<typeof AuthAxiosFactory>,
}