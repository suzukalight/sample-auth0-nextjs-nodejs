import { UserQueryService } from './interface/queryService';
import { AllUsersInputData, AllUsersUseCase } from './interface/usecase';
import { AllUsersOutputData, AllUsersPresenter } from './interface/presenter';
import { UserEntity } from '../../../entity/user/UserEntity';
import { denyIfNotSet } from '../../../policy/decision/common';

export class AllUsersInteractor implements AllUsersUseCase {
  private queryService: UserQueryService;
  private presenter: AllUsersPresenter;

  constructor(queryService: UserQueryService, presenter: AllUsersPresenter) {
    this.queryService = queryService;
    this.presenter = presenter;
  }

  public async handle(_request: AllUsersInputData, actor: UserEntity) {
    denyIfNotSet(actor, ['id']);

    // TODO: actorがfetchできる対象をconditionとして払い出す
    const result = await this.queryService.allUsers({});

    const outputData: AllUsersOutputData = { users: result.users };
    this.presenter.output(outputData);
  }
}
