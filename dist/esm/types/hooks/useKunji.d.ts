/// <reference types="react" />
import { AuthUser, KunjiConfigurationProps } from '../types';
import ApiFactory from '../apis/ApiFactory';
import AuthAxiosFactory from '../AuthAxiosFactory';
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
export declare function KunjiProvider(props: KunjiConfigurationProps): JSX.Element;
export declare const useKunji: () => AuthContextValueI;
export {};
