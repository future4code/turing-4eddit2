import styled from 'styled-components';


export const PostContainer = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Post = styled.div `
    width: 400px;
    margin: 16px;
    border-radius: 8px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
    background-color: #fff;
    background-color: #fff;
    display: grid;
    align-items: stretch;
    grid-template-columns: 10% 90%;

    @media (max-width: 600px) {
        max-width: 100%;
        grid-template-columns: 30% 70%;
    }
`

export const VoteBtnContainer = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #f2f2f2;
    padding: 8px 4px;
    border-radius: 8px 0 0 8px;
`

export const PostText = styled.div `
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const VoteBtn = styled.button `
    border: none;
    box-shadow: none;
    background-color: transparent;
    
    &:hover {
        background-color: #e5e5e5;
    }
`

export const ArrowUp = styled.div `
    width: 0; 
    height: 0; 
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: ${props => {
        if (props.voteDirection === 1) {
            return '8px solid red'
        } else {
            return '8px solid #878a8c'
        }
    }};
`

export const ArrowDown = styled.div `
    width: 0; 
    height: 0; 
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: ${props => {
        if (props.voteDirection === -1) {
            return '8px solid red'
        } else {
            return '8px solid #878a8c'
        }
    }};
`

export const CommentContainer = styled.div `
    width: 400px;
    margin: 16px auto;
    border-radius: 8px;
    background-color: #fff; 
    display: grid;
    align-items: stretch;
    grid-template-columns: 10% 90%;

    @media (max-width: 600px) {
        max-width: 100%;
        grid-template-columns: 30% 70%; 
    }
`

export const AddCommentForm = styled.form `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 24px 0;
`
