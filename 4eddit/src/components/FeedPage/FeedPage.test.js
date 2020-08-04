import React from "react";
import { render, fireEvent, wait, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"
import App from "./App";
import axios from "axios";
import userEvent from "@testing-library/user-event";

axios.get = jest.fn().mockResolvedValue({
  data: []
});

axios.post = jest.fn().mockResolvedValue();

axios.put = jest.fn().mockResolvedValue();

axios.delete = jest.fn().mockResolvedValue();

describe('O formulário cria um novo post e os posts publicados aparecem na página', () => {
  test('O formulário e os posts aparecem na tela', () => {
    
  })
  test('O formulário capta os valores dos inputs e envia um novo post, que aparece na tela imediatamente', () => {

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
