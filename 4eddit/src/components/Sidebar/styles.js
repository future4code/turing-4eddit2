import styled from 'styled-components';

export const SidebarContainer = styled.div `
    width: 100%;
    padding: 0 24px;
`

export const PostContainer = styled.div `
    background-color: #fff;
    border-radius: 4px;
    border-top: 1px solid #00497F;
    margin-bottom: 16px;
`

export const Post = styled.div `
    background-color: #fff; 
    width: 100%;
    padding: 16px;
    border-top: 1px solid #00497F;
    border-radius: 0 0 4px 4px;
    cursor: pointer;

    &:hover {
        opacity: 0.6;
    }
`

export const PostsTitle = styled.h3 `
    width: 100%;
    padding: 16px;
    background-color: #00497F;
    color: #fff;
    border-radius: 4px 4px 0 0;
`