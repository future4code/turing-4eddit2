import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import useProtectedRoute from "../../hooks/useProtectedRoute";
import Header from "../Header/Header";
import Share from '../Share/Share'
import { FeedContainer, AddPostForm, MainContent, Post, VoteBtnContainer, PostText, VoteBtn, ArrowUp, ArrowDown } from "./styles";
import AddPost from "../AddPost/AddPost";
import FeedFilters from "../FeedFilters/FeedFilters";
import Sidebar from "../Sidebar/Sidebar";

const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts'

const FeedPage = () => {
    const history = useHistory();
    const [  postsList, setPostsList ]  = useState();
    const token = useProtectedRoute();

    
    const axiosConfig = {
        headers: {
            Authorization: token
        }
    };
    
    const getPostsLists = async () => {
        const response = await axios.get(baseUrl, axiosConfig);
        setPostsList(response.data.posts);
    }
    
    useEffect( () => {
        getPostsLists();
    }, [])

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

    const [ orderList, setOrderList ] = useState('newest')
    
    let filteredPosts = postsList;
    
    if (postsList && orderList === 'newest') {
        filteredPosts = filteredPosts.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        })
    }
    
    if (postsList && orderList === 'oldest') {
        filteredPosts = filteredPosts.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
        })
    }

    const newestFirst = () => {
        setOrderList('newest')
    }

    const oldestFirst = () => {
        setOrderList('oldest')
    }

    const formatDate = date => {
        const newDate = new Date(date);
        const hours = newDate.getHours();
        const minutes = newDate.getMinutes();
        return newDate.toLocaleDateString('en-GB') + '-' + hours + 'h' + minutes
    }
    
    return (
    <FeedContainer>
        <Header list={postsList}/>
        <MainContent>
        <h1>Novo Post</h1>
            <AddPost getPostsLists={getPostsLists} />
            <h1>Feed</h1>
            <FeedFilters newestFirst={newestFirst} oldestFirst={oldestFirst} orderList={orderList} />
            {!postsList ? 'Carregando...' : filteredPosts.map( post => {
                return (
                    <Post key={post.id} data-testid='post'>
                        <VoteBtnContainer>
                        <VoteBtn onClick={() => handleVote(post.id, post.userVoteDirection, "UP")} data-testid='btn-up'><ArrowUp voteDirection={post.userVoteDirection} /></VoteBtn>
                            <span data-testid="feed-votes">{post.votesCount}</span>
                            <VoteBtn onClick={() => handleVote(post.id, post.userVoteDirection, "DOWN")} data-testid='btn-down'><ArrowDown voteDirection={post.userVoteDirection}/></VoteBtn>
                        </VoteBtnContainer>
                        <PostText>
                            <h5>{formatDate(post.createdAt)}</h5>
                            <h4>{post.username}</h4>
                            <h3  onClick={() => goToPost(post.id)}>{post.title}</h3>
                            <p  onClick={() => goToPost(post.id)}>{post.text}</p>
                            <p  onClick={() => goToPost(post.id)}  data-testid="feed-comments">{post.commentsCount} comentários</p>
                            <Share />
                        </PostText>
                    </Post>
                )
            })}
        </MainContent>
        <Sidebar list={postsList} goToPost={goToPost} />
    </FeedContainer>
  );
}

export default FeedPage