import React from "react";
import { render, fireEvent, wait, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"
import App from "../../App";
import axios from "axios";
import userEvent from "@testing-library/user-event";

axios.get = jest.fn().mockResolvedValue({
  data: []
});

axios.post = jest.fn().mockResolvedValue();

axios.put = jest.fn().mockResolvedValue();

axios.delete = jest.fn().mockResolvedValue();

describe('Informações do post detalhado e interação com botões', () => {
  test('As informações do post aparecem na tela', () => {
    
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