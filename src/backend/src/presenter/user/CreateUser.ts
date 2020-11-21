import { CreateUserResponse } from 'schema';

import { toGqlUser } from '../utils/converter/user';
import {
  CreateUserPresenter,
  CreateUserOutputData,
} from '../../usecase/mutation/user/interface/presenter';

export class GqlCreateUserPresenter implements CreateUserPresenter {
  private response: CreateUserResponse | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: CreateUserOutputData) {
    this.response = {
      user: toGqlUser(response.user),
    };
  }
}
