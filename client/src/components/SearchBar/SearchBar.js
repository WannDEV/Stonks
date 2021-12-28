import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { useState } from "react";
import Router from "next/router";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.white.main, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.white.main, 0.25),
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: "100%",
  order: 1,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
    order: 0,
    marginBottom: 0,
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    height: "70%",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    [theme.breakpoints.up("lg")]: {
      width: "30ch",
    },
  },
}));

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");

  const onChange = (event) => {
    setInputValue(event.target.value);
  };

  const onSearch = () => {
    Router.push({
      pathname: "/stock/overview",
      query: {
        symbol: inputValue,
        market: "NASDAQ",
        charttype: "areaChart",
        interval: "1d",
      },
    });
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon onClick={onSearch} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Søg efter aktier..."
        inputProps={{ "aria-label": "search" }}
        onChange={onChange}
        onKeyUp={(event) => {
          if (event.key == "Enter") onSearch();
        }}
      />
    </Search>
  );
};

export default SearchBar;
