import { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import PurchaseHistoryItem from "../components/PurchaseHistoryItem/PurchaseHistoryItem";

const StyledArrowLeftIcon = styled(ArrowBackIosNewIcon)(({ theme }) => ({
  width: "100%",
  height: "100%",
  color: theme.palette.text.primary,
}));

const StyledArrowRightIcon = styled(ArrowForwardIosIcon)(({ theme }) => ({
  width: "100%",
  height: "100%",
  color: theme.palette.text.primary,
}));

const PageTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.primary,
}));

const CurrentPageBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
}));

const StyledKeyboardDoubleArrowLeftIcon = styled(KeyboardDoubleArrowLeftIcon)(
  ({ theme }) => ({
    width: "100%",
    height: "100%",
    color: theme.palette.text.primary,
  })
);

const StyledKeyboardDoubleArrowRightIcon = styled(KeyboardDoubleArrowRightIcon)(
  ({ theme }) => ({
    width: "100%",
    height: "100%",
    color: theme.palette.text.primary,
  })
);

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: "2rem",
  height: "2rem",
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.grey.main}`,
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.black.main,
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({}));

const PurchaseHistory = (props) => {
  const symbol = props.symbol;
  const data = props.data;
  const defaultShowAmount = props.defaultShowAmount;

  const itemsList = [];

  const theme = useTheme();

  const [pageNumber, setPageNumber] = useState(1);
  const [itemsOnOnePage, setItemsOnOnePage] = useState(defaultShowAmount);

  const [isShowAmountOpen, setIsShowAmountOpen] = useState(false);

  const [totalPages, setTotalPages] = useState(
    Math.ceil(data.length / itemsOnOnePage)
  );

  const onePageBackward = () => {
    if (pageNumber > 1) setPageNumber(--pageNumber);
  };

  const onePageForward = () => {
    if (pageNumber < totalPages) setPageNumber(++pageNumber);
  };

  const goToFirstPage = () => {
    if (pageNumber > 1) setPageNumber(1);
  };

  const goToLastPage = () => {
    if (pageNumber < totalPages) setPageNumber(totalPages);
  };

  const handleShowAmountChange = (event) => {
    setItemsOnOnePage(event.target.value);
    setTotalPages(Math.ceil(data.length / event.target.value));
    setPageNumber(1);
  };

  const handleCloseShowAmount = () => setIsShowAmountOpen(false);
  const handleOpenShowAmount = () => setIsShowAmountOpen(true);

  for (let i = 0; i < data.length; ++i) {
    itemsList.push(
      <PurchaseHistoryItem
        price={data[i].price}
        amount={data[i].amount}
        dateOfPurchase={data[i].dateOfPurchase}
        kind={data[i].kind}
        id={data[i].id}
        status={data[i].status}
        stockGame={data[i].stockGame}
        symbol={symbol}
        key={i}
      />
    );
  }

  return (
    <div>
      {itemsList.slice(
        pageNumber * itemsOnOnePage - itemsOnOnePage,
        pageNumber == totalPages ? data.length : pageNumber * itemsOnOnePage
      )}
      <Box
        component="div"
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <CurrentPageBox component="div">
          <StyledIconButton
            aria-label="Page backward"
            onClick={goToFirstPage}
            color="inherit"
            disabled={pageNumber == 1 ? true : false}
          >
            <StyledKeyboardDoubleArrowLeftIcon
              sx={{
                color: pageNumber == 1 ? theme.palette.grey.main : "none",
              }}
            />
          </StyledIconButton>
          <StyledIconButton
            aria-label="Page backward"
            onClick={onePageBackward}
            color="inherit"
            disabled={pageNumber == 1 ? true : false}
          >
            <StyledArrowLeftIcon
              sx={{
                color: pageNumber == 1 ? theme.palette.grey.main : "none",
              }}
            />
          </StyledIconButton>
          <PageTypography variant="body1">
            Side {pageNumber} ud af {totalPages}
          </PageTypography>
          <StyledIconButton
            aria-label="Page forward"
            onClick={onePageForward}
            color="inherit"
            disabled={pageNumber == totalPages ? true : false}
          >
            <StyledArrowRightIcon
              sx={{
                color:
                  pageNumber == totalPages ? theme.palette.grey.main : "none",
              }}
            />
          </StyledIconButton>
          <StyledIconButton
            aria-label="Page backward"
            onClick={goToLastPage}
            color="inherit"
            disabled={pageNumber == totalPages ? true : false}
          >
            <StyledKeyboardDoubleArrowRightIcon
              sx={{
                color:
                  pageNumber == totalPages ? theme.palette.grey.main : "none",
              }}
            />
          </StyledIconButton>
        </CurrentPageBox>
        <Box
          component="div"
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" sx={{ color: theme.palette.grey.main }}>
            Vis:{" "}
          </Typography>
          <StyledFormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
            <StyledSelect
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={isShowAmountOpen}
              onClose={handleCloseShowAmount}
              onOpen={handleOpenShowAmount}
              value={itemsOnOnePage}
              label="Age"
              onChange={handleShowAmountChange}
            >
              <StyledMenuItem value={5}>5</StyledMenuItem>
              <StyledMenuItem value={10}>10</StyledMenuItem>
              <StyledMenuItem value={15}>15</StyledMenuItem>
              <StyledMenuItem value={20}>20</StyledMenuItem>
              <StyledMenuItem value={data.length}>Alle</StyledMenuItem>
            </StyledSelect>
          </StyledFormControl>
        </Box>
      </Box>
    </div>
  );
};

export default PurchaseHistory;
