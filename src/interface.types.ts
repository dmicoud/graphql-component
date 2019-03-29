
import { GraphQLSchema, Source, DocumentNode } from 'graphql';
import { IMocks, IResolvers } from 'graphql-tools';
import { DirectiveUseMap } from 'graphql-toolkit';

export type ContextFunction = ((ctx: object) => object);

export type ComponentContextFunction = ((component: IGraphQLComponent, ctx: object) => object);

export interface IContextMiddleware {
  name: string
  fn: ((object) => object)
}

export interface IGraphQLComponentConfig {
  component: IGraphQLComponent
  exclude: string[]
}

export interface IGraphQLComponent {
  execute: (input: string, options: { root: any, context: object, variables: object }) => Promise<any>
  schema: GraphQLSchema
  types: (string | Source | DocumentNode)[]
  importedTypes: (string | Source | DocumentNode)[]
  resolvers: IResolvers<any, any>
  importedResolvers: IResolvers<any, any>
  context: ContextFunction
  imports: IGraphQLComponent[],
  mocks: IMocks
}

export interface IComponentOptions {
  types: (string | Source | DocumentNode)[]
  resolvers: IResolvers<any, any>
  imports: (IGraphQLComponent|IGraphQLComponentConfig)[]
  mocks: MocksConfigFunction
  directives: DirectiveUseMap
  context: IContextConfig
  useMocks: boolean
  preserveTypeResolvers: boolean
};

export interface IContextConfig {
  namespace: string
  factory: ComponentContextFunction
}

export type MocksConfigFunction = (IMocks) => IMocks;

export type ResolverFunction = (_: any, args: any, ctx: any, info: any) => any;