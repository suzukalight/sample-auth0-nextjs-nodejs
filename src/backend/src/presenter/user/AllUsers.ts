import { User } from '../../_generated/graphql-types';
import {
  AllUsersOutputData,
  AllUsersPresenter,
} from '../../usecase/query/user/interface/presenter';
import { toGqlUser } from '../utils/converter/user';

export class GqlAllUsersPresenter implements AllUsersPresenter {
  private response: User[] | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: AllUsersOutputData) {
    this.response = response?.users?.map((user) => toGqlUser(user)!) || null;
  }
}
