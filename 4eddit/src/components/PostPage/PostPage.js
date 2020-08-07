import React, { useReducer, useEffect, useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import useProtectedRoute from "../../hooks/useProtectedRoute";
import Share from '../Share/Share'
import { PostContainer, Post, VoteBtnContainer, PostText, VoteBtn, ArrowUp, ArrowDown, CommentContainer, AddCommentForm } from './styles';

import Header from "../Header/Header";

const initialState = {
    text: "",
    status: 'UPDATE_FIELD_VALUE',
  };
  
const commentReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FIELD_VALUE':
            return {...state, [action.payload.field]: action.payload.value}
        case 'UPDATE_STATUS':
            return {...state, status: action.payload.status}
        default:
              return state
    }
};
  
const PostPage = () => {
    const history = useHistory();
    const pathParams = useParams();
    const postId = pathParams.id;
    const token = useProtectedRoute();

    const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts'

    const axiosConfig = {
        headers: {
            Authorization: token
        }
    };
    
    const [ comments, setComments ] = useState([]);
    const [ post, setpost ] = useState([]);
    
    const getPostDetails = async() => {
        const postId = pathParams.id;
        
        try {
            const response = await axios.get(`${baseUrl}/${postId}`, axiosConfig);
            setpost(response.data.post)
            setComments(response.data.post.comments)
        }
        catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getPostDetails();
    }, []);

    const [state, dispatch] = useReducer(commentReducer, initialState);

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
            "text": state.text
        }

        setTimeout(async() => {
            try {
                await axios.post(`${baseUrl}/${postId}/comment`, body, axiosConfig);
                updateStatus('SUCCESS');
                getPostDetails();
            }
            catch(err) {
                console.log(err)
                updateStatus('ERROR');
            }
        }, 2000)
    };
  
    const responseMessage = () => {
        if ( state.status === 'SUCCESS' ) {
            return <p>Seu comentário foi publicado com sucesso.</p>
        } else if ( state.status === 'ERROR' ) {
            return <p>Oops! Algo deu errado...</p>
        } else {
            return null;
        }
    }

    const handleVotePost = (postId, userVoteDirection, voteDirection) => {
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
            getPostDetails();
          }) 
        .catch(err => {
            console.log(err.message)
        }) 
        
    }
    
    const handleVote = (commentId, userVoteDirection, voteDirection) => {
        let vote;
        const comment = commentId;
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
            
          axios.put(`${baseUrl}/${postId}/comment/${comment}/vote`, body, axiosConfig)
          .then(() => {
            getPostDetails();
          }) 
        .catch(err => {
            console.log(err.message)
        }) 
    }

    const goToHome = () => {
      history.push("/");
    }

    return (
    <PostContainer data-testid="post">
        <Header />
        {post.id === "" ? 'Carregando...' : <Post key={post.id}>
            <VoteBtnContainer>
                <VoteBtn onClick={() => handleVotePost(post.id, post.userVoteDirection, "UP")}><ArrowUp voteDirection={post.userVoteDirection} /></VoteBtn>
                <span>{post.votesCount}</span>
                <VoteBtn onClick={() => handleVotePost(post.id, post.userVoteDirection, "DOWN")}><ArrowDown voteDirection={post.userVoteDirection}/></VoteBtn>
                </VoteBtnContainer>
            <PostText>
                <h4>{post.username}</h4>
                <h1>{post.title}</h1>
                <p>{post.text}</p>
                <p>{post.commentsCount} comentários</p>
            </PostText>
        </Post>}
        <div className="Comments" data-testid='comentarios'>
            <h2>Comentários</h2>
            <AddCommentForm className="AddComment" onSubmit={handleSubmit}>
            <textarea
                name="text"
                onChange={e => updateFieldValue(e.target.name, e.target.value)}
                value={state.text}
            >
                Escreva seu comentário
            </textarea>
            <button 
                type="Submit"
                disabled={state.status === 'PENDING'}
            >
                {state.status !== 'PENDING' ? 'Comentar' : 'Comentando'}
            </button>
            </AddCommentForm>
            {responseMessage()}
            {comments.length === 0 ? 'Seja o primeiro a comentar' : comments.map( comment => {
                return (
                    <CommentContainer key={comment.id}>
                        <VoteBtnContainer>
                            <VoteBtn onClick={() => handleVote(comment.id, comment.userVoteDirection, "UP")}><ArrowUp voteDirection={comment.userVoteDirection} /></VoteBtn>
                            <span>{comment.votesCount}</span>
                            <VoteBtn onClick={() => handleVote(comment.id, comment.userVoteDirection, "DOWN")}><ArrowDown voteDirection={comment.userVoteDirection}/></VoteBtn>
                        </VoteBtnContainer>
                        <PostText>
                            <h5>{comment.username}</h5>
                            <p>{comment.text}</p>
                        </PostText>
                       <Share 
                       key = {comment.id}
                        comment = {comment.text}
                        username = {comment.username}
                       />
                    </CommentContainer>
                )

            })}

        </div>
        <button onClick={goToHome}>voltar</button>
    </PostContainer>
  );
}

export default PostPage;