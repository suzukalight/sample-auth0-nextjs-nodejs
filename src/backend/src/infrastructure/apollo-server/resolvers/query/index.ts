import { QueryResolvers } from 'schema';

import { User } from './User';

export const Query: QueryResolvers = {
  ...User,
};
