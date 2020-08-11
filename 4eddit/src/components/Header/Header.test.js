import React from "react";
import { render, wait } from "@testing-library/react";
import { createMemoryHistory  } from 'history';
import "@testing-library/jest-dom/extend-expect";
import Header from "./Header";
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

describe('Os elementos aparecem na tela e é possível efetuar a busca e deslogar', () => {
  test('testa se os elementos estão na tela e se, ao clicar logout, muda de tela', async() => {
    const history = createMemoryHistory()
    const { getByText } = render(
      <Router history={history}>
        <Header />
      </Router>
    )

    const searchBtn = getByText(/buscar/i);
    expect(searchBtn).toBeInTheDocument();

    const logout = getByText('logout');
    userEvent.click(logout);

    await wait(() => {
        expect(logout).not.toBeInTheDocument();
    })
  })

  test('testa se aaprecem resultados na busca', async() => {
    jest.setTimeout(30000);

    axios.get = jest.fn().mockResolvedValue({ data:
        mockData
    })
    
    const history = createMemoryHistory()
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <Header />
      </Router>
    )

    const searchInput = getByTestId('search-input');
    await userEvent.type(searchInput, 'Nao quer atualizar')

    expect(searchInput).toHaveValue('Nao quer atualizar');

  });
})
