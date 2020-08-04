import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import './App.css';
import Cadastro from './components/Cadastro/Cadastro';
import Login from './components/Login/Login';
import GlobalStyle from './components/GlobalStyle/GlobalStyle'
import FeedPage from './components/FeedPage/FeedPage';
import PostPage from './components/PostPage/PostPage';

import { AppContainer } from './styles';

function App() {
  return <AppContainer>
    <GlobalStyle />
    <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <FeedPage />
          </Route>
          <Route exact path="/cadastro">
            <Cadastro

            />
          </Route>
          <Route exact path="/login">
            <Login 
            />
          </Route>
          <Route exact path="/post/:id">
            <PostPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </AppContainer>

}

export default App;