import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { createMemoryHistory  } from 'history';
import "@testing-library/jest-dom/extend-expect";
import App from "../../App";
import PostPage from "./PostPage";
import axios from "axios";
import { Router, Route, MemoryRouter, useParams } from 'react-router-dom'
import userEvent from "@testing-library/user-event";


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlBsSFBLZkV1ZmJnc2duRzVnU1lNIiwidXNlcm5hbWUiOiJhbm5hIiwiZW1haWwiOiJhbm5hLmNiZkBnbWFpbC5jb20iLCJpYXQiOjE1OTY0NzQ0OTl9.43TaZ25rWa5I2eHYeJiAGlYf8lWR_6jga-BLIFCk4ug"


const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/2ju70ptY3CHbreXM34iA'

const axiosConfig = {
  headers: {
      Authorization: null
  }
};


const mockData = {
  "post": {
      "comments": [
          {
              "userVoteDirection": 0,
              "id": "6lNRxZOA28LMhb3HsH7Q",
              "votesCount": 2,
              "username": "jay",
              "text": "F5 \n:)",
              "createdAt": 1596649314303
          }
      ],
      "userVoteDirection": 0,
      "id": "2ju70ptY3CHbreXM34iA",
      "title": "pelo amor de deus atualiza",
      "votesCount": 45,
      "text": "Nao quer atualizar",
      "commentsCount": 6,
      "username": "feliperdi",
      "createdAt": 1596649061367
  }
}

axios.get = jest.fn().mockResolvedValue({data:{}})
axios.post = jest.fn().mockResolvedValue();
axios.put = jest.fn().mockResolvedValue();

describe('Informações do post detalhado e interação com botões', () => {
  test('As informações do post aparecem na tela', async() => {

    useParams.mockReturnValue({ id: "2ju70ptY3CHbreXM34iA" });

    axios.get = jest.fn().mockResolvedValue({
      data: mockData
    }, axiosConfig);

    const history = createMemoryHistory()
    const { getByText, queryByText, findByText, debug, findByTestId, getByTestId } = render(
      <Router history={history}>
        <PostPage />
      </Router>
    )
    // const { getByText, queryByText, findByText, debug, findByTestId, getByTestId } = render(
    //   <MemoryRouter initialEntries={['/post/:id/']}> <PostPage /></MemoryRouter>)
    
    const loginBtn = queryByText(/entrar/i);
    expect(loginBtn).not.toBeInTheDocument;
    
    await wait(() => {
      expect(axios.get).toHaveBeenCalled()
      expect(axios.get).toHaveBeenCalledWith(baseUrl, axiosConfig)
    });

    const post = getByTestId('post');
    expect(post).toBeInTheDocument();

    await wait(() => {
      const tituloPost = getByText('Nao quer atualizar');
      expect(tituloPost).toBeInTheDocument();
    })

    const comentarios = getByTestId('comentarios');
    expect(comentarios).toBeInTheDocument();
  })
  test('Ao votar up, aumenta em 1 a contagem de votos', () => {

  })
  test('Ao votar down, diminui em 1 a contagem de votos', () => {

  })
})

describe('O formulário cria um novo comentário e os comentários publicados aparecem na página', () => {
  test('O formulário e os comentários aparecem na tela', () => {
    
  })
  test('O formulário capta os valores dos inputs e envia um novo comentário, que aparece na tela imediatamente', () => {

  })
})