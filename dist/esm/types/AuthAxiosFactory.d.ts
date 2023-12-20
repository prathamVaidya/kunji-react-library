import { AxiosInstance, AxiosStatic } from 'axios';
declare const AuthAxiosFactory: (axios: AxiosStatic, refreshAccessToken: () => Promise<boolean>, config: {
    BASE_URL?: string;
    APP_ID: string;
}) => AxiosInstance;
export default AuthAxiosFactory;
