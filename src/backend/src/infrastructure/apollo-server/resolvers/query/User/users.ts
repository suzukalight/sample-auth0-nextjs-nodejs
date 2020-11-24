import { QueryResolvers } from 'schema';

import { ApolloServerContext } from '../../../types';
import { GqlUserQueryService } from '../../../../../repository/typeorm/user/queryService/User';
import { GqlAllUsersPresenter } from '../../../../../presenter/user/AllUsers';
import { allowOnlyWhenActorHasMemberRole } from '../../../../../policy/decision/common';
import { AllUsersInteractor } from '../../../../../usecase/query/user/AllUsers';

export const users: QueryResolvers<ApolloServerContext> = {
  users: async (_parent, _args, { dbConnection, actor }) => {
    allowOnlyWhenActorHasMemberRole(actor);

    const queryService = new GqlUserQueryService(dbConnection);
    const presenter = new GqlAllUsersPresenter();
    const usecase = new AllUsersInteractor(queryService, presenter);

    await usecase.handle({}, actor!);

    return presenter.getResponse();
  },
};
