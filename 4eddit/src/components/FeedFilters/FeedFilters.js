import React from "react";

import { FeedFiltersContainer, SmallButtonNewest, SmallButtonOldest } from "./styles";

const FeedFilters = (props) => {

    return (
    <FeedFiltersContainer>
      <SmallButtonNewest onClick={props.newestFirst} active={props.orderList}>Mais recentes</SmallButtonNewest>
      <SmallButtonOldest onClick={props.oldestFirst} active={props.orderList}>Mais antigos</SmallButtonOldest>
    </FeedFiltersContainer>
  );
}

export default FeedFilters