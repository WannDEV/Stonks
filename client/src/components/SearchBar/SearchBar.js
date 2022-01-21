import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha, useTheme } from "@mui/material/styles";
import React, { useState, useEffect, useCallback } from "react";
import Router from "next/router";
import debounce from "lodash/debounce";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import uniqueId from "lodash/uniqueId";

import api from "../../services/api";

import USAFlag from "../../../assets/FlagIcons/usa.svg";
import CryptoFlag from "../../../assets/FlagIcons/crypto.svg";

const useStyles = makeStyles({
  option: {
    // Hover
    '&[data-focus="true"]': {
      backgroundColor: "#525151",
      borderColor: "transparent",
    },
  },
});

const Search = styled(Box)(({ theme }) => ({
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

const SearchIconWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    height: "70%",
  },
}));

const OptionBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderBottom: `1px solid ${theme.palette.grey.main}`,
  padding: `${theme.spacing(1)} 0`,
}));

const OptionTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "1rem",
  display: "block",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  marginLeft: theme.spacing(0.7),
}));

const OptionFlagBox = styled(Box)(({ theme }) => ({
  width: "1rem",
  height: "1rem",
  marginRight: theme.spacing(1),
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  // vertical padding + font size from searchIcon
  height: "70%",
  transition: theme.transitions.create("width"),
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "40ch",
  },
  [theme.breakpoints.up("lg")]: {
    width: "50ch",
  },
  "& .MuiAutocomplete-inputRoot": {
    color: theme.palette.text.primary,
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "purple",
    },
  },
  "& .MuiAutocomplete-noOptions": {
    color: theme.palette.text.primary,
  },
  "& .MuiAutocomplete-loading": {
    color: theme.palette.text.primary,
  },
}));

const OptionSymbolBox = styled(Box)(({ theme }) => ({
  display: "inline",
  color: theme.palette.text.primary,
  fontWeight: "bold",
  borderRight: `2px solid ${theme.palette.text.secondary}`,
  paddingRight: theme.spacing(0.7),
}));

const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [userHasSearched, setUserHasSearched] = useState(uniqueId());

  const theme = useTheme();
  const styles = useStyles();

  const decideFlagToUse = (exchange) => {
    if (exchange == "NASDAQ" || exchange == "NYSE" || exchange == "AMEX")
      return <USAFlag width="100%" />;
    else if (exchange == "CRYPTO") return <CryptoFlag width="100%" />;
    else return <DoNotDisturbOnIcon width="100%" color="black" />;
  };

  const getStyledOption = (name, exchange, symbol) => {
    const flag = decideFlagToUse(exchange);

    return (
      <OptionBox component="div">
        <OptionFlagBox component="div">{flag}</OptionFlagBox>
        <OptionSymbolBox component="div">{symbol}</OptionSymbolBox>
        <OptionTypography variant="body1"> {name}</OptionTypography>
      </OptionBox>
    );
  };

  const onSearch = (e, obj) => {
    setInputValue("");
    setOptions([]);
    setUserHasSearched(uniqueId());

    Router.push({
      pathname: "/stock/overview",
      query: {
        symbol: obj.symbol,
        market: obj.exchangeShortName,
        charttype: "areaChart",
        interval: "1d",
      },
    });
  };

  const getOptionsDelayed = useCallback(
    debounce((text, callback) => {
      if (text != "") {
        setLoadingOptions(true);
        setOptions([]);
        api
          .get(`stock/autocomplete?search=${text}`)
          .then((response) => {
            if (response.status == 200 || response.statusCode == 200)
              callback(response.data);
            setLoadingOptions(false);
          })
          .catch((err) => setLoadingOptions(false));
      }
    }, 300),
    []
  );

  useEffect(() => {
    getOptionsDelayed(inputValue, (filteredOptions) => {
      setOptions(filteredOptions);
    });
  }, [inputValue, getOptionsDelayed]);

  return (
    <Search component="div">
      <SearchIconWrapper component="div">
        <StyledSearchIcon onClick={onSearch} />
      </SearchIconWrapper>
      <StyledAutocomplete
        id="autocomplete-search-bar"
        options={options}
        getOptionLabel={(option) => option.name || ""}
        disableClearable
        forcePopupIcon={false}
        autoHighlight={true}
        loading={options.length === 0 && loadingOptions}
        classes={{
          option: styles.option,
        }}
        renderInput={(params) => {
          const { InputLabelProps, InputProps, ...rest } = params;
          return (
            <StyledInputBase
              {...params.InputProps}
              {...rest}
              placeholder="Søg efter aktier..."
            />
          );
        }}
        renderOption={(option) =>
          getStyledOption(option.name, option.exchangeShortName, option.symbol)
        }
        onInputChange={(e, newInputValue, reason) => {
          if (reason === "reset") {
            setInputValue("");
            return;
          } else {
            setInputValue(newInputValue);
          }
        }}
        PaperComponent={({ children }) => (
          <Paper style={{ background: theme.palette.background.light }}>
            {children}
          </Paper>
        )}
        clearOnBlur
        noOptionsText="Ingen data fundet"
        onChange={onSearch}
        key={userHasSearched}
      />
    </Search>
  );
};

export default SearchBar;
