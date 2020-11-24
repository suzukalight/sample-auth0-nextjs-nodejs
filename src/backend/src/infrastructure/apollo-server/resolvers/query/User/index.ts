import { QueryResolvers } from 'schema';

import { ApolloServerContext } from '../../../types';
import { user } from './user';
import { users } from './users';

export const User: QueryResolvers<ApolloServerContext> = {
  ...user,
  ...users,
};
