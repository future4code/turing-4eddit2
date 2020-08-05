import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

import { HeaderContainer, Logo, SmallButton } from './styles';
import logo from '../../images/logo-reddit.png';

const Header = () => {
    const history = useHistory()
    const [ islogged, setIsLogged ] = useState(false);

    const goToHome = () => {
        history.push("/");
    }

    const goToLogin = () => {
    history.push("/login");
    }

    return (
    <HeaderContainer>
        <Logo src={logo} alt="Logo do site" onClick={goToHome}/>
        <div className="search-filter">
            <input placeholder="Busca"></input>
            <SmallButton>Buscar</SmallButton>
        </div>
        {islogged ? <SmallButton>logout</SmallButton> : <SmallButton onClick={goToLogin}>login</SmallButton>}
       
    </HeaderContainer>
  );
}

export default Header
