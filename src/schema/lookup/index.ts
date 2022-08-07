import {GraphQLField} from '@/graphql/GraphQLField';
import {lookupByAddress, lookupByCoordinates} from '@/resolvers/lookup';
import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

export const AddressLocationType = new GraphQLObjectType({
    name: 'AddressLocationType',
    fields: () => ({
        lon: {type: GraphQLFloat},
        lat: {type: GraphQLFloat},
    }),
});

export const AddressType = new GraphQLObjectType({
    name: 'Address',
    fields: () => ({
        streetNameShortened: {type: GraphQLString},
        streetName: {type: GraphQLString},
        houseNumberSuffix: {type: GraphQLString},
        postalCode: {type: GraphQLString},
        houseNumber: {type: GraphQLInt},
        location: {type: AddressLocationType},
        houseNumberAddition: {type: GraphQLString},
    }),
});

export const NeighbourhoodType = new GraphQLObjectType({
    name: 'Neighbourhood',
    fields: () => ({
        code: {type: GraphQLString},
        name: {type: GraphQLString},
    }),
});

export const DistrictType = new GraphQLObjectType({
    name: 'District',
    fields: () => ({
        code: {type: GraphQLString},
        name: {type: GraphQLString},
    }),
});

export const CityType = new GraphQLObjectType({
    name: 'City',
    fields: () => ({
        code: {type: GraphQLString},
        name: {type: GraphQLString},
    }),
});

export const MunicipalityType = new GraphQLObjectType({
    name: 'Municipality',
    fields: () => ({
        code: {type: GraphQLString},
        name: {type: GraphQLString},
    }),
});

export const ProvinceType = new GraphQLObjectType({
    name: 'Province',
    fields: () => ({
        code: {type: GraphQLString},
        name: {type: GraphQLString},
    }),
});

export const BuildingPurposeOfUseType = new GraphQLObjectType({
    name: 'PurposeOfUse',
    fields: () => ({
        bijeenkomstfunctie: {type: GraphQLBoolean},
        woonfunctie: {type: GraphQLBoolean},
        celfunctie: {type: GraphQLBoolean},
        overigeGebruiksfunctie: {
            type: GraphQLBoolean,
            resolve: ({overige_gebruiksfunctie}) => overige_gebruiksfunctie,
        },
        winkelfunctie: {type: GraphQLBoolean},
        sportfunctie: {type: GraphQLBoolean},
        kantoorfunctie: {type: GraphQLBoolean},
        logiesfunctie: {type: GraphQLBoolean},
        onderwijsfunctie: {type: GraphQLBoolean},
        gezondheidszorgfunctie: {type: GraphQLBoolean},
        industriefunctie: {type: GraphQLBoolean},
    }),
});

export const BuildingType = new GraphQLObjectType({
    name: 'Building',
    fields: () => ({
        surfaceArea: {type: GraphQLInt},
        constructionYear: {type: GraphQLInt},
        purposeOfUse: {type: BuildingPurposeOfUseType},
        perimeter: {type: GraphQLInt},
        type: {type: GraphQLString},
        status: {type: GraphQLString},
    }),
});

export const LookupType = new GraphQLObjectType({
    name: 'Lookup',
    fields: () => ({
        address: {type: AddressType},
        neighbourhood: {type: NeighbourhoodType},
        district: {type: DistrictType},
        city: {type: CityType},
        municipality: {type: MunicipalityType},
        province: {type: ProvinceType},
        building: {type: BuildingType},
    }),
});

export const CoordinatesInputType = new GraphQLInputObjectType({
    name: 'CoordinatesInput',
    fields: () => ({
        lat: {type: new GraphQLNonNull(GraphQLString)},
        lon: {type: new GraphQLNonNull(GraphQLString)},
    }),
});

export const LookupByLatLngField = new GraphQLField<
    unknown,
    unknown,
    {coordinates: {lat: string; lon: string}}
>({
    type: LookupType,
    args: {
        coordinates: {type: CoordinatesInputType},
    },
    resolve: async (_root, args) => {
        return lookupByCoordinates(args);
    },
});

export const LookupByAddressField = new GraphQLField<
    unknown,
    unknown,
    {postalCode: string; houseNumber: string}
>({
    type: LookupType,
    args: {
        postalCode: {type: GraphQLString},
        houseNumber: {type: GraphQLString},
    },
    resolve: async (_root, args) => {
        return lookupByAddress(args);
    },
});
