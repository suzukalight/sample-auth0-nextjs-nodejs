import { Connection, Repository } from 'typeorm';
import { NotFoundError } from '../../../../common/error';
import { RoleTypes } from '../../../../entity/common/Role';
import { UserEntity } from '../../../../entity/user/UserEntity';
import { UserRepository } from '../../../../usecase/mutation/user/interface/repository';
import { CreateUserInputData } from '../../../../usecase/mutation/user/interface/usecase';
import { User as OrmUser, OrmUserFactory } from '../entity/User';

export class GqlUserRepository implements UserRepository {
  private dbConnection: Connection;
  private repository: Repository<OrmUser>;

  constructor(dbConnection: Connection) {
    this.dbConnection = dbConnection;
    this.repository = this.dbConnection.getRepository(OrmUser);
  }

  public async getById(id: string) {
    const result = await this.repository.findOne(id);
    if (!result) return null;

    return OrmUserFactory.toEntity(result);
  }

  public async create(request: CreateUserInputData) {
    const user = new OrmUser(request.email, [RoleTypes.Anonymous]);
    const repository = this.dbConnection.getRepository(OrmUser);
    const result = await repository.save(user);

    return OrmUserFactory.toEntity(result);
  }

  public async update(userEntity: UserEntity) {
    const user = OrmUserFactory.fromEntity(userEntity);
    const saved = await this.repository.save(user);

    return OrmUserFactory.toEntity(saved);
  }

  public async delete(id: string) {
    const user = await this.repository.findOne(id);
    if (!user) throw new NotFoundError();

    await this.repository.softDelete(id);

    return OrmUserFactory.toEntity(user);
  }
}
