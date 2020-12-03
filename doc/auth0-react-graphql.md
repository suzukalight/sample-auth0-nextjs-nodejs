---
title: 'React+GraphQL環境でAuth0による認証を行う'
emoji: '🧪'
type: 'tech' # tech: 技術記事 / idea: アイデア
topics: ['typescript', 'graphql', 'auth0', 'reactjs']
published: false
---

# Auth0 のセットアップ

## Auth0 に登録

https://auth0.com/

こちらからサインアップします。

デフォルトで 1 つテナントが作成されるので、それを利用しても良いですが、サンプル用に新しく 1 つ作成してみます；

画面右上のアバターアイコンから「+ Create tenant」をクリックし、下記の項目を入力します：

- Tenant: **Domain: react-graphql-sample-1**
- Region: **US**

## Auth0 アプリの作成と設定

画面左のメニューから「Applications」を選択し、「+ Create Applicatiion」ボタンをクリックします。ダイアログで下記の設定をします；

- Name: **react-graphql-sample-1**
- Choose an application type: **Single Page Web Applications**

作成したアプリのタブから「Settings」を選択し、下記の項目を追加しておきます；

- Allowed Callback URLs: http://localhost:8877/callback
- Allowed Logout URLs: http://localhost:8877
- Allowed Web Origins: http://localhost:8877

## API サーバを設定

画面左のメニューから「APIs」を選択し、「+ Create API」ボタンをクリックします。ダイアログで下記の設定をします；

- Name: **react-graphql-sample-1**
- Identifier: http://react-graphql-sample-1.com

## 必要な情報をメモ

アプリの環境変数として利用しますので、下記の情報についてメモを取っておいてください；

```ini
REACT_APP_AUTH0_DOMAIN=      # Applications - Domain
REACT_APP_AUTH0_CLIENT_ID=   # Applications - Client ID
REACT_APP_AUTH0_AUDIENCE=    # API - Identifier
REACT_APP_AUTH0_APP_ORIGIN=  # http://localhost:8877
REACT_APP_AUTH0_API_ORIGIN=  # http://localhost:7777

AUTH0_JWKS_URI=  # <YOUR_DOMAIN>/.well-known/jwks.json
AUTH0_AUDIENCE=  # API - Identifier
AUTH0_ISSUER=    # <YOUR_DOMAIN>
```

# 認証フロー

1. フロントエンドは、Auth0 が提供する SDK を使って、Auth0 の認証画面を表示する
1. Auth0 は、cookie に認証情報を書き込んだ上で、`/callback` へ戻してくる
1. フロントエンドは、必要な画面を表示する（ホーム画面など）
1. フロントエンドは、Auth0 認証トークンを Bearer に付与して、バックエンドと通信する
1. バックエンドは、トークンが Auth0 の署名を伴っているかを検証（jwks-rsa）し、有効であればデータを返す

下記の Auth0 による記事が詳しいです（フローの図あり）  
https://auth0.com/docs/sessions-and-cookies/manage-multi-site-short-long-lived-sessions

# フロントエンド

### 実装の大まかな流れ

1. Auth0Provider を作成し、Auth0 との通信および認証を管理
1. ApolloClient の Bearer へ Auth0 AccessToken を追加
1. Auth0 のトークンや認証ユーザを扱うための Hooks を作成
1. ログイン・ログアウト処理を追加
1. ログイン画面を追加
1. ページ保護機能を追加し、認証情報を持っている場合のみ表示

### 開発環境

- "react-scripts": "4.0.1",
- "tailwindcss": "^2.0.1"
- "@apollo/client": "^3.2.9",
- "@auth0/auth0-react": "^1.2.0"

## Universal Login

## Auth0Provider を作成し、Auth0 との通信および認証を管理

`@auth0/auth0-react` の `AuthoProvider` が Auth0 との接続を受け持ってくれます。必要な設定情報は `.env.local` ファイルに記述して渡してあげることにしましょう；

```ini:.env.local
REACT_APP_AUTH0_DOMAIN=      # Applications - Domain
REACT_APP_AUTH0_CLIENT_ID=   # Applications - Client ID
REACT_APP_AUTH0_AUDIENCE=    # API - Identifier
REACT_APP_AUTH0_APP_ORIGIN=  # http://localhost:8877
REACT_APP_AUTH0_API_ORIGIN=  # http://localhost:7777
```

