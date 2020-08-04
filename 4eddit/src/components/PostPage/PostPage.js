import React, { useReducer, useEffect, useState } from "react";
import axios from 'axios';

import { PostContainer, Post, VoteBtnContainer, PostText, VoteBtn, ArrowUp, ArrowDown, CommentContainer, AddCommentForm } from './styles';

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

const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts'

const axiosConfig = {
    headers: {
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlBsSFBLZkV1ZmJnc2duRzVnU1lNIiwidXNlcm5hbWUiOiJhbm5hIiwiZW1haWwiOiJhbm5hLmNiZkBnbWFpbC5jb20iLCJpYXQiOjE1OTY0NzQ0OTl9.43TaZ25rWa5I2eHYeJiAGlYf8lWR_6jga-BLIFCk4ug"
    }
};

const postId= '1PHgGnDKHOwE2pap2GKE';
  
export default function PostPage() {

    const [ comments, setComments ] = useState([]);
    const [ post, setpost ] = useState([]);
    
    const getPostDetails = async() => {
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

    const handleVote = async(commentId, userVoteDirection, voteDirection) => {
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
            
        try {
            await axios.put(`${baseUrl}/${postId}/comment/${comment}/vote`, body, axiosConfig);
            getPostDetails();
        }
        catch(err) {
            console.log(err)
        }
    }

    return (
    <PostContainer>
        {post.id === "" ? 'Carregando...' : <Post key={post.id}>
            <VoteBtnContainer>
                <VoteBtn><ArrowUp /></VoteBtn>
                <span> {post.votesCount} </span>
                <VoteBtn><ArrowDown /></VoteBtn>
            </VoteBtnContainer>
            <PostText>
                <h4>{post.username}</h4>
                <h3>{post.title}</h3>
                <p>{post.text}</p>
                <p>{post.commentsCount} comentários</p>
            </PostText>
        </Post>}
        <div className="Comments">
            <h4>Comentários</h4>
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
                console.log(comment.username)
                return (
                    <CommentContainer key={comment.id}>
                        <VoteBtnContainer>
                            <VoteBtn onClick={() => handleVote(comment.id, comment.userVoteDirection, "UP")}><ArrowUp voteDirection={comment.userVoteDirection} /></VoteBtn>
                            <span>{comment.votesCount}</span>
                            <VoteBtn onClick={() => handleVote(comment.id, comment.userVoteDirection, "DOWN")}><ArrowDown voteDirection={comment.userVoteDirection}/></VoteBtn>
                        </VoteBtnContainer>
                        <PostText>
                            <h5>{comment.username}</h5>
                            <p>{comment.text.text}</p>
                        </PostText>
                    </CommentContainer>
                )

            })}

        </div>
    </PostContainer>
  );
}
