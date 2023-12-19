import { AxiosInstance } from "axios";
import Constants from "../Constants";
import { AuthUser, SuccessfulLoginResponse, Tokens } from "../types";
import TokenStorage from "../TokenStorage";

class ApiFactory {
  private appId: string;
  private axios: AxiosInstance;

  constructor(appId: string, axios: AxiosInstance) {
    this.appId = appId;
    this.axios = axios;
  }

  private populateUrl(url: string): string {
    return url.replace(':appId', this.appId);
  }

  public async exchangeRefreshToken(refreshToken: string): Promise<Tokens | false> {
    try {
      const data: Tokens = await this.axios
        .post(this.populateUrl(Constants.API.EXCHANGE_REFRESH_TOKEN), {
          refreshToken,
        })
        .then(({ data }: { data: { result: Tokens } }) => {
          return data.result;
        });

      return data;
    } catch (err) {
      return false;
    }
  }

  public async loginWithAuthCode(authCode: string): Promise<SuccessfulLoginResponse | false> {
    try {
      const data: SuccessfulLoginResponse = await this.axios
        .post(this.populateUrl(Constants.API.LOGIN_AUTH_CODE), {
          authCode,
        })
        .then(({ data }: { data: { result: SuccessfulLoginResponse } }) => {
          return data.result;
        });

      return data;
    } catch (err) {
      return false;
    }
  }

  public async getUserProfile(): Promise<AuthUser | false> {
    // Todo: Ideally, don't access TokenStorage from a factory. Find a better way.
    const accessToken = TokenStorage.getAccessToken();
    if(!accessToken) return false;
    try {
      const data = await this.axios
        .get(this.populateUrl(Constants.API.GET_AUTH_USER), {
          params : {accessToken}
        })
        .then(({ data }: { data: { result: AuthUser } }) => {
          return data.result;
        });

      return data;
    } catch (err) {
      return false;
    }
  }
}

export default ApiFactory;
