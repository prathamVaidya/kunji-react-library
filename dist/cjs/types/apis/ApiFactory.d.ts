import { AxiosInstance } from "axios";
import { AuthUser, SuccessfulLoginResponse, Tokens } from "../types";
declare class ApiFactory {
    private appId;
    private axios;
    constructor(appId: string, axios: AxiosInstance);
    private populateUrl;
    exchangeRefreshToken(refreshToken: string): Promise<Tokens | false>;
    loginWithAuthCode(authCode: string): Promise<SuccessfulLoginResponse | false>;
    getUserProfile(): Promise<AuthUser | false>;
}
export default ApiFactory;
