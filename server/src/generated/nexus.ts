/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import { Context as Context } from "./../context"


declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    model: NexusPrisma<TypeName, 'model'>
    crud: any
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CommentWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  LikedSpeekWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    token?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  Comment: { // root type
    content?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
  }
  LikedSpeek: { // root type
    id: number; // Int!
    likedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Mutation: {};
  Profile: { // root type
    avatar?: string | null; // String
    bio?: string | null; // String
    id: number; // Int!
    location?: string | null; // String
    website?: string | null; // String
  }
  Query: {};
  Speek: { // root type
    content?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    excerpt?: string | null; // String
    id: number; // Int!
    title?: string | null; // String
  }
  User: { // root type
    email: string; // String!
    id: number; // Int!
    name?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  Comment: { // field return type
    User: NexusGenRootTypes['User'] | null; // User
    content: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
  }
  LikedSpeek: { // field return type
    id: number; // Int!
    likedAt: NexusGenScalars['DateTime']; // DateTime!
    speek: NexusGenRootTypes['Speek']; // Speek!
  }
  Mutation: { // field return type
    createComment: NexusGenRootTypes['Comment'] | null; // Comment
    createProfile: NexusGenRootTypes['Profile'] | null; // Profile
    createSpeek: NexusGenRootTypes['Speek'] | null; // Speek
    deleteLike: NexusGenRootTypes['LikedSpeek'] | null; // LikedSpeek
    likeSpeek: NexusGenRootTypes['LikedSpeek'] | null; // LikedSpeek
    login: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    signup: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    updateProfile: NexusGenRootTypes['Profile'] | null; // Profile
  }
  Profile: { // field return type
    avatar: string | null; // String
    bio: string | null; // String
    id: number; // Int!
    location: string | null; // String
    website: string | null; // String
  }
  Query: { // field return type
    me: NexusGenRootTypes['User'] | null; // User
    speeks: Array<NexusGenRootTypes['Speek'] | null> | null; // [Speek]
    users: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
  Speek: { // field return type
    author: NexusGenRootTypes['User'] | null; // User
    comments: NexusGenRootTypes['Comment'][]; // [Comment!]!
    content: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    excerpt: string | null; // String
    id: number; // Int!
    likes: NexusGenRootTypes['LikedSpeek'][]; // [LikedSpeek!]!
    title: string | null; // String
  }
  User: { // field return type
    Profile: NexusGenRootTypes['Profile'] | null; // Profile
    comments: NexusGenRootTypes['Comment'][]; // [Comment!]!
    email: string; // String!
    id: number; // Int!
    likedSpeek: NexusGenRootTypes['LikedSpeek'][]; // [LikedSpeek!]!
    name: string | null; // String
    speeks: NexusGenRootTypes['Speek'][]; // [Speek!]!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    token: 'String'
    user: 'User'
  }
  Comment: { // field return type name
    User: 'User'
    content: 'String'
    createdAt: 'DateTime'
    id: 'Int'
  }
  LikedSpeek: { // field return type name
    id: 'Int'
    likedAt: 'DateTime'
    speek: 'Speek'
  }
  Mutation: { // field return type name
    createComment: 'Comment'
    createProfile: 'Profile'
    createSpeek: 'Speek'
    deleteLike: 'LikedSpeek'
    likeSpeek: 'LikedSpeek'
    login: 'AuthPayload'
    signup: 'AuthPayload'
    updateProfile: 'Profile'
  }
  Profile: { // field return type name
    avatar: 'String'
    bio: 'String'
    id: 'Int'
    location: 'String'
    website: 'String'
  }
  Query: { // field return type name
    me: 'User'
    speeks: 'Speek'
    users: 'User'
  }
  Speek: { // field return type name
    author: 'User'
    comments: 'Comment'
    content: 'String'
    createdAt: 'DateTime'
    excerpt: 'String'
    id: 'Int'
    likes: 'LikedSpeek'
    title: 'String'
  }
  User: { // field return type name
    Profile: 'Profile'
    comments: 'Comment'
    email: 'String'
    id: 'Int'
    likedSpeek: 'LikedSpeek'
    name: 'String'
    speeks: 'Speek'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createComment: { // args
      content: string; // String!
      id: number; // Int!
    }
    createProfile: { // args
      avatar?: string | null; // String
      bio?: string | null; // String
      location?: string | null; // String
      website?: string | null; // String
    }
    createSpeek: { // args
      content?: string | null; // String
      excerpt?: string | null; // String
      title?: string | null; // String
    }
    deleteLike: { // args
      id: number; // Int!
    }
    likeSpeek: { // args
      id?: number | null; // Int
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    signup: { // args
      email: string; // String!
      name?: string | null; // String
      password: string; // String!
    }
    updateProfile: { // args
      avatar?: string | null; // String
      bio?: string | null; // String
      id?: number | null; // Int
      location?: string | null; // String
      website?: string | null; // String
    }
  }
  Speek: {
    comments: { // args
      after?: NexusGenInputs['CommentWhereUniqueInput'] | null; // CommentWhereUniqueInput
      before?: NexusGenInputs['CommentWhereUniqueInput'] | null; // CommentWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    likes: { // args
      after?: NexusGenInputs['LikedSpeekWhereUniqueInput'] | null; // LikedSpeekWhereUniqueInput
      before?: NexusGenInputs['LikedSpeekWhereUniqueInput'] | null; // LikedSpeekWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  User: {
    comments: { // args
      after?: NexusGenInputs['CommentWhereUniqueInput'] | null; // CommentWhereUniqueInput
      before?: NexusGenInputs['CommentWhereUniqueInput'] | null; // CommentWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    likedSpeek: { // args
      after?: NexusGenInputs['LikedSpeekWhereUniqueInput'] | null; // LikedSpeekWhereUniqueInput
      before?: NexusGenInputs['LikedSpeekWhereUniqueInput'] | null; // LikedSpeekWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}