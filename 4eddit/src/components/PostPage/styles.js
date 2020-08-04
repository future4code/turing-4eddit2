import styled from 'styled-components';

export const Post = styled.div `
    max-width: 300px;
    margin: 16px auto;
    border: 1px solid #000;
`

export const VoteUP = styled.button `
    border: none;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
    background-color: ${props => {
        if (props.voteDirection === 1) {
            return 'red'
        } else {
            return 'transparent'
        }
    }};
`

export const VoteDown = styled.button `
    border: none;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
    background-color: ${props => {
        if (props.voteDirection === -1) {
            return 'red'
        } else {
            return 'transparent'
        }
    }};
`

export const CommentContainer = styled.div `
    max-width: 300px;
    margin: 16px auto;
    border: 1px solid #000;
`
