import { Nullable, PagingInputData } from '../../type';
import { UserEntity } from '../../../../entity/user/UserEntity';

export type GetUserByIdInputData = {
  id: string;
  paging?: Nullable<PagingInputData>;
};

export interface GetUserByIdUseCase {
  handle(request: GetUserByIdInputData, actor: UserEntity): void;
}

export type AllUsersInputData = {
  paging?: Nullable<PagingInputData>;
};

export interface AllUsersUseCase {
  handle(request: AllUsersInputData, actor: UserEntity): void;
}
