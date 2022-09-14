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
  DateTime: any;
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
  deleteRemovedTodo?: Maybe<Array<Todo>>;
  editTodoContent?: Maybe<Todo>;
  editTodoDone?: Maybe<Todo>;
  recycleRemovedTodo?: Maybe<Todo>;
  removeTodo?: Maybe<Todo>;
  switchTodoOrder: Array<Todo>;
};


export type MutationAddNewTodoArgs = {
  data: CreateTodoInput;
};


export type MutationAddUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteRemovedTodoArgs = {
  data: TodoIdInput;
};


export type MutationEditTodoContentArgs = {
  data: UpdateTodoContentInput;
};


export type MutationEditTodoDoneArgs = {
  data: UpdateTodoDoneInput;
};


export type MutationRecycleRemovedTodoArgs = {
  data: TodoIdInput;
};


export type MutationRemoveTodoArgs = {
  data: TodoIdInput;
};


export type MutationSwitchTodoOrderArgs = {
  data: UpdateTodoOrderkeyInput;
};

export type Query = {
  __typename?: 'Query';
  retrieveAllRemovedTodo?: Maybe<Array<Todo>>;
  retrieveAllTodos?: Maybe<Array<Todo>>;
  retrieveAllUsers?: Maybe<Array<User>>;
  retrieveRemovedTodo?: Maybe<Todo>;
  retrieveTodo?: Maybe<Todo>;
  retrieveUserById: UserWithSnsType;
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
  done: Scalars['Boolean'];
  editable: Scalars['Boolean'];
  id: Scalars['String'];
  isRemoved: Scalars['Boolean'];
  orderKey: Scalars['Float'];
  removedDt?: Maybe<Scalars['DateTime']>;
  updatedDt?: Maybe<Scalars['DateTime']>;
  user: User;
  userId: Scalars['String'];
};

export type TodoIdInput = {
  id: Scalars['String'];
};

export type TodoIdOrderKey = {
  id: Scalars['String'];
  orderKey: Scalars['Float'];
};

export type UpdateTodoContentInput = {
  content?: InputMaybe<Scalars['JSON']>;
  id: Scalars['String'];
};

export type UpdateTodoDoneInput = {
  done: Scalars['Boolean'];
  id: Scalars['String'];
};

export type UpdateTodoOrderkeyInput = {
  TodoIdOrderKey: Array<TodoIdOrderKey>;
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
