import dotenv from 'dotenv';
import { Express, Request } from 'express';
import path from 'path';
import { Server } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { Connection } from 'typeorm';

// import { User } from '../../_generated/graphql-types';
import { ApolloServerContext } from './types';
import { resolvers } from './resolvers';
// import { GqlUserRepository } from '../../repository/typeorm/user/repository/User';
import { RoleTypes, UserEntity } from '../../entity';
import { verifyTokenWithJwks } from './libraries/jwks-client';

dotenv.config();

/**
 * リクエストごとのコンテキスト情報を生成
 * @param req Express Request
 * @param dbConnection TypeORM Connection
 */
const getContext = async (req: Request, dbConnection: Connection): Promise<ApolloServerContext> => {
  const authorizationHeader = req?.headers['authorization'] as string;
  const token = authorizationHeader?.replace(/^Bearer (.*)/, '$1');

  if (!token)
    return {
      dbConnection,
      actor: new UserEntity({ id: '1', email: 'aaa@bbb.com', roles: [RoleTypes.Member] }),
    }; // FIXME

  try {
    const { error, decoded } = await verifyTokenWithJwks(token);
    console.log(decoded?.sub, error);

    // const repository = new GqlUserRepository(dbConnection);
    // const userEntity = await repository.getById(user.id);

    return {
      dbConnection,
      actor: new UserEntity({ id: '1', email: 'aaa@bbb.com', roles: [RoleTypes.Member] }), // FIXME
    };
  } catch (e) {
    // NOTE: context 生成系でエラーをcatchしなかった場合、サーバ全体がダウンしてしまう
    console.error(e);
    return { dbConnection, actor: null };
  }
};

/**
 * サーバをセットアップ
 * @param dbConnection TypeORM Connection
 * @param expressApp Express app instance
 * @param httpServer http.Server instance
 */
export const createApolloServer = async (
  dbConnection: Connection,
  expressApp: Express,
  httpServer: Server,
): Promise<ApolloServer> => {
  // Configure GraphQL Server
  const schema = loadSchemaSync(path.join(__dirname, '../../_generated/schema.graphql'), {
    loaders: [new GraphQLFileLoader()],
  });
  const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers,
  });

  // Create GraphQL Server and Apply to Express
  const server = new ApolloServer({
    schema: schemaWithResolvers,
    context: ({ req }) => getContext(req, dbConnection),
  });
  server.applyMiddleware({ app: expressApp, path: '/graphql' });
  server.installSubscriptionHandlers(httpServer);

  return server;
};
