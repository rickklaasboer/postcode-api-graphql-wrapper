import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import {LookupByLatLngField, LookupByAddressField} from '@/schema/lookup';

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        lookupByAddress: LookupByAddressField,
        lookupByLatLng: LookupByLatLngField,
    }),
});

export default new GraphQLSchema({
    query: RootQueryType,
});
