import React from 'react';
import { User } from '../../../_generated/graphql-client';
import { Avatar } from '../../atoms/Avatar';

type AvatarAndNameProps = {
  src: string;
  name: string;
};
const AvatarAndName: React.FC<AvatarAndNameProps> = ({ src, name }) => (
  <div className="flex items-center">
    <div className="flex-shrink-0 w-12 h-12">
      <Avatar src={src} initial={name} />
    </div>
    <div className="ml-3">
      <p className="text-gray-900 whitespace-no-wrap">{name}</p>
    </div>
  </div>
);

const Text: React.FC = ({ children }) => (
  <p className="text-gray-900 whitespace-no-wrap">{children}</p>
);

const Th: React.FC = ({ children }) => (
  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
    {children}
  </th>
);

const Td: React.FC = ({ children }) => (
  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{children}</td>
);

type Status = 'active' | 'disabled' | 'deleted';
type StatusLabelProps = {
  status: Status;
};
const StatusColorTable = {
  none: { text: 'text-gray-900', bg: 'bg-gray-200' },
  active: { text: 'text-green-900', bg: 'bg-green-200' },
  disabled: { text: 'text-orange-900', bg: 'bg-orange-200' },
  deleted: { text: 'text-red-900', bg: 'bg-red-200' },
};
const StatusLabel: React.FC<StatusLabelProps> = ({ status }) => {
  const colorTable = StatusColorTable[status] || StatusColorTable.none;

  return (
    <span
      className={`relative inline-block px-3 py-1 font-semibold leading-tight ${colorTable.text}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 opacity-50 rounded-full ${colorTable.bg}`}
      ></span>
      <span className="relative">{status}</span>
    </span>
  );
};

type UserItemProps = {
  avatarUri: string;
  name: string;
  roles: string[];
  status: Status;
};
const UserItem: React.FC<UserItemProps> = ({ avatarUri, name, roles, status }) => {
  return (
    <tr>
      <Td>
        <AvatarAndName src={avatarUri} name={name} />
      </Td>
      <Td>
        <Text>{roles.join(', ')}</Text>
      </Td>
      <Td>
        <Text>Jan 21, 2020</Text>
      </Td>
      <Td>
        <StatusLabel status={status} />
      </Td>
    </tr>
  );
};

type UserListProps = {
  users: User[];
};
export const UserList: React.FC<UserListProps> = ({ users }) => (
  <div className="min-h-screen antialiased font-sans bg-gray-200">
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Users</h2>
        </div>

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <Th>User</Th>
                  <Th>Roles</Th>
                  <Th>Created at</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                <UserItem
                  avatarUri="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                  name="Vera Carpenter"
                  roles={['Admin', 'Member']}
                  status="active"
                />
                <UserItem
                  avatarUri="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                  name="Blake Bowman"
                  roles={['Member']}
                  status="active"
                />
                <UserItem
                  avatarUri="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                  name="Dana Moore"
                  roles={['Member']}
                  status="disabled"
                />
                <UserItem
                  avatarUri="https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"
                  name="Alonzo Cox"
                  roles={['Anonymous']}
                  status="deleted"
                />
                {users.map((user) => (
                  <UserItem
                    key={user.id}
                    avatarUri=""
                    name={user.email}
                    roles={user.roles}
                    status="active"
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);
