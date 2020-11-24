import React from 'react';

import { UserList } from '../../components/pages/users';
import { useFetchUser } from '../../hooks/useUser';
import { useAllUsersQuery, User } from '../../_generated/graphql-client';

export const UserListPage: React.FC = () => {
  const { user, loading } = useFetchUser();
  const data = useAllUsersQuery();

  if (loading) return <div>loading...</div>;
  if (!user) return <div>user not found.</div>;

  if (!data) return null;

  const { users } = data?.data || {};
  if (!users) return null;

  const _users = (users || []).filter((t) => !!t) as User[];
  return <UserList users={_users} />;
};

export default UserListPage;
