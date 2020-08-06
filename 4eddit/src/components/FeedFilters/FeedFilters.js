import React, { useState, useContext } from "react";

import FiltersContext from "../../contexts/FiltersContext";

import { FeedFiltersContainer } from "./styles";

const FeedFilters = () => {
    const filtersContext = useContext(FiltersContext);

    console.log(filtersContext.post)
    
    const [min, setMin] = useState(filtersContext.filters.min)
    const [max, setMax] = useState(filtersContext.filters.min)
    const [name, setName] = useState(filtersContext.filters.min)

    

    const handleApplyFilters = () => {
        const newFilters = { min: min, max: max, name: name };
    
        filtersContext.dispatch({ type: "SET_FILTERS", filters: newFilters });
      };
    
      const handleResetFilters = () => {
        filtersContext.dispatch({ type: "RESET_FILTERS" });
        setMin('');
        setMax('');
        setName('');
      };

    return (
    <FeedFiltersContainer>
      <h4>Filtros</h4>
        <input
            placeholder="Valor Mínimo"
            value={min}
            type="number"
            onChange={event => setMin(event.target.value)}
        />
        <input
            placeholder="Valor Máximo"
            value={max}
            type="number"
            onChange={event => setMax(event.target.value)}
        />
        <input
            placeholder="Nome"
            value={name}
            type="text"
            onChange={event => setName(event.target.value)}
        />
        <button onClick={handleApplyFilters}>Aplicar filtros</button>
        <button onClick={handleResetFilters}>Limpar filtros</button>
    </FeedFiltersContainer>
  );
}

export default FeedFilters