import React, { useReducer } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import useRequestData from "../../hooks/useRequestData";
import useProtectedRoute from "../../hooks/useProtectedRoute";

import { FeedContainer, AddPostForm, Post, VoteBtnContainer, PostText, VoteBtn, ArrowUp, ArrowDown } from "./styles";

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

export default function FeedPage() {
    const history = useHistory();
    const { postsList, fetchData } = useRequestData();
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

    const goToPost = id => {
      history.push("/post/" + id);
    }

    return (
    <FeedContainer>
        <h3>Novo Post</h3>
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
        <h3>Feed</h3>
        {responseMessage()}
        {postsList.length === 0 ? 'Carregando...' : postsList.map( (post, i) => {
            return (
                <Post key={post.id}>
                    <VoteBtnContainer>
                        <VoteBtn><ArrowUp /></VoteBtn>
                        <span> {post.votesCount} </span>
                        <VoteBtn><ArrowDown /></VoteBtn>
                    </VoteBtnContainer>
                    <PostText onClick={() => goToPost(post.id)}>
                        <h3>{post.title}</h3>
                        <p>{post.text}</p>
                        <p>{post.commentsCount} comentários</p>
                    </PostText>
                </Post>
            )
        })}
    </FeedContainer>
  );
}
