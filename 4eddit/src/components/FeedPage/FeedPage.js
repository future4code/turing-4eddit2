import React, { useReducer } from "react";
import axios from 'axios';

import useRequestData from "../../hooks/useRequestData";

import { Post } from "./styles";

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

const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts'

const axiosConfig = {
    headers: {
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlBsSFBLZkV1ZmJnc2duRzVnU1lNIiwidXNlcm5hbWUiOiJhbm5hIiwiZW1haWwiOiJhbm5hLmNiZkBnbWFpbC5jb20iLCJpYXQiOjE1OTY0NzQ0OTl9.43TaZ25rWa5I2eHYeJiAGlYf8lWR_6jga-BLIFCk4ug"
    }
};

export default function FeedPage() {
    const { postsList, fetchData } = useRequestData();
    
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
                fetchData();
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
    <div className="App">
        <form onSubmit={handleSubmit}>
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
            >
                Escreva seu post
            </textarea>
            <button 
                type="Submit"
                disabled={state.status === 'PENDING'}
            >
                {state.status !== 'PENDING' ? 'Postar' : 'Postando'}
            </button>
        </form>
        {responseMessage()}
        {postsList.length === 0 ? 'Carregando...' : postsList.map( (post, i) => {
            if ( i < 5 ) {
                return (
                    <Post key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.text}</p>
                        <div>
                            <div>
                                <button>Up</button>
                                <span> {post.votesCount} </span>
                                <button>Down</button>
                            </div>
                            <div>
                                <p>{post.commentsCount} comentários</p>
                            </div>
                        </div>
                    </Post>
                )
            }
        })}
    </div>
  );
}
