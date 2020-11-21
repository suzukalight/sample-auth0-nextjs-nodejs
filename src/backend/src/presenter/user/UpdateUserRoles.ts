import { UpdateUserRolesResponse } from 'schema';

import {
  UpdateUserRolesOutputData,
  UpdateUserRolesPresenter,
} from '../../usecase/mutation/user/interface/presenter';
import { toGqlUser } from '../utils/converter/user';

export class GqlUpdateUserRolesPresenter implements UpdateUserRolesPresenter {
  private response: UpdateUserRolesResponse | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: UpdateUserRolesOutputData) {
    this.response = { user: toGqlUser(response.user)! };
  }
}
