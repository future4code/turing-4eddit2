import React from "react";

import { PostContainer, Post, PostsTitle } from './styles'

const MostCommented = (props) => {
    let mostCommented;

    if( props.list ) {
        mostCommented = props.list.sort((a, b) => {
            return b.commentsCount - a.commentsCount;
        })
    } else {
        return <p>Carregando...</p>
    }

    return (
            <PostContainer>
                <PostsTitle>Mais comentados</PostsTitle>
                {mostCommented && mostCommented.map( (post, i) => {
                    if( i <= 11 ) {
                        return <Post key={post.id} onClick={() => props.goToPost(post.id)}>
                            <h4 data-testid="sidebar-comments">{post.title}</h4>
                            <h5>{post.username}</h5>
                            <p>{post.commentsCount} comentários</p>
                        </Post>
                    }
                })}
            </PostContainer>
  );
}

export default MostCommented