```tsx:providers/Auth0Provider.tsx
import React from 'react';
import { Auth0Provider as BaseAuth0Provider, AppState } from '@auth0/auth0-react';

import { history } from '../hooks/router';

const onRedirectCallback = (appState: AppState) => {
  history.push(appState && appState.returnTo ? appState.returnTo : window.location.pathname);
};

const Auth0Provider: React.FC = ({ children }) => (
  <BaseAuth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN!}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
    audience={process.env.REACT_APP_AUTH0_AUDIENCE}
    scope="admin"
    redirectUri={`${window.location.origin}/callback`}
    onRedirectCallback={onRedirectCallback}
    useRefreshTokens
  >
    {children}
  </BaseAuth0Provider>
);

export default Auth0Provider;
```

## ApolloClient の Bearer へ Auth0 AccessToken を追加

ApolloClient で API サーバと通信をする際に、Auth0 の AccessToken を持っていれば、それを Bearer として付与する処理を追加します；

```tsx:provider/AuthorizedApolloProvider.tsx
import React from 'react';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';

const AuthorizedApolloProvider: React.FC = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_API_SERVER,
    credentials: 'same-origin',
    includeExtensions: true,
  });

  const authLink = setContext(async () => {
    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    });

    return {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const apolloClient = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default AuthorizedApolloProvider;
```

`useAuth0` Hooks によって、Auth0 の様々な機能が利用できます。`getAccessTokenSilently` は、Auth0 との認証情報をサイレントに（※ここでの対義語はポップアップ表示）取得してくれます。

## Provider の設置

```tsx:pages/Root.tsx
import Auth0Provider from './providers/Auth0';
import AuthorizedApolloProvider from './providers/AuthorizedApollo';

const App: React.FC = () => (
  <BrowserRouter>
    <Auth0Provider>
      <AuthorizedApolloProvider>
        <AppRouter />
      </AuthorizedApolloProvider>
    </Auth0Provider>
  </BrowserRouter>
);
```

## Auth0 の認証ユーザを取得できる Hooks の作成

`useAuth0User` Hooks を作って、認証済みユーザの情報や、認証処理中フラグなどを取得できるようにしておきます；

```tsx:hooks/auth0-user.tsx
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type Auth0User = {
  name: string;
  email: string;
  picture: string;
  token: object;
};
type Auth0UserHooksResult = {
  user: Auth0User | null;
  isLoading: boolean;
};
type Auth0UserHooksFunc = () => Auth0UserHooksResult;

export const useAuth0User: Auth0UserHooksFunc = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const [tokenLoaded, setTokenLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setTokenLoaded(true);
      }
    })();
    return () => {
      // cleanup
    };
  }, [getAccessTokenSilently]);

  if (isLoading || !tokenLoaded) {
    return {
      user: null,
      isLoading: true,
    };
  }

  return {
    user: user as Auth0User,
    isLoading: false,
  };
};
```

## ログイン・ログアウトボタンの設置

`loginWithRedirect` メソッドでログインが、`logout` メソッドでログアウトが、それぞれできるようになります；

```tsx:components/LoginButton/index.tsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="bg-blue-700 text-white border border-blue-700 font-bold py-2 px-6 rounded-md"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};

export default LoginButton;
```

```tsx:components/LogoutButton/index.tsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();

  return (
    <button
      className="bg-gray-200 hover:bg-gray-300 border border-gray-400 text-black font-bold py-2 px-6 rounded-md"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
```

## ログインページの設置

作成した useAuth0User Hooks を使って、認証済みであればログアウトボタンを、認証していなければログインボタンを表示するようにします；

```tsx:pages/index.tsx
import React from 'react';

import Loading from '../components/atoms/Loading';
import LoginButton from '../components/atoms/LoginButton';
import LogoutButton from '../components/atoms/LogoutButton';

import { useAuth0User } from '../hooks/auth0-user';

const RootPage: React.FC = () => {
  const { user, isLoading } = useAuth0User();

  if (isLoading) return <Loading />;

  return user ? (
    <div className="w-full h-full p-8 flex justify-center align-middle flex-col">
      <div className="flex flex-row justify-center align-middle m-12">authorized.</div>
      <div className="flex flex-row justify-center align-middle">
        <LogoutButton />
      </div>
    </div>
  ) : (
    <div className="w-full h-full p-8 flex justify-center align-middle flex-col">
      <div className="flex flex-row justify-center align-middle m-12">not authorized.</div>
      <div className="flex flex-row justify-center align-middle">
        <LoginButton />
      </div>
    </div>
  );
};

export default RootPage;
```

