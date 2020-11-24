import { Connection } from 'typeorm';

import { Maybe } from '../../_generated/graphql-types';
import { UserEntity } from '../../entity/user/UserEntity';

export interface ApolloServerContext {
  dbConnection: Connection;
  actor: Maybe<UserEntity>;
}
