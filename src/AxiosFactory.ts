import { AxiosInstance, AxiosStatic } from 'axios';

const AxiosFactory = (axios: AxiosStatic, config: { BACKEND_URL: string, APP_ID: string} ) : AxiosInstance => {

const options = {
  baseURL: config.BACKEND_URL,
};

//  use this for public requests that do not require authentication.
return axios.create(options);
}


export default AxiosFactory