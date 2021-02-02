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
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    token?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
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
    id: number; // Int!
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
  Mutation: { // field return type
    createProfile: NexusGenRootTypes['Profile'] | null; // Profile
    createSpeek: NexusGenRootTypes['Speek'] | null; // Speek
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
    users: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
  Speek: { // field return type
    author: NexusGenRootTypes['User'] | null; // User
    content: string | null; // String
    id: number; // Int!
  }
  User: { // field return type
    Profile: NexusGenRootTypes['Profile'] | null; // Profile
    email: string; // String!
    id: number; // Int!
    name: string | null; // String
    speeks: NexusGenRootTypes['Speek'][]; // [Speek!]!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    token: 'String'
    user: 'User'
  }
  Mutation: { // field return type name
    createProfile: 'Profile'
    createSpeek: 'Speek'
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
    users: 'User'
  }
  Speek: { // field return type name
    author: 'User'
    content: 'String'
    id: 'Int'
  }
  User: { // field return type name
    Profile: 'Profile'
    email: 'String'
    id: 'Int'
    name: 'String'
    speeks: 'Speek'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createProfile: { // args
      avatar?: string | null; // String
      bio?: string | null; // String
      location?: string | null; // String
      website?: string | null; // String
    }
    createSpeek: { // args
      content?: string | null; // String
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
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

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