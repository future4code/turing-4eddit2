import React, {useReducer } from 'react'
import {useHistory} from 'react-router-dom'
import api from '../Config/Config'

const initialState = {
  id: '',
  email: '',
  password: '',
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

const Login = () => {
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

const handleSubmit = (e) => {
  e.preventDefault()
  const body = {
    id: state.id,
    token: state.token,
    email: state.email,
    password: state.password,
    username: state.username
  }
    updateStatus('PENDING')
    setTimeout(async() => {
      try {
        const response = await api.post('/login', body)
        updateStatus('SUCCESS')
        window.localStorage.setItem('token', response.data.token)
        history.push('/') 
        console.log(response.data.user)
      }
      catch(error){
        console.log(error.message)
        alert('Você ainda não está cadastrado')
        updateStatus('ERROR')
        history.push('/cadastro')
      }
    }, 2000)
  }

  const irParaCadastro = () => {
    history.push('/cadastro')
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
    <div className="LoginFormDiv">
      <form onSubmit={handleSubmit} className="formLogin">
        <h1>Bem vindo ao 4eddit</h1>
        <input 
          name='email' 
          type= 'text'
          required
          value={state.email}
          onChange={e => updateFieldValue(e.target.name, e.target.value)}
            placeholder='Digite seu email aqui' />
        <input
          name='password' 
          type= 'password'
          required
          value={state.password}
          onChange={e => updateFieldValue(e.target.name, e.target.value)}
          placeholder='Digite sua senha aqui' />
          <button>Entrar</button>
          <button onClick={irParaCadastro}>Cadastrar</button>
      </form>
      {responseStatus()}
     </div>
  )
}


export default Login