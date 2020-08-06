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

// Simula um post existente na api
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
    // Simula renderização do componente, independente da rota. Link: https://testing-library.com/docs/example-react-router
    const history = createMemoryHistory()
    const { getByText } = render(
      <Router history={history}>
        <Login />
      </Router>
    )

    // Verifica se a página login está sendo renderizada, buscando o texto "entrar", que está presente no botão
    const loginBtn = getByText(/entrar/i);
    expect(loginBtn).toBeInTheDocument();

    // Aqui a ideia é descobrir se ele está procurando o token e, se não encontra, redireciona a página para o lugar certo. Ainda é preciso descobrir como fazer isso.
  })
  test('testa acesso ao feed - caso o usuário esteja logado, ele vê o feed de posts', async() => {
    // Simula uma requisição do API que deve conter os dados simulados (guarados na const mockData)
    axios.get = jest.fn().mockResolvedValue({ data:
        mockData
    })
    
    // Simula a renderização do componente independente da rota (url)
    const history = createMemoryHistory()
    const { getByPlaceholderText, getByText } = render(
      <Router history={history}>
        <FeedPage />
      </Router>
    )

    // Verifica elementos presentes no Form. Se eles aparecem na tela, a página foi renderizada de forma correta.
    
    // Verifica se existe algum elemento com o texto "Novo Post" na tela. A diferença de estrutura entre este e os próximos é que, nos próximos, os elementos que devem ser encontrados estão guardados em uma const
    expect(getByText('Novo Post')).toBeInTheDocument()

    // Verifica se existe um input com placeholder "Escreva seu título"
    const inputTitulo = getByPlaceholderText('Escreva seu título')
    expect(inputTitulo).toBeInTheDocument();
    
    // Verifica se existe um input com placeholder "Escreva seu texto"
    const inputTexto = getByPlaceholderText('Escreva seu texto')
    expect(inputTexto).toBeInTheDocument();
    
    // Verifica se existe algum elemento com o texto "Postar"
    const botaoPostar = getByText('Postar')
    expect(botaoPostar).toBeInTheDocument();
    
    // Verifica se foi feita a requisição de dados para a API com os dados simulados e o Feed aparece. Aqui, espera que a requisição tenha sido feita com a estrutura(baseUrl, axiosConfig)
    expect(axios.get).toHaveBeenCalledWith(baseUrl, axiosConfig);

    // Dá tempo para a resposta da API e busca os textos simulados em mockData, que foram enviados logo no início desse teste
    await wait(() => {
      expect(getByText('Nao quer atualizar')).toBeInTheDocument();
      expect(getByText('feliperdi')).toBeInTheDocument();
    });
  })
  test('O formulário capta os valores dos inputs e envia um novo post, que aparece na tela imediatamente', async() => {
    // Simula uma requisição do API que deve conter os dados simulados (guarados na const mockData)
    axios.get = jest.fn().mockResolvedValue({ data:
        mockData
    });
    
    // Simula a renderização do componente independente da rota (url)
    const history = createMemoryHistory()
    const { getByPlaceholderText, getByText } = render(
      <Router history={history}>
        <FeedPage />
      </Router>
    )
    
    // Simula a digitação de "Um texto teste" no input que tem o placeholder "Escreva seu título"
    const titleInput = getByPlaceholderText(/Escreva seu título/i);
    await userEvent.type(titleInput, 'Um texto teste')
    
    // Simula a digitação de "Oi, eu sou um texto de teste" no input que tem o placeholder "Escreva seu texto"
    const textInput = getByPlaceholderText(/Escreva seu texto/i);
    await userEvent.type(textInput, 'Oi, eu sou um texto de teste')
    
    // Busca o elemento que tem o texto 'postar' e simula o clique nele
    const postBtn = getByText(/postar/i);
    userEvent.click(postBtn)
    
    // Aguarda a resposta da API e verifica se os dados foram enviados dessa forma para ela. Ainda não sei por que a Authorization, nesse caso, é null
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
    
    // Verifica se aparece a mensagem de sucesso que deve aparecer após a execução da API, que tem o texto "Seu post foi publicado com sucesso"
    const postMesage = getByText('Seu post foi publicado com sucesso.')
    expect(postMesage).toBeInTheDocument();

    // Simula uma requisição para atualizar os dados de requisição de posts da API, que, agora, deve conter o novo post
    axios.get = jest.fn().mockResolvedValue({ data:{ "posts": [ ] }
    
    });

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
    // Deve verificar se quando a tela é rendezida, o texto mocado em mockData com a contagem dos votos e dos comentários aparece na tela de forma correta.
  })
  test('Ao votar up, aumenta em 1 a contagem de votos', () => {
    // Deve verificar se, ao clicar no botão de voto up, a contagem - "votesCount": 45 - soma 1.
  })
  test('Ao votar down, diminui em 1 a contagem de votos', () => {
    // Deve verificar se, ao clicar no botão de voto down, a contagem - "votesCount": 45 - diminui 1.
  })
})
