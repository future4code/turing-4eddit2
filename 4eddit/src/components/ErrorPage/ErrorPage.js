import React, {useReducer } from 'react'
import {useHistory} from 'react-router-dom'
import api from '../Config/Config'

import Header from "../Header/Header";

const ErrorPage = () => {

  return (
    <div>
      <Header />
        <div>
            <h1>Oops... Algo que não está certo está errado :(</h1>
        </div>
    </div>
  )
}

export default ErrorPage