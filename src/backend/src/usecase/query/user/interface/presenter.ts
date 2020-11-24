import { Nullable } from '../../type';
import { UserDto } from '../../../../entity/user/UserDto';

export type GetUserByIdOutputData = {
  user: Nullable<UserDto>;
};

export interface GetUserByIdPresenter {
  output(response: GetUserByIdOutputData): void;
}

export type AllUsersOutputData = {
  users: Nullable<UserDto[]>;
};

export interface AllUsersPresenter {
  output(response: AllUsersOutputData): void;
}
