import { AuthUser } from './types';

class TokenStorage {
  private static readonly REFRESH_TOKEN = '@refresh_token';
  private static readonly REFRESH_TOKEN_EXPIRY = '@refresh_token_expiry';
  private static readonly ACCESS_TOKEN = '@access_token';
  private static readonly ACCESS_TOKEN_EXPIRY = '@access_token_expiry';
  private static readonly TOKEN_USER = '@user';

  static setAccessToken(token: string, expiry: string): void {
    localStorage.setItem(TokenStorage.ACCESS_TOKEN, token);
    localStorage.setItem(TokenStorage.ACCESS_TOKEN_EXPIRY, expiry);
  }

  static getAccessToken(): string | null {
    return localStorage.getItem(TokenStorage.ACCESS_TOKEN);
  }

  static getUser(): AuthUser | undefined {
    const u = localStorage.getItem(TokenStorage.TOKEN_USER);
    return u ? (JSON.parse(u) as AuthUser) : undefined;
  }

  static setUser(result: AuthUser): void {
    localStorage.setItem(TokenStorage.TOKEN_USER, JSON.stringify(result));
  }

  static setRefreshToken(token: string, expiry: string): void {
    localStorage.setItem(TokenStorage.REFRESH_TOKEN, token);
    localStorage.setItem(TokenStorage.REFRESH_TOKEN_EXPIRY, expiry);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(TokenStorage.REFRESH_TOKEN);
  }

  static isRefreshTokenValid(): boolean {
    const t = localStorage.getItem(TokenStorage.REFRESH_TOKEN_EXPIRY);
    return !!t && new Date(t) >= new Date();
  }

  static isAccessTokenValid(): boolean {
    const t = localStorage.getItem(TokenStorage.ACCESS_TOKEN_EXPIRY);
    return !!t && new Date(t) >= new Date();
  }

  static deleteAll(): void {
    localStorage.removeItem(TokenStorage.ACCESS_TOKEN);
    localStorage.removeItem(TokenStorage.ACCESS_TOKEN_EXPIRY);
    localStorage.removeItem(TokenStorage.REFRESH_TOKEN);
    localStorage.removeItem(TokenStorage.REFRESH_TOKEN_EXPIRY);
    localStorage.removeItem(TokenStorage.TOKEN_USER);
  }
}

export default TokenStorage;
