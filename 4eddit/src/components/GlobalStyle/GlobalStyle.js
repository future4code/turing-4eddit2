import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}
  .formLogin, .formCadastro {
    border: 1px solid #00497F;
    box-shadow: 10px -6px 21px 2px rgba(0,73,127,0.54);
    border-radius: 4px;
    width: 500px;
    height: 400px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #FFF;
  }
    h1, h2, h3, h4, h5, h6 {
      color: #00497F;
    }
    
    h2 {
      margin-top: 32px;
      padding: 8px;
    }

    h3, p {
      padding: 8px 0;
    }
    
    h4, h5, h6 {
      padding: 4px 0;
    }
    
    h5, h6 {
      font-weight: 400
    }

    input {
      width: 400px;
      height: 45px;
      padding: 8px;
      border: 1px solid #00497F;
      border-radius: 4px;
      margin: 4px;
    }
    textarea {
      width: 400px;
      height: 160px;
      padding: 8px;
      border: 1px solid #00497F;
      border-radius: 4px;
      margin: 4px;
    }
    button {
      width: 404px;
      height: 45px;
      border: 1px solid #00497F;
      border-radius: 4px;
      margin: 6px;
      font-size: 16px;
      background: #FFF;
      color: #00497F;
      font-weight: 700;
      :hover {
        background: #00497F;
        color: #FFF;
      }
    }
`

export default GlobalStyle