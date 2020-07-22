import React from 'react'

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import LinuxStats from './LinuxStats'

const httpLink = createHttpLink({   
    uri: 'https://api.github.com/graphql',
});
  
const authLink = setContext((_, { headers }) => {
    const token = window.location.pathname.split('/')[1]
    return {
        headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const ApolloWrapper = () => {
    return (
        <ApolloProvider client={client}>
            <LinuxStats/>
        </ApolloProvider>
    );
    
}

export default ApolloWrapper