import { Connection, Repository } from 'typeorm';
import { denyIfNotSet } from '../../../../policy/decision/common';
import {
  GetUserByIdQuery,
  GetUserByIdQueryResult,
  UserQueryService,
} from '../../../../usecase/query/user';
import { User as OrmUser, OrmUserFactory } from '../entity/User';

export class GqlUserQueryService implements UserQueryService {
  private dbConnection: Connection;
  private repository: Repository<OrmUser>;

  constructor(dbConnection: Connection) {
    this.dbConnection = dbConnection;
    this.repository = this.dbConnection.getRepository(OrmUser);
  }

  public async getUserById(query: GetUserByIdQuery) {
    denyIfNotSet(query, ['id']);
    const { id } = query;

    const result = await this.repository.findOne(id);
    if (!result) return { user: null };

    const res: GetUserByIdQueryResult = {
      user: OrmUserFactory.toDto(result),
    };
    return res;
  }
}
