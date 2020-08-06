import React, { useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import useProtectRouter from '../../hooks/useProtectedRoute'
import { HeaderContainer, Logo, SmallButton } from './styles';
import logo from '../../images/logo-reddit.png';


const Header = (props) => {
    const history = useHistory()
    const [ islogged, setIsLogged ] = useState(false);
    const token = useProtectRouter()

    const goToHome = () => {
        history.push("/");
    }

    const goToLogin = () => {
    history.push("/login");
    }

    async function logout (e) {
        e.preventDefault()
            await localStorage.removeItem('token', token)
            setIsLogged(!islogged)
            history.push('/login')
    }


    return (
        <div>
    <HeaderContainer>

        <Logo src={logo} alt="Logo do site" onClick={goToHome}/>
        <div className="search-filter">
            <input placeholder="Busca" onChange={''}></input>
            <SmallButton >Buscar</SmallButton>
        </div>
        {!islogged && ( 
        <SmallButton onClick={logout}>logout</SmallButton>
        )}
 
    </HeaderContainer>
            
    </div>
  );
}

export default Header
