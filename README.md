# sample-auth0-react-nodejs

SPA(React) と Nodejs(ApolloServer) の Web サービスに対して、Auth0 による認証処理を追加するサンプルです。

# 構成

monorepo 構成で、下記のプロジェクトを含んでいます；

- schema: GraphQL schema 定義
  - graphql-codegen
- backend: ApolloServer による GraphQL バックエンド
  - express
  - TypeORM
  - sqlite
  - jwks-rsa
- frontend-react: React.js によるフロントエンド
  - tailwindCSS
  - apollo-client
  - @auth0/auth0-react

# 動作確認

## Auth0 サインアップ

https://auth0.com/

デフォルトで 1 つテナントが作成されるので、それを利用しても良いですが、サンプル用に新しく 1 つ作成してみます。  
画面右上のアバターアイコンから「+ Create tenant」をクリックし、下記の項目を入力します：

- Tenant: **Domain: react-graphql-sample-1**
- Region: **US**

画面左のメニューから「Applications」を選択し、「+ Create Applicatiion」ボタンをクリックします。ダイアログで下記の設定をします；

- Name: **react-graphql-sample-1**
- Choose an application type: **Single Page Web Applications**

作成したアプリのタブから「Settings」を選択し、下記の項目を追加しておきます；

- Allowed Callback URLs: http://localhost:8877/callback
- Allowed Logout URLs: http://localhost:8877
- Allowed Web Origins: http://localhost:8877

画面左のメニューから「APIs」を選択し、「+ Create API」ボタンをクリックします。ダイアログで下記の設定をします；

- Name: **react-graphql-sample-1**
- Identifier: http://react-graphql-sample-1.com

## セットアップ

```
git clone https://github.com/suzukalight/sample-auth0-react-nodejs
yarn
```

## 環境変数の設定

以下の環境変数ファイルを複製しておきます；

- backend: `.env.default` => `.env`
- frontend-react: `.env.default` => `.env.local`

アプリの環境変数として利用しますので、下記の情報について Auth0 の管理画面より取得してください；

```ini
# backend
AUTH0_JWKS_URI=  # <YOUR_DOMAIN>/.well-known/jwks.json
AUTH0_AUDIENCE=  # API - Identifier
AUTH0_ISSUER=    # <YOUR_DOMAIN>
```

```ini
# frontend-react
REACT_APP_AUTH0_DOMAIN=      # Applications - Domain
REACT_APP_AUTH0_CLIENT_ID=   # Applications - Client ID
REACT_APP_AUTH0_AUDIENCE=    # API - Identifier
REACT_APP_AUTH0_APP_ORIGIN=  # http://localhost:8877
REACT_APP_AUTH0_API_ORIGIN=  # http://localhost:7777
```

# 実行

```
yarn dev:backend
yarn dev:frontend-react
```

ログインボタンが表示されますので、そこからサインアップを選んで、アカウントを作ってください。以後はそのアカウントでサインインができるようになり、保護されたページを閲覧することができるようになります（`/account`, `/users` など）

# NOTE

- frontend-nextjs プロジェクトは WIP のものです
