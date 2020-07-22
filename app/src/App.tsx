import React from 'react';
import './App.css';

import { Route, BrowserRouter, Switch } from 'react-router-dom'
import ApolloWrapper from './components/ApolloWrapper'
import Auth from './components/Auth'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'

function App() {
  return (
    <BrowserRouter>
        <Nav/>
        <Switch>
            <Route exact path='/' component={Auth}/>
            <Route path='/:token' component={ApolloWrapper} />
          </Switch>
        <Footer/>
    </BrowserRouter>
    );
}

export default App;
