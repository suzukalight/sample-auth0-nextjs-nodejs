import { User } from '../../_generated/graphql-types';
import { toGqlUser } from '../utils/converter/user';
import {
  GetUserPresenter,
  GetUserOutputData,
} from '../../usecase/mutation/user/interface/presenter';

export class GqlGetUserPresenter implements GetUserPresenter {
  private response: User | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: GetUserOutputData) {
    this.response = toGqlUser(response?.user);
  }
}
