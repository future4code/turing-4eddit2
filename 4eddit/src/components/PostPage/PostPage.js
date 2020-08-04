import React, { useReducer, useEffect, useState } from "react";
import axios from 'axios';

import { Post, VoteUP, VoteDown, CommentContainer } from './styles';

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

const postId= 'WCmBIGyynC5ihJFUmHFf';
  
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
    <div className="PostPageContainer">
        <Post>
            <h4>{post.username}</h4>
            <h3>{post.title}</h3>
            <p>{post.text}</p>
            <div>
                <div>
                    <button>Up</button>
                    <span>{post.votesCount}</span>
                    <button>Down</button>
                </div>
                <div>
                    <p>{post.commentsCount} comentários</p>
                </div>
            </div>
        </Post>
        <div className="Comments">
            <form className="AddComment" onSubmit={handleSubmit}>
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
            </form>
            {responseMessage()}
            {comments.length === 0 ? 'Carregando...' : comments.map( comment => {
                return (
                    <CommentContainer key={comment.id}>
                        <h5>{comment.username}</h5>
                        <p>{comment.text}</p>
                        <div>
                            <VoteUP voteDirection={comment.userVoteDirection} onClick={() => handleVote(comment.id, comment.userVoteDirection, "UP")}>Up</VoteUP>
                            <span>{comment.votesCount}</span>
                            <VoteDown voteDirection={comment.userVoteDirection} onClick={() => handleVote(comment.id, comment.userVoteDirection, "DOWN")}>Down</VoteDown>
                        </div>
                    </CommentContainer>
                )

            })}

        </div>
    </div>
  );
}
