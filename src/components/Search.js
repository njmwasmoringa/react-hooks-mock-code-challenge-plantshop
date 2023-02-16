import React, { useContext, useState } from "react";
import { StoreContext } from "../context/store.context";
import { Api } from "../services/api";
const plantsAPI = new Api("plants");

function Search() {

  const { store, setStore } = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearch(evt) {
    setSearchTerm(evt.target.value);
    if (searchTerm == '') {
      plantsAPI.all.then(plants => setStore({ ...store, plants }));
    }
    else {
      plantsAPI.search(searchTerm).then(searchResult => {
        setStore({ ...store, plants: searchResult });
      });
    }
  }

  function handleClearSearch(){
    setSearchTerm('');
    plantsAPI.all.then(plants => setStore({ ...store, plants }));
  }

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchTerm != '' && <button onClick={handleClearSearch}>Clear Search</button>}
    </div>
  );
}

export default Search;
