import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`

*{
  outline: none;
}

  .formLogin, .formCadastro {
    border: 1px solid #00497F;
    box-shadow: 10px -6px 21px 2px rgba(0,73,127,0.54);
    border-radius: 4px;
    width: 500px;
    height: 400px;
    margin: 200px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #FFF;
    h1 {
      color: #00497F;
    }

    input {
      width: 400px;
      height: 45px;
      border: 1px solid #00497F;
      border-radius: 4px;
      margin: 4px;
    }
    button {
      width: 408px;
      height: 45px;
      border: 1px solid #00497F;
      border-radius: 4px;
      margin: 4px;
      font-size: 16px;
      background: #FFF;
      color: #00497F;
      font-weight: 700;
      :hover {
        background: #00497F;
        color: #FFF;
      }
    }
  }
  .formLogin {

  }
`

export default GlobalStyle