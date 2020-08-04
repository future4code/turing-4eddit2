import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  .formLogin {
    display: flex;
    flex-direction: column;
    input {
      width: 400px;
      height: 45px;
      border: 2px solid #443f3f;
      border-radius: 8px;
      margin: 4px;
    }
    button {
      width: 400px;
      height: 45px;
      border: 2px solid #443f3f;
      border-radius: 8px;
      margin: 4px;
    }
  }
`

export default GlobalStyle