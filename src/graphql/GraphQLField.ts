import {Maybe} from '@/types';
import {
    FieldDefinitionNode,
    GraphQLFieldConfig as GraphQLFieldProps,
    GraphQLFieldConfigArgumentMap,
    GraphQLFieldExtensions,
    GraphQLFieldResolver,
    GraphQLOutputType,
} from 'graphql';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class GraphQLField<TSource, TContext, TArgs = {[argName: string]: any}> {
    description?: Maybe<string>;
    type: GraphQLOutputType;
    args?: GraphQLFieldConfigArgumentMap;
    resolve?: GraphQLFieldResolver<TSource, TContext, TArgs>;
    subscribe?: GraphQLFieldResolver<TSource, TContext, TArgs>;
    deprecationReason?: Maybe<string>;
    extensions?: Maybe<
        Readonly<GraphQLFieldExtensions<TSource, TContext, TArgs>>
    >;
    astNode?: Maybe<FieldDefinitionNode>;

    constructor({
        description,
        type,
        args,
        resolve,
        subscribe,
        deprecationReason,
        extensions,
        astNode,
    }: GraphQLFieldProps<TSource, TContext, TArgs>) {
        this.description = description;
        this.type = type;
        this.args = args;
        this.resolve = resolve;
        this.subscribe = subscribe;
        this.deprecationReason = deprecationReason;
        this.extensions = extensions;
        this.astNode = astNode;
    }
}