## ページの保護

`withAuthenticationRequired` HOC を利用すると、コンポーネントに対してページ保護をかけることができます；

```tsx:pages/account/index.tsx
import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';

import Loading from '../../components/atoms/Loading';
import LogoutButton from '../../components/atoms/LogoutButton';
import Profile from '../../components/molecules/Profile';

import { useAuth0User } from '../../hooks/auth0-user';

const AccountPage: React.FC = () => {
  const { user, isLoading } = useAuth0User();

  if (isLoading) return <Loading />;

  return (
    <div className="flex align-middle flex-col m-8">
      <div className="flex flex-row justify-center align-middle">
        <LogoutButton />
      </div>

      {user ? (
        <Profile name={user.name} email={user.email} picture={user.picture} token={user} />
      ) : (
        <div>user not found.</div>
      )}
    </div>
  );
};

export default withAuthenticationRequired(AccountPage);
```

withAuthenticationRequired でラップすると、認証されている場合はページが表示され、認証されていない場合はログインページへリダイレクトされる仕組みになっています。

## ログイン後に、保護されたページへ自動転送する

Auth0Provider を作成した際に設定した `onRedirectCallback` がそれに該当します；

```tsx:providers/Auth0Provider.tsx
const onRedirectCallback = (appState: AppState) => {
  history.push(appState && appState.returnTo ? appState.returnTo : window.location.pathname);
};
```

引数の appState.returnTo に、ログイン前に表示しようとしていたページが格納されており、そこへ遷移するように history.push します。

# バックエンド

apollo-server で GraphQL バックエンドを構成していることを前提に進めます。

## JWKS による JWT 署名の検証

```ts:src/backend/src/infrastructure/apollo-server/libraries/jwks-client.ts
import jwt, { Algorithm, GetPublicKeyOrSecret } from 'jsonwebtoken';
import jwksClient, { CertSigningKey, RsaSigningKey } from 'jwks-rsa';
import dotenv from 'dotenv';

dotenv.config();

const client = jwksClient({
  jwksUri: process.env.AUTH0_JWKS_URI!,
});

const getKey: GetPublicKeyOrSecret = (header, cb) => {
  client.getSigningKey(header.kid!, function (err, key) {
    const signingKey = (key as CertSigningKey).publicKey || (key as RsaSigningKey).rsaPublicKey;
    cb(null, signingKey);
  });
};

const options = {
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ['RS256'] as Algorithm[],
};

type AccessToken = {
  sub: string;
  [key: string]: string;
};
type VerifyTokenWithJwksFunc = (token: string) => Promise<{ error?: Error; decoded?: AccessToken }>;

export const verifyTokenWithJwks: VerifyTokenWithJwksFunc = async (token) =>
  new Promise((resolve, _reject) => {
    jwt.verify(token, getKey, options, (error, decoded) => {
      if (error) {
        resolve({ error });
      }
      if (decoded) {
        resolve({ decoded: decoded as AccessToken });
      }
    });
  });
```

## ApolloServer の context で JWT 検証を実行

```ts:src/backend/src/infrastructure/apollo-server/index.ts
/**
 * リクエストごとのコンテキスト情報を生成
 * @param req Express Request
 * @param dbConnection TypeORM Connection
 */
const getContext = async (
  req: Request,
  dbConnection: Connection
): Promise<ApolloServerContext> => {
  const authorizationHeader = req?.headers["authorization"] as string;
  const token = authorizationHeader?.replace(/^Bearer (.*)/, "$1");

  if (!token) return { dbConnection, actor: null };

  try {
    const { error, decoded } = await verifyTokenWithJwks(token);
    console.log(decoded?.sub, error);

    /* TODO: 得られた sub と、DBのユーザ情報を突き合わせる */

    return {
      dbConnection,
      actor: new UserEntity({ ... }),
    };
  } catch (e) {
    // NOTE: context 生成系でエラーをcatchしなかった場合、サーバ全体がダウンしてしまう
    console.error(e);
    return { dbConnection, actor: null };
  }
};
```
