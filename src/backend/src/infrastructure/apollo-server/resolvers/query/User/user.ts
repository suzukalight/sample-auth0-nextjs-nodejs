import { QueryResolvers } from '../../../../../_generated/graphql-types';
import { ApolloServerContext } from '../../../types';
import { GqlUserQueryService } from '../../../../../repository/typeorm/user/queryService/User';
import { GqlGetUserByIdPresenter } from '../../../../../presenter/user/GetUserById';
import {
  allowOnlyWhenActorHasMemberRole,
  denyIfNotSet,
} from '../../../../../policy/decision/common';
import { GetUserByIdInteractor } from '../../../../../usecase/query/user/GetUserById';

export const user: QueryResolvers<ApolloServerContext> = {
  user: async (_parent, args, { dbConnection, actor }) => {
    denyIfNotSet(args, ['id']);
    allowOnlyWhenActorHasMemberRole(actor);

    const queryService = new GqlUserQueryService(dbConnection);
    const presenter = new GqlGetUserByIdPresenter();
    const usecase = new GetUserByIdInteractor(queryService, presenter);

    await usecase.handle({ id: args?.id }, actor!);

    return presenter.getResponse();
  },
};
