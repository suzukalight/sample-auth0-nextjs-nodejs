import { Role, User } from '../../../_generated/graphql-types';
import { UserDto } from '../../../entity/user/UserDto';

export const toGqlUser = (user: UserDto | null | undefined): User | null => {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    roles: (user.roles as unknown) as Role[],
  };
};
