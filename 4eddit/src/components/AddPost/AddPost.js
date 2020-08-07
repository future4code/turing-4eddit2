import React, { useReducer } from "react";
import axios from 'axios';
import useProtectedRoute from "../../hooks/useProtectedRoute";

import { AddPostForm } from "./styles";

const initialState = {
  text: "",
  title: "",
  status: 'UPDATE_FIELD_VALUE'
};

const postReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FIELD_VALUE':
            return {...state, [action.payload.field]: action.payload.value}
        case 'UPDATE_STATUS':
            return {...state, status: action.payload.status}
        default:
            return state
    }
};

const AddPost = (props) => {
    const token = useProtectedRoute();

    const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts'
    
    const axiosConfig = {
        headers: {
            Authorization: token
        }
    };
    
    const [state, dispatch] = useReducer(postReducer, initialState);

    const updateFieldValue = (field, value) => {
        dispatch({
            type: 'UPDATE_FIELD_VALUE',
            payload: {
                field,
                value,
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
    
    const handleSubmit = e => {
        e.preventDefault();
        updateStatus('PENDING');

        const body = {
            "text": state.text,
            "title": state.title
        }

        setTimeout(async() => {
            try {
                await axios.post(`${baseUrl}`, body, axiosConfig);

                updateStatus('SUCCESS');
                props.getPostsLists();
            }
            catch(err) {
                console.log(err)
                updateStatus('ERROR');
            }
        }, 2000)
    };

    const responseMessage = () => {
        if ( state.status === 'SUCCESS' ) {
            return <p>Seu post foi publicado com sucesso.</p>
        } else if ( state.status === 'ERROR' ) {
            return <p>Oops! Algo deu errado...</p>
        } else {
            return null;
        }
    }

    return (
        <>
            <AddPostForm onSubmit={handleSubmit}>
                <input 
                    name="title"
                    type="text"
                    value={state.title}
                    onChange={e => updateFieldValue(e.target.name, e.target.value)}
                    placeholder="Escreva seu título"
                />
                <textarea
                    name="text"
                    onChange={e => updateFieldValue(e.target.name, e.target.value)}
                    value={state.text}
                    placeholder="Escreva seu texto"
                >
                    Escreva seu post
                </textarea>
                <button 
                    type="Submit"
                    disabled={state.status === 'PENDING'}
                >
                    {state.status !== 'PENDING' ? 'Postar' : 'Postando'}
                </button>
            </AddPostForm>
            {responseMessage()}
        </>
  );
}

export default AddPost