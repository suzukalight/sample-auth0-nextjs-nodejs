import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
};

export enum Role {
  Anonymous = 'ANONYMOUS',
  Member = 'MEMBER',
  Admin = 'ADMIN'
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  roles: Array<Role>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type SignUpEmailPasswordRequest = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpEmailPasswordResponse = {
  __typename?: 'SignUpEmailPasswordResponse';
  user?: Maybe<User>;
  token: Scalars['String'];
};

export type SignInEmailPasswordRequest = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignInEmailPasswordResponse = {
  __typename?: 'SignInEmailPasswordResponse';
  user?: Maybe<User>;
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<CreateUserResponse>;
  deleteUser?: Maybe<DeleteUserResponse>;
  signInEmailPassword?: Maybe<SignInEmailPasswordResponse>;
  signUpEmailPassword?: Maybe<SignUpEmailPasswordResponse>;
  updateUserRoles?: Maybe<UpdateUserRolesResponse>;
};


export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserRequest>;
};


export type MutationDeleteUserArgs = {
  input?: Maybe<DeleteUserRequest>;
};


export type MutationSignInEmailPasswordArgs = {
  input?: Maybe<SignInEmailPasswordRequest>;
};


export type MutationSignUpEmailPasswordArgs = {
  input?: Maybe<SignUpEmailPasswordRequest>;
};


export type MutationUpdateUserRolesArgs = {
  input?: Maybe<UpdateUserRolesRequest>;
};

export enum OrderBy {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PagingInput = {
  cursor?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  totalCount?: Maybe<Scalars['Int']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  endCursor?: Maybe<Scalars['String']>;
};

export type CreateUserRequest = {
  email: Scalars['String'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  user?: Maybe<User>;
};

export type UpdateUserRolesRequest = {
  id: Scalars['ID'];
  roles: Array<Role>;
};

export type UpdateUserRolesResponse = {
  __typename?: 'UpdateUserRolesResponse';
  user: User;
};

export type DeleteUserRequest = {
  id: Scalars['ID'];
};

export type DeleteUserResponse = {
  __typename?: 'DeleteUserResponse';
  user: User;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Role: Role;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  SignUpEmailPasswordRequest: SignUpEmailPasswordRequest;
  SignUpEmailPasswordResponse: ResolverTypeWrapper<SignUpEmailPasswordResponse>;
  SignInEmailPasswordRequest: SignInEmailPasswordRequest;
  SignInEmailPasswordResponse: ResolverTypeWrapper<SignInEmailPasswordResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  OrderBy: OrderBy;
  PagingInput: PagingInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateUserRequest: CreateUserRequest;
  CreateUserResponse: ResolverTypeWrapper<CreateUserResponse>;
  UpdateUserRolesRequest: UpdateUserRolesRequest;
  UpdateUserRolesResponse: ResolverTypeWrapper<UpdateUserRolesResponse>;
  DeleteUserRequest: DeleteUserRequest;
  DeleteUserResponse: ResolverTypeWrapper<DeleteUserResponse>;
  Query: ResolverTypeWrapper<{}>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  User: User;
  ID: Scalars['ID'];
  String: Scalars['String'];
  DateTime: Scalars['DateTime'];
  SignUpEmailPasswordRequest: SignUpEmailPasswordRequest;
  SignUpEmailPasswordResponse: SignUpEmailPasswordResponse;
  SignInEmailPasswordRequest: SignInEmailPasswordRequest;
  SignInEmailPasswordResponse: SignInEmailPasswordResponse;
  Mutation: {};
  PagingInput: PagingInput;
  Int: Scalars['Int'];
  PageInfo: PageInfo;
  Boolean: Scalars['Boolean'];
  CreateUserRequest: CreateUserRequest;
  CreateUserResponse: CreateUserResponse;
  UpdateUserRolesRequest: UpdateUserRolesRequest;
  UpdateUserRolesResponse: UpdateUserRolesResponse;
  DeleteUserRequest: DeleteUserRequest;
  DeleteUserResponse: DeleteUserResponse;
  Query: {};
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type SignUpEmailPasswordResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignUpEmailPasswordResponse'] = ResolversParentTypes['SignUpEmailPasswordResponse']> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SignInEmailPasswordResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignInEmailPasswordResponse'] = ResolversParentTypes['SignInEmailPasswordResponse']> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUser?: Resolver<Maybe<ResolversTypes['CreateUserResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, never>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['DeleteUserResponse']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, never>>;
  signInEmailPassword?: Resolver<Maybe<ResolversTypes['SignInEmailPasswordResponse']>, ParentType, ContextType, RequireFields<MutationSignInEmailPasswordArgs, never>>;
  signUpEmailPassword?: Resolver<Maybe<ResolversTypes['SignUpEmailPasswordResponse']>, ParentType, ContextType, RequireFields<MutationSignUpEmailPasswordArgs, never>>;
  updateUserRoles?: Resolver<Maybe<ResolversTypes['UpdateUserRolesResponse']>, ParentType, ContextType, RequireFields<MutationUpdateUserRolesArgs, never>>;
}>;

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateUserResponse'] = ResolversParentTypes['CreateUserResponse']> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateUserRolesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateUserRolesResponse'] = ResolversParentTypes['UpdateUserRolesResponse']> = ResolversObject<{
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteUserResponse'] = ResolversParentTypes['DeleteUserResponse']> = ResolversObject<{
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  User?: UserResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  SignUpEmailPasswordResponse?: SignUpEmailPasswordResponseResolvers<ContextType>;
  SignInEmailPasswordResponse?: SignInEmailPasswordResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  CreateUserResponse?: CreateUserResponseResolvers<ContextType>;
  UpdateUserRolesResponse?: UpdateUserRolesResponseResolvers<ContextType>;
  DeleteUserResponse?: DeleteUserResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
