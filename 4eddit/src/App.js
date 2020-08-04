import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import './App.css';
import Cadastro from './components/Cadastro/Cadastro';
import Login from './components/Login/Login';
import GlobalStyle from './components/GlobalStyle/GlobalStyle'

function App() {
  return <div>
    <GlobalStyle />
    <BrowserRouter>
        <Switch>
          <Route exact path="/cadastro">
            <Cadastro

            />
          </Route>
          <Route exact path="/login">
            <Login 
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>

}


  


export default App;
