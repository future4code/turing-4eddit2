import styled from 'styled-components';

export const FeedFiltersContainer = styled.div `
    margin: 24px 16px 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const SmallButtonOldest = styled.button `
    width: 120px;
    margin: 8px;
    background-color: ${props => {
        if(props.active === 'oldest') {
            return '#00497F'
        } else {
            return '#fff'
        }
    }};
    color: ${props => {
        if(props.active === 'oldest') {
            return '#fff'
        } else {
            return '#00497F'
        }
    }}
`

export const SmallButtonNewest = styled.button `
    width: 120px;
    margin: 8px;
    background-color: ${props => {
        if(props.active === 'newest') {
            return '#00497F'
        } else {
            return '#fff'
        }
    }};
    color: ${props => {
        if(props.active === 'newest') {
            return '#fff'
        } else {
            return '#00497F'
        }
    }}
`
