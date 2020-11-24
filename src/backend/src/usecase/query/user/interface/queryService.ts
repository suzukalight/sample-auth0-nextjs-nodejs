import { UserDto } from '../../../../entity/user/UserDto';
import { Nullable, PagingInputData } from '../../type';

export type GetUserByIdQuery = {
  id: string;
  paging?: Nullable<PagingInputData>;
};
export type GetUserByIdQueryResult = {
  user: Nullable<UserDto>;
};

export type AllUsersQuery = {
  paging?: Nullable<PagingInputData>;
};
export type AllUsersQueryResult = {
  users: Nullable<UserDto[]>;
};

export interface UserQueryService {
  getUserById(query: GetUserByIdQuery): Promise<GetUserByIdQueryResult>;
  allUsers(query: AllUsersQuery): Promise<AllUsersQueryResult>;
}
