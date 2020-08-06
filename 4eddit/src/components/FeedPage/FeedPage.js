import React, { useReducer, useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import useProtectedRoute from "../../hooks/useProtectedRoute";
import Header from "../Header/Header";

import { FeedContainer, AddPostForm, Post, VoteBtnContainer, PostText, VoteBtn, ArrowUp, ArrowDown } from "./styles";

const initialState = {
  text: "",
  title: "",
  status: 'UPDATE_FIELD_VALUE',
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

const FeedPage = () => {
    const history = useHistory();
    const [  postsList, setPostsList]  = useState();
    const token = useProtectedRoute();

    const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts'
    
    const axiosConfig = {
        headers: {
            Authorization: token
        }
    };
    
    const getPostsLists = async () => {
        const response = await axios.get(baseUrl, axiosConfig);
        setPostsList(response.data.posts)
    }
    
    useEffect( () => {
        getPostsLists();
    }, [])

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
                getPostsLists();
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

    const handleVote = (postId, userVoteDirection, voteDirection) => {
        let vote;

        if ( userVoteDirection === 1 || userVoteDirection === -1  ) {
            vote = 0;
        } else {
            if ( voteDirection === "UP" ) {
                vote = +1
            } else {
                vote = -1
            }
        }
    
        const body = {
            "direction": vote
        }
            
        axios.put(`${baseUrl}/${postId}/vote`, body, axiosConfig)
          .then(() => {
            getPostsLists();
          }) 
        .catch(err => {
            console.log(err.message)
        }) 
        
    }

    const goToPost = id => {
      history.push("/post/" + id);
    }

    return (
    <FeedContainer>
        <Header 
        />
        <h1>Novo Post</h1>
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
        <h1>Feed</h1>
        {responseMessage()}
        {!postsList ? 'Carregando...' : postsList.map( (post, i) => {
            return (
                <Post key={post.id} data-testid='post'>
                    <VoteBtnContainer>
                    <VoteBtn onClick={() => handleVote(post.id, post.userVoteDirection, "UP")}><ArrowUp voteDirection={post.userVoteDirection} /></VoteBtn>
                        <span>{post.votesCount}</span>
                        <VoteBtn onClick={() => handleVote(post.id, post.userVoteDirection, "DOWN")}><ArrowDown voteDirection={post.userVoteDirection}/></VoteBtn>
                    </VoteBtnContainer>
                    <PostText onClick={() => goToPost(post.id)}>
                        <h4>{post.username}</h4>
                        <h2>{post.title}</h2>
                        <p>{post.text}</p>
                        <p>{post.commentsCount} comentários</p>
                    </PostText>
                </Post>
            )
        })}
    </FeedContainer>
  );
}

export default FeedPage