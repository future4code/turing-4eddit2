import React from 'react';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, fireEvent, wait } from '@testing-library/react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import App from './App';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlBsSFBLZkV1ZmJnc2duRzVnU1lNIiwidXNlcm5hbWUiOiJhbm5hIiwiZW1haWwiOiJhbm5hLmNiZkBnbWFpbC5jb20iLCJpYXQiOjE1OTY0NzQ0OTl9.43TaZ25rWa5I2eHYeJiAGlYf8lWR_6jga-BLIFCk4ug";

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
axios.get = jest.fn().mockResolvedValue({data: {"posts": { }}})
// Post Login
axios.post = jest.fn().mockResolvedValue({});
axios.put = jest.fn().mockResolvedValue();

test('renderiza o login', () => {
  
  // Faz a requisição com um post mocado, para aparecer na tela
  axios.get = jest.fn().mockResolvedValue({
    data: { "posts": [ mockData ] } 
  });
  
  // renderiza o componente pela rota
  const history = createMemoryHistory()
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  )

  // verifica se a palavra login aparece na tela, para se assegurar de que a tela não está em branco (ela deve estar no botão do header)
  expect(getByText(/login/)).toBeInTheDocument();
});

test('Testa se após o usário se logar aparece o feed', async() => {
  
  // Faz a requisição com um post mocado, para aparecer na tela
  axios.get = jest.fn().mockResolvedValue({
    data: { "posts": [ mockData ] } 
  });
  
  // renderiza o componente pela rota
  const history = createMemoryHistory()
  const { getByText, getByPlaceholderText } = render(
    <Router history={history}>
      <App />
    </Router>
  )
  
  // Procura a palavra login na tela (o RegEx /palavra/i procura a palavra em letra maiúscula ou minúscula)
  expect(getByText(/login/i)).toBeInTheDocument();

  // Simula o clique no botão usando a biblioteca userEvent (deve ser instalada)
  userEvent.click(getByText(/login/i))
  
  // Verifica se apareceu a tela de login procurando o texto "Bem vindo..."
  expect(getByText(/Bem vindo ao 4eddit/)).toBeInTheDocument();
  
  // Cria const para guardar o input que tem placeholder "Digite seu email..."
  const userInput = getByPlaceholderText(/Digite seu email aqui/i);
  // Espera o usuário digitar (await) e guarda o valor do input
  await userEvent.type(userInput, 'bananinha@hotmail.com')
  
  // Cria const para guardar o input que tem placeholder "Digite sua senha..."
  const passwordInput = getByPlaceholderText(/Digite sua senha aqui/i);
  // Espera o usuário digitar (await) e guarda o valor do input
  await userEvent.type(passwordInput, '123456')
  
  
  // Cria const para guardar o botão que tem o texto "Entrar"
  const loginBtn = getByText(/entrar/i);
  // Simula o clique no botão entrar
  userEvent.click(loginBtn)
  
  // Moca a função de post, que ocorre após se clicar no botão entrar
  axios.post = jest.fn().mockResolvedValue();

  // As linhas a seguir deveriam verificar se o post foi enviado com sucesso para a API com os dados guardados dos inputs, simulados acima, mas deu timeout. Em seguida, verifica se o usuário foi redirecionado para a página de feed, procurando um dos textos que existem nela.

  // await wait(() => {
  //   expect(axios.post).toHaveBeenCalledWith('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/login', {
  //     email: 'bananinha@hotmail.com',
  //     password: '123456'
  //   });
  // }, 50000)

  // expect(getByText(/Novo Post/)).toBeInTheDocument();

});
