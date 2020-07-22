import React from 'react';
import './App.css';

import Home from './components/Home'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { usertoken } from './userConfig'

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = usertoken
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

function App() {
  return (
    <ApolloProvider client={client}>
        <Nav/>
        <Home/>
        <Footer/>
    </ApolloProvider>
  );
}

export default App;
