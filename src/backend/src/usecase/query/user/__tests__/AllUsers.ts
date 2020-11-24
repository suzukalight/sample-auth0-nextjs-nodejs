import { AllUsersInteractor } from '../AllUsers';
import { MockUserQueryService } from '../_mocks/MockUserQueryService';
import { MockAllUsersPresenter } from '../_mocks/MockUserPresenter';
import { UserDto } from '../../../../entity/user/UserDto';
import { UserEntity } from '../../../../entity/user/UserEntity';
import { RoleTypes } from '../../../../entity/common/Role';

/**
 * TODOを3つ作成しておく
 */
const setup = async () => {
  // create users
  const users: UserDto[] = [1, 2, 3].map((id) => ({
    id: `${id}`,
    email: `user${id}@email.com`,
    roles: [RoleTypes.Member],
  }));
  const repository = new MockUserQueryService(users);
  const actor = new UserEntity(users[0]);

  // interactor
  const presenter = new MockAllUsersPresenter();
  const interactor = new AllUsersInteractor(repository, presenter);

  return { actor, interactor, presenter };
};

describe('AllUsersInteractor', () => {
  test('OK: エンティティが取得できるか？', async () => {
    const { actor, interactor, presenter } = await setup();

    await interactor.handle({}, actor);

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.users?.length).toBe(3);
  });
});
