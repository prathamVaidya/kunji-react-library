import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextValueI, AuthStateI, KunjiConfigurationProps, LoginPageQueryParams } from '../types';
import TokenStorage from '../TokenStorage';
import ApiFactory from '../apis/ApiFactory';
import AxiosFactory from '../AxiosFactory';
import axios from 'axios';
import AuthAxiosFactory from '../AuthAxiosFactory';
import { DEFAULT_AUTHORIZATION_SERVER_URL, DEFAULT_LOGIN_PAGE_URL } from '../config';

const AuthContext = createContext({});

const initiateAuthentication = (appId: string, loginPageUrl: string) => {
        const url = new URL(loginPageUrl);
        url.searchParams.set(LoginPageQueryParams.IS_SSO, 'true');
        url.searchParams.set(LoginPageQueryParams.APP_ID, appId);
        url.searchParams.set(LoginPageQueryParams.REDIRECT, window.location.href);
        window.location.assign(url)
}

export function KunjiProvider(props: KunjiConfigurationProps) {

    if(!props.config || !props.config.appId){
        throw new Error("Kunji Configuration Object is not defined in KunjiProvider or missing required params")
    }

    const appId = props.config.appId;
    const loginPageUrl = props.config.loginPageUrl ?? DEFAULT_LOGIN_PAGE_URL;
    const authorizationServerUrl = props.config.authorizationServerUrl ?? DEFAULT_AUTHORIZATION_SERVER_URL;

    const [authState, setAuthState] = useState<AuthStateI>({ 
            user: null,
            loading: true,
    });

    //  this client is only internal use
    const client = AxiosFactory(axios, {BACKEND_URL: authorizationServerUrl, APP_ID: props.config.appId})
    const ApiService = new ApiFactory(appId, client)

    const logout = ({reload} : {reload?: boolean} = {reload: false}) => {
        setAuthState({...authState, user: null, loading: false})
        TokenStorage.deleteAll();
        if(reload){
            window.location.reload();
        }
    }

    const refreshAccessToken = async () : Promise<boolean> => {
        const refreshToken = TokenStorage.getRefreshToken();
        if(refreshToken){
            const tokens = await ApiService.exchangeRefreshToken(refreshToken);
            if(tokens){
                TokenStorage.setAccessToken(tokens.access.token, tokens.access.expires);
                return true;
            } else {
                // Refresh Token expired
                logout();
            }
        }
        return false;
    }

    // authenticated axios. exported for outside use
    const oAxios = AuthAxiosFactory(axios, refreshAccessToken, {BASE_URL: props.config.axiosBaseUrl, APP_ID: props.config.appId})

    const refreshTokenChecker = async () => {
        if (TokenStorage.getRefreshToken()) {
        // if refresh token valid and access token is invalid then get new access token
        if (TokenStorage.isRefreshTokenValid()) {
            if (TokenStorage.isAccessTokenValid()) {
            // return because access token is already valid
            return;
            }
            if (await refreshAccessToken()) {
                // exchange successful
                // this get user API is only user here
                const accessToken = TokenStorage.getAccessToken()
                if(accessToken){
                    const user = await ApiService.getUserProfile()
                    if(user){
                        TokenStorage.setUser(user);
                    }else{
                        console.log("Unable to fetch User Error");
                    }
                }
            } else {
            TokenStorage.deleteAll();
            }
        } else {
            TokenStorage.deleteAll();
        }
        } else {
        TokenStorage.deleteAll();
        }
    };

    const loginWithAuthCodeService = async (authCode: string) : Promise<boolean> => {
            setAuthState({...authState, loading: true});
            const response = await ApiService.loginWithAuthCode(authCode);
            if(response){
                TokenStorage.setAccessToken(response.access.token, response.access.expires);
                TokenStorage.setRefreshToken(response.refresh.token, response.refresh.expires);
                TokenStorage.setUser(response.user);
                setAuthState({...authState, user: response.user, loading: false});
                return true;
            }
            else{
                // unable to login
                setAuthState({...authState, loading: false});
                return false;
            }
    }

    useEffect(() => {
        const url = new URL(window.location.href);
        const authCode = url.searchParams.get(LoginPageQueryParams.AUTH_CODE)

        if(authCode){
            // Delete the AuthCode query param from URL (FOR SECURITY REASONS)
            url.searchParams.delete(LoginPageQueryParams.AUTH_CODE);
            window.history.replaceState({}, '', url.toString());

            // Auth Code Found, Try login using auth code
            loginWithAuthCodeService(authCode);
        }

        const user = TokenStorage.getUser();
        if (user) {
            setAuthState((prevState) => {
                return {...prevState, user, loading: false}
            });
            refreshTokenChecker();
        }
        
        if(!user && !authCode){
            setAuthState((prevState) => {
                return {...prevState, loading: false}
            });
        }
    }, []);

    const finalAuthContextValue : AuthContextValueI = {
        user: authState.user,
        loading: authState.loading,
        appId,
        authorizationServerUrl,
        loginPageUrl,
        getAccessToken: TokenStorage.getAccessToken,
        getRefreshToken: TokenStorage.getRefreshToken,
        initiateAuthentication: () => {
            initiateAuthentication(appId, loginPageUrl)
        },
        logout,
        API: ApiService,
        oAxios
      }

  return <AuthContext.Provider value={finalAuthContextValue}>{props.children}</AuthContext.Provider>;
}

export const useKunji = (): AuthContextValueI => {
  return useContext(AuthContext) as AuthContextValueI;
};
