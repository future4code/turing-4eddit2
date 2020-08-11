import React from "react";
import { render, wait, getByPlaceholderText } from "@testing-library/react";
import { createMemoryHistory  } from 'history';
import "@testing-library/jest-dom/extend-expect";
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

// Simula um post que existe na API
const mockData = {
  "post": {
      "comments": [
          {
              "userVoteDirection": 0,
              "id": "6lNRxZOA28LMhb3HsH7Q",
              "votesCount": 2,
              "username": "jay",
              "text": "F5 :)",
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

// Moca as requisições para a API
axios.get = jest.fn().mockResolvedValue({data:{}})
axios.post = jest.fn().mockResolvedValue();
axios.put = jest.fn().mockResolvedValue();

describe('Informações do post detalhado com os comentários, interação com botões e envio de novo comentário', () => {
  test('As informações do post aparecem na tela', async() => {
    // Moca o useParams que pega a id da url para incluir as informações da página. Encontrei explicação nesse link: https://www.smashingmagazine.com/2020/07/react-apps-testing-library/
    useParams.mockReturnValue({ id: "2ju70ptY3CHbreXM34iA" });

    // Moca os dados que devem ser recebidos
    axios.get = jest.fn().mockResolvedValue({
      data: mockData
    }, axiosConfig);

    // Simula a renderização do componente, com base na rota (pq ela pega o id pelo useParams). Link de explicação: https://testing-library.com/docs/example-react-router
    const history = createMemoryHistory()
    const { getByText, queryByText, findByText, debug, findByTestId, getByTestId } = render(
      <Router history={history}>
        <PostPage />
      </Router>
    )
    
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
    });

    const comentarios = getByTestId('comentarios');
    expect(comentarios).toBeInTheDocument();

    const umComentario = getByText('F5 :)');
    expect(umComentario).toBeInTheDocument();
  });
  test('Ao votar up, aumenta em 1 a contagem de votos', async() => {
        jest.setTimeout(30000);
        axios.get = jest.fn().mockResolvedValue({ data:
            mockData
        })
        
        axios.put = jest.fn().mockResolvedValue();
        
        const history = createMemoryHistory()
        const { getByTestId, getByText } = render(
          <Router history={history}>
            <PostPage />
          </Router>
        )
    
        await wait(() => {
          const voteUp = getByTestId('btn-up');
          userEvent.click(voteUp)
        });
    
        await wait( () => {
          expect(axios.put).toHaveBeenCalledWith(`${baseUrl}/vote`, {
            direction: 1,
          }, {
            headers: {
                Authorization: null
            }
          })
        });
    
        await wait(() => {
          axios.get = jest.fn().mockResolvedValue()
        })
        
  });
  test('Ao votar down, diminui em 1 a contagem de votos', async() => {
        jest.setTimeout(30000);
        axios.get = jest.fn().mockResolvedValue({ data:
            mockData
        })
        
        axios.put = jest.fn().mockResolvedValue();
        
        const history = createMemoryHistory()
        const { getByTestId, getByText } = render(
          <Router history={history}>
            <PostPage />
          </Router>
        )
    
        await wait(() => {
          const voteDown = getByTestId('btn-down');
          userEvent.click(voteDown)
        });
    
        await wait( () => {
          expect(axios.put).toHaveBeenCalledWith(`${baseUrl}/vote`, {
            direction: -1,
          }, {
            headers: {
                Authorization: null
            }
          })
        });
    
        await wait(() => {
          axios.get = jest.fn().mockResolvedValue()
        })
        
  });
  test('O formulário capta os valores dos inputs e envia um novo comentário, que aparece na tela imediatamente', async() => {
    jest.setTimeout(30000);

    const history = createMemoryHistory()
    const { getByText, getByPlaceholderText } = render(
      <Router history={history}>
        <PostPage />
      </Router>
    )
    
    const textInput = getByPlaceholderText(/Escreva seu comentário/i);
    await userEvent.type(textInput, 'Oi, eu sou um comentário de teste')
    
    const commentBtn = getByText('Comentar');
    userEvent.click(commentBtn)
    
    await wait( () => {
      expect(axios.post).toHaveBeenCalledWith(`${baseUrl}/comment`, {
        text: 'Oi, eu sou um comentário de teste'
      }, {
        headers: {
            Authorization: null
        }
      })
    });
    
    const postMesage = getByText('Seu comentário foi publicado com sucesso.')
    expect(postMesage).toBeInTheDocument();

    await wait(() => {
      axios.get = jest.fn().mockResolvedValue({ data:{ 'post':{}} });
    })
    
  });
})