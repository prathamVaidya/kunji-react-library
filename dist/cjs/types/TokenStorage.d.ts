import { AuthUser } from './types';
declare class TokenStorage {
    private static readonly REFRESH_TOKEN;
    private static readonly REFRESH_TOKEN_EXPIRY;
    private static readonly ACCESS_TOKEN;
    private static readonly ACCESS_TOKEN_EXPIRY;
    private static readonly TOKEN_USER;
    static setAccessToken(token: string, expiry: string): void;
    static getAccessToken(): string | null;
    static getUser(): AuthUser | undefined;
    static setUser(result: AuthUser): void;
    static setRefreshToken(token: string, expiry: string): void;
    static getRefreshToken(): string | null;
    static isRefreshTokenValid(): boolean;
    static isAccessTokenValid(): boolean;
    static deleteAll(): void;
}
export default TokenStorage;
