import React, { useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import useProtectRouter from '../../hooks/useProtectedRoute'
import { HeaderContainer, Logo, SmallButton, SearchFilter, ResultsContainer, ResultsPost } from './styles';
import logo from '../../images/logo-reddit.png';


const Header = (props) => {
    const history = useHistory()
    const [ islogged, setIsLogged ] = useState(false);
    const token = useProtectRouter()

    const goToHome = () => {
        history.push("/");
    }

    async function logout (e) {
        e.preventDefault()
            await localStorage.removeItem('token', token)
            setIsLogged(!islogged)
            history.push('/login')
    }

    const [ searchInput, setSearchInput ] = useState('');

    const handleChangeInput = event => {
        setSearchInput(event.target.value)
    }

    const handleLiveSearch = () => {

        if (searchInput.length > 2 && !props.list) {
            return <ResultsContainer><h5>buscando...</h5></ResultsContainer>
        } 
        
        if (searchInput.length > 2 && props.list) {
            
            let results = props.list.map( post => {
                if( post.text.includes(searchInput) || post.title.includes(searchInput) || post.username.includes(searchInput)  ) {
                    return <ResultsPost key={post.id}>
                            <h5>{post.username}</h5>
                            <h4>{post.title}</h4>
                            <p>{post.text}</p>
                            </ResultsPost>
                        }
                    
            })

            return <ResultsContainer>
                <h4>Resultado da busca:</h4>
                {results}
                {results.length === 0 && <p>Nada encontrado.</p>}
            </ResultsContainer>
        }
    }

    return (
        <>
            <HeaderContainer>
                <Logo src={logo} alt="Logo do site" onClick={goToHome}/>
                <SearchFilter>
                    <input value={searchInput} placeholder="Busca" onChange={handleChangeInput}></input>
                    <SmallButton>Buscar</SmallButton>
                    {handleLiveSearch()}

                </SearchFilter>
                {!islogged && ( 
                <SmallButton onClick={logout}>logout</SmallButton>
                )}
            </HeaderContainer>

        </>
  );
}

export default Header
