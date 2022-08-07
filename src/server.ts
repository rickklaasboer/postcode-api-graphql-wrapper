import {ApolloServer} from 'apollo-server';
import schema from '@/schema';

const server = new ApolloServer({
    schema,
});

server.listen().then(({url}) => {
    console.log('Server ready and running at ' + url);
});
