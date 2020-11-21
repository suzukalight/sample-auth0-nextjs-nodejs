import { MutationResolvers } from 'schema';

import { User } from './User';

export const Mutation: MutationResolvers = {
  ...User,
};
