import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';

import { UserList } from '../../components/pages/users';
import DefaultLayout from '../../components/layouts/DefaultLayout';

import { useAllUsersQuery, User } from '../../_generated/graphql-client';

export const UserListPage: React.FC = () => {
  const data = useAllUsersQuery();
  if (!data) return null;

  const { users } = data?.data || {};
  if (!users) return null;

  const _users = (users || []).filter((t) => !!t) as User[];
  return (
    <DefaultLayout>
      <UserList users={_users} />
    </DefaultLayout>
  );
};

export default withAuthenticationRequired(UserListPage);
