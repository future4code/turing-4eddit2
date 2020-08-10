import React, {useReducer } from 'react'
import {useHistory} from 'react-router-dom'
import api from '../Config/Config'

import Header from "../Header/Header";


const initialState = {
  id: '',
  email: '',
  password: '',
  username: '',
  token: '',
  status: 'UPDATE_VALUE'
}

const formReducer = (state, action) =>{
  switch(action.type) {
    case 'UPDATE_VALUE':
      return {...state, [action.payload.field]: action.payload.value}
    case 'UPDATE_STATUS':
      return {...state, status: action.payload.status}
      default:
        return state
  }
}

const Cadastro = () => {
    const [state, dispatch] = useReducer(formReducer, initialState)
    
    const updateFieldValue = (field, value) => {
      dispatch({
        type: 'UPDATE_VALUE',
        payload: {
          field,
          value
        }
      })
    }
  
    const updateStatus = status => {
      dispatch({
        type: 'UPDATE_STATUS',
        payload: {
          status
        }
      })
    }
    const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()
    updateStatus('PENDING')

    setTimeout(async() => {
      try {
        const body = {
          id: state.id,
          token: state.token,
          email: state.email,
          password: state.password,
          username: state.username
        }
        const response = await api.post('/signup', body)
        updateStatus('SUCCESS')
        console.log(response.data.user)
        history.push('/login') 
      }
      catch(error){
        console.log(error.message)
        updateStatus('ERROR')
      }
    }, 2000)
  }



  const responseStatus = () => {
    if(state.status === 'SUCCESS') {
      return <p>Cadastro realizado com sucesso...</p> 
    } else if(state.status === 'ERROR') {
      return <p>Ops! Algo deu errado...</p>
    }else {
      return null
    }
  }
  


  return (
    <div>
      <Header />
        <form onSubmit={handleSubmit} className="formCadastro">
        <h1>Bem vindo ao 4eddit</h1>
          <input
            name='username' 
            type= 'text'
            required
            value={state.username}
            onChange={e => updateFieldValue(e.target.name, e.target.value)}
            placeholder="Digite um nome de usuário" />
          <input
           name='email' 
           type= 'text'
           required
           value={state.email}
          onChange={e => updateFieldValue(e.target.name, e.target.value)}
          placeholder="Digite seu melhor email" />
          <input
           name='password' 
            type= 'password'
            required
            value={state.password}
            onChange={e => updateFieldValue(e.target.name, e.target.value)}
            placeholder="Digite uma senha" />
          <button type='submit' disabled={state.status === 'PENDING'}>
            {state.status !== 'PENDING' ? 'Enviar' : 'Enviando...'}
            </button>
        </form>
        {responseStatus()}
    </div>
  )
}


export default Cadastro