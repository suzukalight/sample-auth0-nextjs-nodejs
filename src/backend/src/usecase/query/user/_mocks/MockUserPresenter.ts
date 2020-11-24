import {
  GetUserByIdPresenter,
  GetUserByIdOutputData,
  AllUsersPresenter,
  AllUsersOutputData,
} from '../interface/presenter';

export class MockGetUserByIdPresenter implements GetUserByIdPresenter {
  private response: GetUserByIdOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: GetUserByIdOutputData) {
    this.response = response;
  }
}

export class MockAllUsersPresenter implements AllUsersPresenter {
  private response: AllUsersOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: AllUsersOutputData) {
    this.response = response;
  }
}
