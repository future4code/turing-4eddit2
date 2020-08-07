import React, { useReducer } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import './App.css';
import Cadastro from './components/Cadastro/Cadastro';
import Login from './components/Login/Login';
import GlobalStyle from './components/GlobalStyle/GlobalStyle'
import FeedPage from './components/FeedPage/FeedPage';
import PostPage from './components/PostPage/PostPage';
import ErrorPage from './components/ErrorPage/ErrorPage';

import { AppContainer } from './styles';

function App() {
  return <AppContainer>
    <GlobalStyle />
    <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <FeedPage 
              data-testid='feed' 
            />
          </Route>
          <Route exact path="/cadastro">
            <Cadastro 
              data-testid='cadastro'
            />
          </Route>
          <Route exact path="/login">
            <Login 
              data-testid='login'
            />
          </Route>
          <Route exact path="/post/:id">
            <PostPage 
              data-testid='post-page' 
            />
          </Route>
          <Route path="/">
            <ErrorPage 
              data-testid='error' 
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </AppContainer>

}

export default App;