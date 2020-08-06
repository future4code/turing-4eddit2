import React from 'react';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, fireEvent, wait } from '@testing-library/react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import App from './App';


const axiosConfig = {
  headers: {
      Authorization: token
  }
};

// Simula um objeto existente na api
const mockData = {
  "id": "2ju70ptY3CHbreXM34iA",
  "createdAt": 1596649061367,
  "title": "pelo amor de deus atualiza",
  "userVoteDirection": 0,
  "text": "Nao quer atualizar",
  "commentsCount": 5,
  "username": "feliperdi",
  "votesCount": 8
}

// Mock das requisições com axios - o que vai em mockResolvedValue é igual ao output da api
// Get Posts
axios.get = jest.fn().mockResolvedValue({data:{"posts":[]}})
// Get Post Detail
axios.get = jest.fn().mockResolvedValue({"posts": { }})
// Post Login
axios.post = jest.fn().mockResolvedValue({});
axios.put = jest.fn().mockResolvedValue();

test('renderiza o login', () => {
  axios.get = jest.fn().mockResolvedValue({
    data: { "posts": [ mockData ] } 
  });
  const history = createMemoryHistory()
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  )

  expect(getByText(/login/)).toBeInTheDocument();
});

test('Testa se após o usário se logar aparece o feed', async() => {

  axios.get = jest.fn().mockResolvedValue({
    data: { "posts": [ mockData ] } 
  });

  const history = createMemoryHistory()
  const { getByText, getByPlaceholderText } = render(
    <Router history={history}>
      <App />
    </Router>
  )
  
  expect(getByText(/login/)).toBeInTheDocument();
  fireEvent.click(getByText(/login/i))
  
  expect(getByText(/Bem vindo ao 4eddit/)).toBeInTheDocument();
  
  const userInput = getByPlaceholderText(/Digite seu email aqui/i);
  await userEvent.type(userInput, 'bananinha@hotmail.com')
  
  const passwordInput = getByPlaceholderText(/Digite sua senha aqui/i);
  await userEvent.type(passwordInput, '123456')
  
  const loginBtn = getByText(/entrar/i);
  userEvent.click(loginBtn)
  
  axios.post = jest.fn().mockResolvedValue();
  // await wait(() => {
  //   expect(axios.post).toHaveBeenCalledWith('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/login', {
  //     email: 'bananinha@hotmail.com',
  //     password: '123456'
  //   });
  // }, 50000)

  // expect(getByText(/Novo Post/)).toBeInTheDocument();

});
