import React from "react";

import { FeedFiltersContainer, SmallButton } from "./styles";

const FeedFilters = (props) => {

    return (
    <FeedFiltersContainer>
      <SmallButton onClick={props.newestFirst}>Mais recentes</SmallButton>
      <SmallButton onClick={props.oldestFirst}>Mais antigos</SmallButton>
    </FeedFiltersContainer>
  );
}

export default FeedFilters