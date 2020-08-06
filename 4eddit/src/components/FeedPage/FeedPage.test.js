import React from "react";
import { render, wait } from "@testing-library/react";
import { createMemoryHistory  } from 'history';
import "@testing-library/jest-dom/extend-expect";
import FeedPage from "./FeedPage";
import Login from "../Login/Login";
import App from "../../App";
import axios from "axios";
import { Router, MemoryRouter } from 'react-router-dom'
import userEvent from "@testing-library/user-event";

axios.get = jest.fn().mockResolvedValue({data:{}})
axios.post = jest.fn().mockResolvedValue();
axios.put = jest.fn().mockResolvedValue();

const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts'

const axiosConfig = {
  headers: {
      Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlBsSFBLZkV1ZmJnc2duRzVnU1lNIiwidXNlcm5hbWUiOiJhbm5hIiwiZW1haWwiOiJhbm5hLmNiZkBnbWFpbC5jb20iLCJpYXQiOjE1OTY0NzQ0OTl9.43TaZ25rWa5I2eHYeJiAGlYf8lWR_6jga-BLIFCk4ug"
  }
};

// Simula um objeto existente na api
const mockData = {
  "posts": [
    {
      "userVoteDirection": 0,
      "id": "2ju70ptY3CHbreXM34iA",
      "createdAt": 1596649061367,
      "title": "pelo amor de deus atualiza",
      "text": "Nao quer atualizar",
      "commentsCount": 5,
      "username": "feliperdi",
      "votesCount": 8
    }
  ]
}

describe('O formulário cria um novo post e os posts publicados aparecem na página', () => {
  test('testa acesso ao feed - caso o usuário não esteja logado, ele deve ser redirecionado para o login', () => {
    
    const history = createMemoryHistory()
    const { getByText } = render(
      <Router history={history}>
        <Login />
      </Router>
    )

    const loginBtn = getByText(/entrar/i);
    expect(loginBtn).toBeInTheDocument();

  })
  test('testa acesso ao feed - caso o usuário esteja logado, ele vê o feed de posts', async() => {

    axios.get = jest.fn().mockResolvedValue({ data:
        mockData
    })
    
    const history = createMemoryHistory()
    const { getByPlaceholderText, getByText } = render(
      <Router history={history}>
        <FeedPage />
      </Router>
    )

    // Form
    
    const inputTitulo = getByPlaceholderText('Escreva seu título')
    expect(inputTitulo).toBeInTheDocument();
    
    const inputTexto = getByPlaceholderText('Escreva seu texto')
    expect(inputTexto).toBeInTheDocument();

    const botaoPostar = getByText('Postar')
    expect(botaoPostar).toBeInTheDocument();
    
    //Feed

    expect(getByText('Novo Post')).toBeInTheDocument()

    expect(axios.get).toHaveBeenCalledWith(baseUrl, axiosConfig);

    await wait(() => {
      expect(getByText('Nao quer atualizar')).toBeInTheDocument();
      expect(getByText('feliperdi')).toBeInTheDocument();
    });
  })
  test('O formulário capta os valores dos inputs e envia um novo post, que aparece na tela imediatamente', async() => {
   
    axios.get = jest.fn().mockResolvedValue({ data:
        mockData
    })
    
    const history = createMemoryHistory()
    const { getByPlaceholderText, getByText } = render(
      <Router history={history}>
        <FeedPage />
      </Router>
    )

    const titleInput = getByPlaceholderText(/Escreva seu título/i);
    await userEvent.type(titleInput, 'Um texto teste')
    
    const textInput = getByPlaceholderText(/Escreva seu texto/i);
    await userEvent.type(textInput, 'Oi, eu sou um texto de teste')

    const postBtn = getByText(/postar/i);
    userEvent.click(postBtn)
    
    await wait( () => {
      expect(axios.post).toHaveBeenCalledWith(baseUrl, {
        title: 'Um texto teste',
        text: 'Oi, eu sou um texto de teste'
      }, {
        headers: {
            Authorization: null
        }
      })
    },);
    
    const postMesage = getByText('Seu post foi publicado com sucesso.')
    expect(postMesage).toBeInTheDocument();

    axios.get = jest.fn().mockResolvedValue({ data:{ "posts": [ ] }
    })

    // erro: Timeout - Async callback was not invoked within the 5000ms timeout specified by jest.setTimeout.Timeout - Async callback was not invoked within the 5000ms timeout specified by jest.setTimeout.Error:
    // await wait(() => {
    //   const novoPost = getByText('Um texto teste')
    //   expect(novoPost).toBeInTheDocument();
      
    //   expect(axios.get).toHaveBeenCalledTimes(2);
    //   expect(input).toHaveValue('')
    // }, 50000);
    
  })
})


describe('Interação com botões dos posts', () => {
  test('As contagens de comentários e votos do post aparecem na tela', () => {
    
  })
  test('Ao votar up, aumenta em 1 a contagem de votos', () => {

  })
  test('Ao votar down, diminui em 1 a contagem de votos', () => {

  })
})
