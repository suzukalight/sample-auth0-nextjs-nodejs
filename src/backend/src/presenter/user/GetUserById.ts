import { User } from '../../_generated/graphql-types';
import {
  GetUserByIdOutputData,
  GetUserByIdPresenter,
} from '../../usecase/query/user/interface/presenter';
import { toGqlUser } from '../utils/converter/user';

export class GqlGetUserByIdPresenter implements GetUserByIdPresenter {
  private response: User | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: GetUserByIdOutputData) {
    this.response = toGqlUser(response?.user);
  }
}
