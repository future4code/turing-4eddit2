import {createGlobalStyle} from 'styled-components'


const GlobalStyle = createGlobalStyle`

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}
  .share-button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .share-button button{
    margin: 0 4px;
    width: 40px;
    height: 40px;

    :first-of-type {
      margin-left: 0;
    }
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

      @media (max-width: 500px) {
        width: 100%;
      }
    }
    textarea {
      width: 400px;
      height: 160px;
      padding: 8px;
      border: 1px solid #00497F;
      border-radius: 4px;
      margin: 4px;

      @media (max-width: 500px) {
        width: 100%;
      }
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
      cursor: pointer;
      :hover {
        background: #00497F;
        color: #FFF;
      }

      @media (max-width: 500px) {
        width: 100%;
      }
    }
    .aws-btn {
      --button-default-height: 48px;
      --button-default-font-size: 14px;
      --button-default-border-radius: 6px;
      --button-horizontal-padding: 20px;
      --button-raise-level: 5px;
      --button-hover-pressure: 2;
      --transform-speed: 0.185s;
      --button-primary-color: #475472;
      --button-primary-color-dark: #2a3143;
      --button-primary-color-light: #d4d9e4;
      --button-primary-color-hover: #424e6a;
      --button-primary-border: none;
      --button-secondary-color: #fffc6c;
      --button-secondary-color-dark: #b9b500;
      --button-secondary-color-light: #6c6a00;
      --button-secondary-color-hover: #fffb3e;
      --button-secondary-border: none;
      --button-anchor-color: #f3c8ad;
      --button-anchor-color-dark: #734922;
      --button-anchor-color-light: #4c3016;
      --button-anchor-color-hover: #f1bfa0;
      --button-anchor-border: 1px solid #8c633c;

    outline: none
}
    }

`

export default GlobalStyle