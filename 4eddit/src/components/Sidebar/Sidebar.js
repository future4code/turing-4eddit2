import React from "react";

import { SidebarContainer } from './styles'
import MostCommented from "./MostCommented";
import MostVoted from "./MostVoted";

const Sidebar = (props) => {
    return (
        <SidebarContainer>
           <MostVoted  list={props.list} goToPost={props.goToPost}/>
           <MostCommented  list={props.list} goToPost={props.goToPost}/>
        </SidebarContainer>
  );
}

export default Sidebar