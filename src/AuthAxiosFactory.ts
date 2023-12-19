import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosStatic, InternalAxiosRequestConfig } from 'axios';
import TokenStorage from './TokenStorage';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry: boolean;
}

const AuthAxiosFactory = (axios: AxiosStatic, refreshAccessToken: () => Promise<boolean>, config: { BASE_URL?: string, APP_ID: string} )  : AxiosInstance => {
  const options = {
    baseURL: config.BASE_URL, // undefined if not provided by user
  }

  const oAxios = axios.create(options);

  oAxios.interceptors.request.use(async (request: InternalAxiosRequestConfig) => {
    request.headers.Authorization = `Bearer ${TokenStorage.getAccessToken()}`;
    return request;
  });

  // Refer : https://www.bezkoder.com/react-refresh-token/

  oAxios.interceptors.response.use(
    (res: AxiosResponse) => {
      return res;
    },
    async (err: AxiosError) => {
      const originalConfig = err.config as CustomAxiosRequestConfig;

      if (originalConfig && err.response && err.response.status === 401 && !originalConfig._retry) {
        // Access Token was expired
        const refreshToken = TokenStorage.getRefreshToken();
        if (refreshToken) {
          originalConfig._retry = true;

          try {
            await refreshAccessToken();
            return oAxios(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    },
  );

  return oAxios
}






export default AuthAxiosFactory;
