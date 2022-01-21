import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useTable } from "react-table";
import { useMemo, useState, useEffect } from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";

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

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: "1",
  margin: theme.spacing(3),
  boxShadow: `0 0 35px -2px ${theme.palette.grey.main}`,
  padding: `${theme.spacing(4)} ${theme.spacing(2)}`,
  borderRadius: "8px",
  justifyContent: "space-between",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    margin: `${theme.spacing(3)} ${theme.spacing(1)}`,
  },
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.6rem",
  fontWeight: "bold",
  color: theme.palette.text.primary,
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    fontSize: "1.4rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

const StyledTable = styled("table")(({ theme }) => ({
  width: "100%",
  borderCollapse: "collapse",
  margin: `${theme.spacing(3)} 0`,
  fontSize: "1.1rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const StyledTr = styled("tr")(({ theme }) => ({}));

const StyledTrData = styled("tr")(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.background.light}`,
  "&:last-of-type": {
    borderBottom: "none",
  },
}));

const StyledTh = styled("th")(({ theme }) => ({
  fontWeight: "normal",
  fontSize: "0.9rem",
  color: theme.palette.grey.main,
  paddingBottom: theme.spacing(2),
}));

const StyledThead = styled("thead")(({ theme }) => ({}));

const StyledTbody = styled("tbody")(({ theme }) => ({}));

const StyledTd = styled("td")(({ theme }) => ({
  textAlign: "center",
  fontSize: "1.1rem",
  color: theme.palette.text.secondary,
  padding: `${theme.spacing(1.5)} 0`,
}));

const LeaderboardSection = (props) => {
  const leaderboard = props.leaderboard;
  const startBalance = props.startBalance;
  const userId = props.userId;
  const defaultShowAmount = props.defaultShowAmount;

  const theme = useTheme();

  const [pageNumber, setPageNumber] = useState(1);
  const [itemsOnOnePage, setItemsOnOnePage] = useState(defaultShowAmount);

  const [isShowAmountOpen, setIsShowAmountOpen] = useState(false);

  const [totalPages, setTotalPages] = useState(
    Math.ceil(leaderboard.length / itemsOnOnePage)
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
    setTotalPages(Math.ceil(leaderboard.length / event.target.value));
    setPageNumber(1);
  };

  const handleCloseShowAmount = () => setIsShowAmountOpen(false);
  const handleOpenShowAmount = () => setIsShowAmountOpen(true);

  for (let i = 0; i < leaderboard.length; ++i) {
    if (typeof leaderboard[i].change == "number")
      leaderboard[i].change = `${leaderboard[i].change}% (${
        (startBalance * leaderboard[i].change) / 100
      } kr.)`;
    if (typeof leaderboard[i].total == "number")
      leaderboard[i].total = `${leaderboard[i].total} kr.`;
    leaderboard[i].placement = i + 1;
    if (leaderboard[i].name.length >= 24) {
      leaderboard[i].shortName = leaderboard[i].name.substring(0, 20) + "...";
    } else {
      leaderboard[i].shortName = leaderboard[i].name;
    }
  }

  const data = useMemo(() => {
    const tempLeaderboard = leaderboard.slice(
      pageNumber * itemsOnOnePage - itemsOnOnePage,
      pageNumber == totalPages
        ? leaderboard.length
        : pageNumber * itemsOnOnePage
    );
    for (let i = 0; i < tempLeaderboard.length; ++i) {
      if (tempLeaderboard[i].userId == userId) {
        return tempLeaderboard;
      }
    }
    for (let i = 0; i < leaderboard.length; ++i) {
      if (leaderboard[i].userId == userId) {
        tempLeaderboard.push({}, {}, {}); // dividers between leaderboard and showing user
        tempLeaderboard.push(leaderboard[i]);
        break;
      }
    }
    return tempLeaderboard;
  }, [itemsOnOnePage, pageNumber]);

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "placement", // accessor is the "key" in the data
      },
      {
        Header: "Navn",
        accessor: "name",
      },
      {
        Header: "Navn",
        accessor: "shortName",
      },
      {
        Header: "Handler",
        accessor: "trades",
      },
      {
        Header: "Ændring",
        accessor: "change",
      },
      {
        Header: "Total",
        accessor: "total",
      },
    ],
    []
  );

  const showFullTable = useMediaQuery(theme.breakpoints.up("md"));
  const showMediumTable = useMediaQuery(theme.breakpoints.down("md"));
  const showNarrowTable = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (showNarrowTable) setHiddenColumns(["trades", "change", "name"]);
  }, [showNarrowTable]);

  useEffect(() => {
    if (showMediumTable && !showNarrowTable)
      setHiddenColumns(["trades", "shortName"]);
  }, [showMediumTable]);

  useEffect(() => {
    if (showFullTable) setHiddenColumns(["shortName"]);
  }, [showFullTable]);

  const figureOutColor = (column, value) => {
    if (column == "change" && parseFloat(value) > 0)
      return theme.palette.green.main;
    else if (column == "change" && parseFloat(value) < 0)
      return theme.palette.red.main;
    else if (column == "change" && parseFloat(value) == 0)
      return theme.palette.grey.light;
    else return "";
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setHiddenColumns,
  } = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns: [],
    },
  });

  return (
    <StyledBox component="div">
      <HeaderTypography variant="h3">Leaderboard</HeaderTypography>
      <StyledTable {...getTableProps()}>
        <StyledThead>
          {headerGroups.map((headerGroup) => (
            <StyledTr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <StyledTh {...column.getHeaderProps()}>
                  {column.render("Header")}
                </StyledTh>
              ))}
            </StyledTr>
          ))}
        </StyledThead>
        <StyledTbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <StyledTrData
                {...row.getRowProps()}
                sx={{
                  backgroundColor:
                    row.original.userId == userId
                      ? theme.palette.background.light
                      : "",
                }}
              >
                {row.cells.map((cell) => {
                  return (
                    <StyledTd
                      {...cell.getCellProps()}
                      style={{
                        color: figureOutColor(cell.column.id, cell.value),
                      }}
                    >
                      {cell.render("Cell")}
                    </StyledTd>
                  );
                })}
              </StyledTrData>
            );
          })}
        </StyledTbody>
      </StyledTable>
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
              <StyledMenuItem value={leaderboard.length}>Alle</StyledMenuItem>
            </StyledSelect>
          </StyledFormControl>
        </Box>
      </Box>
    </StyledBox>
  );
};

export default LeaderboardSection;
