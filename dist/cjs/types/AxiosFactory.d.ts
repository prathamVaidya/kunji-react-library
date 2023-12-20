import { AxiosInstance, AxiosStatic } from 'axios';
declare const AxiosFactory: (axios: AxiosStatic, config: {
    BACKEND_URL: string;
    APP_ID: string;
}) => AxiosInstance;
export default AxiosFactory;
