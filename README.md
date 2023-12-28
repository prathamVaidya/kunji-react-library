# Kunji React Library

Setup Authentication and Authorization in your React application in seconds without any verification! Suitable for MVP, side projects or hackathon apps.

## Introduction

Kunji React Library handles kunji authentication and state automatically to simplify authentication and user management in your applications. The library provides two main components: `KunjiProvider` and `useKunji` hook, making it easy to integrate authentication features into your React projects.

> Also check the backend nodejs library for server: [kunji-node](https://www.npmjs.com/package/kunji-node)

## How to register App
Checkout [Kunji Official Site](https://kunji.prathamvaidya.in) for more information.

1. Login to [Kunji Dashboard](https://kunji.prathamvaidya.in/dashboard).
2. Go to Developer Mode.
3. Register your app by filling only 3 required fields.
4. You will see your App ID and Public Key.


## Installation

To install Kunji React, you can use npm or yarn:

```bash
# Using npm
npm install kunji-react

# Using yarn
yarn add kunji-react
```

## Basic Usage

The basic usage of this application is demonstrated in the following example. In case of advance usage check all the exposed APIs below.

### `KunjiProvider`

Wrap your main application component with `KunjiProvider` and pass the necessary configuration as props. This makes authentication context available to the rest of your application.

```jsx
import { KunjiProvider } from 'kunji-react';

const App = () => {
  const kunjiConfig = {
    appId: 'your-app-id',
  };

  return (
    <KunjiProvider config={kunjiConfig}>
      {/* Your application components */}
    </KunjiProvider>
  );
};
```

### `useKunji` Hook

Use the `useKunji` hook in any component to access authentication-related data and functions.

```jsx
import { useKunji } from 'kunji-react';

const MyComponent = () => {
  const {
    user,
    initiateAuthentication,
    logout,
    oAxios,
  } = useKunji();

  // Your component logic here

  // After user is logged in accessToken and refreshToken can be taken from useKunji or you can use oAxios which is an instance of axios that will automatically populate accessToken and handle accessToken expiry on API request.

  return 
  (<div>
    {
        user 
        ? 
        <div>
        Hello {user.fullName}
         <button onClick={() => logout()}> Logout </button>
        </div>
        :
        <div> <button onClick={() => initiateAuthentication()}> Login </button> </div>

    }
  </div>);
};
```

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox)](https://codesandbox.io/p/devbox/hp3887?embed=1)


## Configuration

When using `KunjiProvider`, you need to provide the necessary configuration through the `config` prop. Here are the available configuration options:

- `appId` (required): Your application's unique Application ID.
- `authorizationServerUrl` (optional): The URL of kunji authorization server.
- `loginPageUrl` (optional): The URL of kunji login page.
- `axiosBaseUrl` (optional): The base URL for the Axios instance used by Kunji React.

## useKunji (Advance Usage)

The `useKunji` hook can be used to access all the exposed APIs and state variables. The hook returns an object with the following fields:


| Field                    | Type                                         | Description                                                                                                                                                         |
|--------------------------|----------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| user                     | `AuthUser \| null`                             | The authenticated user object or null if not authenticated.                                                                                                      |
| appId                    | `string`                                       | Your Application ID.                                                                                                                              |
| authorizationServerUrl   | `string`                                       | The URL of Kunji authorization server.                                                                                                                              |
| loginPageUrl             | `string`                                       | The URL of Kunji login page.                                                                                                                                        |
| initiateAuthentication   | `() => void`                                   | Function to initiate the authentication process.                                                                                                                  |
| logout                   | `(config?: { reload?: boolean }) => void`      | Function to log the user out.                                                                                                                                      |
| getAccessToken           | `() => string \| null`                         | Function to retrieve the access token or null if not available.                                                                                                   |
| getRefreshToken          | `() => string \| null`                         | Function to retrieve the refresh token or null if not available.                                                                                                  |
| API                      | `{}`                                           | API Service that includes authentication-related API functions.                                                                                                            |
| API.exchangeRefreshToken | `(refreshToken: string) => Promise<Tokens \| false>` | Function to exchange a refresh token for new tokens. Returns a Promise with the new tokens or false if unsuccessful.                                   |
| API.loginWithAuthCode    | `(authCode: string) => Promise<SuccessfulLoginResponse \| false>` | Function to perform login using an authorization code. Returns a Promise with the login response or false if unsuccessful.                             |
| API.getUserProfile       | `() => Promise<AuthUser \| false>`              | Function to retrieve the user profile. Returns a Promise with the user profile or false if unsuccessful.                                                     |
| oAxios                   | `AxiosInstance`           | Axios instance that internally handles tokens. Use this to do any request that requires `accessToken` in `Authorization` Header                                                                       |

## User Object

The `user` object, obtained through the `useKunji` hook, represents the authenticated user. Here is a breakdown of its fields:

| Field              | Type                                      | Description                                       |
|--------------------|-------------------------------------------|---------------------------------------------------|
| `_id`              | `string`                                  | Unique identifier for the user.                   |
| `fullName`        | `string`                                  | Full name of the user.                            |
| `username`        | `string`                                  | User's username.                                  |
| `picture`         | `string`                                  | URL of the user's profile picture.                |
| `role`            | `'NORMAL' \| 'ADMIN'`                      | User's role or permission level.                  |
| `email`           | `string`                                  | User's email address.                             |
| `isEmailVerified` | `boolean`                                 | Indicates whether the user's email is verified.  |
| `strategies`      | `'EMAIL_OTP' \| 'GOOGLE' \| 'FACEBOOK' \| 'APPLE' \| 'MOBILE_OTP' \| 'PASSWORD'`            | Authentication strategies used by the user.      |

The `user` object provides essential information about the authenticated user, allowing you to personalize the user experience based on their identity and roles. The `AuthUser` interface defines the structure of the `user` object, providing clarity on the available fields and their data types.


## Contributions

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as needed. debugger eval code:5:9
