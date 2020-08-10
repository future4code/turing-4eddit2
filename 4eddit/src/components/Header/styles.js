import styled from 'styled-components';

export const HeaderContainer = styled.div `
    max-width: 100%;
    padding: 16px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: #fff;

    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    box-shadow: 10px -6px 21px 2px rgba(0,73,127,0.54);

    @media (max-width: 500px) {
        padding: 8px;
    }
`

export const Logo = styled.img `
    height: 56px;
    cursor: pointer;
`

export const SmallButton = styled.button `
    width: 80px;
`

export const SearchFilter = styled.div `
    max-width: 500px;
    position: relative;

    @media (max-width: 500px ) {
        width: 100%;
    };
`

export const ResultsContainer = styled.div `
    width: 100%;
    height: 500px;
    position: absolute;
    top: 56px;
    left: 0;
    padding: 16px;
    background-color: #fff;
    overflow-y: scroll;
`

export const ResultsPost = styled.div `
    margin: 16px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #00497F;
`

export const ResultsPostText = styled.p `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`