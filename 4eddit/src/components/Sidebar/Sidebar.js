import React from "react";

import { SidebarContainer, PostContainer, Post, PostsTitle } from './styles'

const Sidebar = (props) => {
    let mostVoted;
    let mostCommented;

    if( props.list ) {
        mostVoted = props.list.sort((a, b) => {
            return b.votesCount - a.votesCount ;
        });
        mostCommented = props.list.map((a, b) => {
            return b.commentsCount - a.commentsCount;
        })
    } else {
        return <p>Carregando...</p>
    }

    return (
        <SidebarContainer>
            <PostContainer>
                <PostsTitle>Mais votados</PostsTitle>
                {mostVoted && mostVoted.map( (post, i) => {
                    if( i <= 11 ) {
                        return <Post key={post.id} onClick={() => props.goToPost(post.id)}>
                            <h4>{post.title}</h4>
                            <h5>{post.username}</h5>
                            <p>{post.votesCount} votos</p>
                        </Post>
                    }
                })}
            </PostContainer>
            <PostContainer>
                <PostsTitle>Mais comentados</PostsTitle>
                {mostCommented && mostCommented.map( (post, i) => {
                    if( i <= 11 ) {
                        return <Post key={post.id} onClick={() => props.goToPost(post.id)}>
                            <h4>{post.title}</h4>
                            <h5>{post.username}</h5>
                            <p>{post.commentsCount} comentários</p>
                        </Post>
                    }
                })}
            </PostContainer>

        </SidebarContainer>
  );
}

export default Sidebar