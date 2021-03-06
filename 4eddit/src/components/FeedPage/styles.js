import styled from 'styled-components';

export const FeedContainer = styled.div `
    max-width: 1024px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: flex-start;
    justify-items: center;
    padding-top: 144px;

    @media (max-width: 500px) {
        display: block;
    }
`

export const MainContent = styled.div `
    max-width: 640px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Post = styled.div `
    width: 100%;
    margin: 8px 16px;
    border: 1px solid #00497F;
    border-radius: 4px;
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
    border-radius: 4px 0 0 4px;
`

export const PostText = styled.div `
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: center;
    cursor: pointer;
`

export const VoteBtn = styled.button `
    width: 16px;
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
