/// <reference types="react" />
import { AxiosInstance, AxiosStatic } from 'axios';

interface AuthUser {
    _id: string;
    fullName: string;
    username: string;
    picture: string;
    role: 'NORMAL' | 'ADMIN';
    email: string;
    isEmailVerified: boolean;
    strategies: 'EMAIL_OTP' | 'GOOGLE' | 'FACEBOOK' | 'APPLE' | 'MOBILE_OTP' | 'PASSWORD';
}
interface Tokens {
    access: {
        token: string;
        expires: string;
    };
    refresh: {
        token: string;
        expires: string;
    };
}
interface SuccessfulLoginResponse extends Tokens {
    user: AuthUser;
}
interface KunjiConfigurationProps {
    children: React.ReactNode;
    config: {
        appId: string;
        authorizationServerUrl?: string;
        loginPageUrl?: string;
        axiosBaseUrl?: string;
    };
}

declare class ApiFactory {
    private appId;
    private axios;
    constructor(appId: string, axios: AxiosInstance);
    private populateUrl;
    exchangeRefreshToken(refreshToken: string): Promise<Tokens | false>;
    loginWithAuthCode(authCode: string): Promise<SuccessfulLoginResponse | false>;
    getUserProfile(): Promise<AuthUser | false>;
}

declare const AuthAxiosFactory: (axios: AxiosStatic, refreshAccessToken: () => Promise<boolean>, config: {
    BASE_URL?: string;
    APP_ID: string;
}) => AxiosInstance;

interface AuthContextValueI {
    user: AuthUser | null;
    appId: string;
    authorizationServerUrl: string;
    loginPageUrl: string;
    initiateAuthentication: () => void;
    logout: (config?: {
        reload?: boolean;
    }) => void;
    getAccessToken: () => string | null;
    getRefreshToken: () => string | null;
    API: InstanceType<typeof ApiFactory>;
    oAxios: ReturnType<typeof AuthAxiosFactory>;
}
declare function KunjiProvider(props: KunjiConfigurationProps): JSX.Element;
declare const useKunji: () => AuthContextValueI;

declare const version = "1.7";

export { KunjiProvider, useKunji, version };
