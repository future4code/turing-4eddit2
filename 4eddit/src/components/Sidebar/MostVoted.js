import React from "react";

import { SidebarContainer, PostContainer, Post, PostsTitle } from './styles'

const Sidebar = (props) => {
    let mostVoted;

    if( props.list ) {
        mostVoted = props.list.sort((a, b) => {
            return b.votesCount - a.votesCount ;
        });
    } else {
        return <p>Carregando...</p>
    }

    return (
            <PostContainer>
                <PostsTitle>Mais votados</PostsTitle>
                {mostVoted && mostVoted.map( (post, i) => {
                    if( i <= 11 ) {
                        return <Post key={post.id} onClick={() => props.goToPost(post.id)}>
                            <h4 data-testid="sidebar-votes">{post.title}</h4>
                            <h5>{post.username}</h5>
                            <p>{post.votesCount} votos</p>
                        </Post>
                    }
                })}
            </PostContainer>
  );
}

export default Sidebar