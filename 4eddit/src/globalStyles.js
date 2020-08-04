import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: none;
    list-style: none;
  }

  input, textarea {
      width: 400px;
      margin: 4px 8px;
      padding: 8px;
      border-radius: 4px;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
        @media (max-width: 600px) {
            padding: 16px;
            width: 100%;
        }
  }

  textarea {
      min-height: 96px;
  }

  button {
      margin: 4px 8px;
      padding: 8px;
      border-radius: 4px;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
      background-color: #4e4e4e;
      color: #fff;
      cursor: pointer;
  }
`