import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type CreateTodoInput = {
  content?: InputMaybe<Scalars['JSON']>;
};

export type CreateUserInput = {
  createDt: Scalars['DateTime'];
  email: Scalars['String'];
  name: Scalars['String'];
  snsTypeName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewTodo?: Maybe<Todo>;
  addUser: User;
  deleteAllRemovedTodos?: Maybe<Array<Todo>>;
  deleteRemovedTodo?: Maybe<Todo>;
  editTodoContent?: Maybe<Todo>;
  recycleRemovedTodo?: Maybe<Todo>;
  removeTodo?: Maybe<Todo>;
};


export type MutationAddNewTodoArgs = {
  data: CreateTodoInput;
};


export type MutationAddUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteRemovedTodoArgs = {
  id: Scalars['String'];
};


export type MutationEditTodoContentArgs = {
  data: UpdateTodoContentInput;
};


export type MutationRecycleRemovedTodoArgs = {
  id: Scalars['String'];
};


export type MutationRemoveTodoArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  retrieveAllRemovedTodo?: Maybe<Array<Todo>>;
  retrieveAllTodos?: Maybe<Array<Todo>>;
  retrieveAllUsers?: Maybe<Array<User>>;
  retrieveRemovedTodo?: Maybe<Todo>;
  retrieveTodo?: Maybe<Todo>;
  retrieveUserById?: Maybe<UserWithSnsType>;
  snsType: SnsType;
};


export type QueryRetrieveRemovedTodoArgs = {
  id: Scalars['String'];
};


export type QueryRetrieveTodoArgs = {
  id: Scalars['String'];
};


export type QuerySnsTypeArgs = {
  name: Scalars['String'];
};

export type SnsType = {
  __typename?: 'SnsType';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Todo = {
  __typename?: 'Todo';
  content?: Maybe<Scalars['JSON']>;
  createdDt: Scalars['DateTime'];
  id: Scalars['String'];
  isInactive: Scalars['Boolean'];
  isRemoved: Scalars['Boolean'];
  removedDt?: Maybe<Scalars['DateTime']>;
  updatedDt?: Maybe<Scalars['DateTime']>;
  user: User;
  userId: Scalars['String'];
};

export type UpdateTodoContentInput = {
  content?: InputMaybe<Scalars['JSON']>;
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  snsTypeId: Scalars['Float'];
};

export type UserWithSnsType = {
  __typename?: 'UserWithSnsType';
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  snsType: Scalars['String'];
  snsTypeId: Scalars['Float'];
};
