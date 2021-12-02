import React, { useState } from "react";
import api from "../services/api";
import { useRouter } from "next/router";

const SearchBar = () => {
  const [searchResult, setSearchResult] = useState("");
  const router = useRouter();

  const onSearchHandler = (event) => {
    event.preventDefault();
    console.log("Working!");
    router.push(`/stock/view/${searchResult}`);
  };

  const onChangeHandler = (event) => {
    setSearchResult(event.target.value);
  };

  return (
    <div>
      <form onSubmit={onSearchHandler}>
        <input
          type="text"
          className="navigation-bar__search--input"
          placeholder="Search for stocks"
          onChange={onChangeHandler}
        />
        <button>Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
