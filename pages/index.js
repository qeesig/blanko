import { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";

import {
  Body,
  Cell,
  Header,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
} from "@table-library/react-table-library/table";
import {
  HeaderCellSort,
  SortIconPositions,
  useSort,
} from "@table-library/react-table-library/sort";
import { useTheme } from "@table-library/react-table-library/theme";

import {
  DEFAULT_OPTIONS,
  getTheme,
} from "@table-library/react-table-library/material-ui";
import { usePagination } from "@table-library/react-table-library/pagination";

import {
  Box,
  Link,
  TablePagination,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Popper,
  Autocomplete,
  Button,
} from "@mui/material";

import NumberFormat from "react-number-format";
import removeFbclid from "remove-fbclid";

import {
  TiArrowUnsorted,
  TiArrowSortedUp,
  TiArrowSortedDown,
} from "react-icons/ti";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CancelIcon from "@mui/icons-material/Cancel";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CircleIcon from "@mui/icons-material/Circle";
import { IoClose } from "react-icons/io5";
import NoResult from "../public/folder.png";

import nodes from "../database/blankos.json";
import { partyPass, seasons, lastUpdated } from "../database/data.js";

import styles from "../styles/index.module.css";
import styled from "@emotion/styled";

import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Blankos() {
  const Minting = styled.span`
    margin-right: ${(props) =>
      props.minting == true && props.withdrawable == false
        ? "5px"
        : props.minting == true && props.withdrawable == true
        ? "4px"
        : "4px"};
  `;

  const Tag = styled.div`
    margin-top: ${(props) => (props.tag == null ? "0" : "4px")};
    color: #8e95ab;
    font-size: 12px;
  `;

  const SeasonButton = styled(Button)`
    height: 32px;
    text-align: left;
    text-transform: capitalize;
    color: white;
    font-size: 12px;
    font-weight: bold;
    display: grid;
    grid-template-columns: max-content 22px;
    margin-right: 0px !important;
    background-color: ${(props) =>
      props.initialvalue !== "Season" ? "#2155CD" : "#222531"};
    border: 2px solid transparent;
    border-radius: 20px;
    padding: 4px 14px;

    &:hover {
      background-color: ${(props) =>
        props.initialvalue !== "Season" ? "#1241ad" : "#1c1f2e"};
    }
  `;

  const PartyPassButton = styled(Button)`
    height: 32px;
    text-align: left;
    text-transform: capitalize;
    color: white;
    font-size: 12px;
    font-weight: bold;
    display: grid;
    grid-template-columns: max-content 22px;
    margin-right: 0;
    background-color: ${(props) =>
      props.initialvalue !== "Party Pass" ? "#2155CD" : "#222531"};
    border: 2px solid transparent;
    border-radius: 20px;
    padding: 4px 14px;

    &:hover {
      background-color: ${(props) =>
        props.initialvalue !== "Party Pass" ? "#1241ad" : "#1c1f2e"};
    }
  `;

  const customTheme = {
    Table: `
    --data-table-library_grid-template-columns:  30px 54px 220px 80px 80px 100px 100px 100px 80px 80px 180px;"
    `,
    BaseCell: `
    &:nth-of-type(1) {
      left: 0px;
     
    }

    &:nth-of-type(2) {
      left: 30px;
   
    }
    `,
    Row: `
      &:hover {
        .td:nth-of-type(n) {
          background-color: #191a26;
        }
      }
    `,
  };

  const materialTheme = getTheme(DEFAULT_OPTIONS);

  const theme = useTheme([materialTheme, customTheme]);

  let data = { nodes };

  const [season, setSeason] = useState({ label: "Season" });

  const [seasonPopper, setSeasonPopper] = useState(false);

  const closeSeasonPopper = () => {
    setSeasonPopper(false);
  };

  const openSeasonPopper = () => {
    if (season.label === "Season") {
      setSeasonPopper(true);
      if (seasonPopper == true) {
        setSeasonPopper(false);
      }
    } else {
      setPassPopper(false);
      setSeason({ label: "Season" });
      sessionStorage.setItem("seasonBlanko", "Season");
    }
  };

  const customSeasonPopper = useCallback((props) => {
    return (
      <Popper {...props} style={{ zIndex: 8 }} onClick={closeSeasonPopper} />
    );
  }, []);

  const seasonChange = (e, value) => {
    setSeason(value);
    sessionStorage.setItem("seasonBlanko", value.label);
    pagination.fns.onSetPage(0);
  };

  if (season.label === "Season") {
  } else {
    data = {
      nodes: data.nodes.filter((item) =>
        item.seasonFilter == null
          ? ""
          : season.label === "Season 0"
          ? item.seasonFilter.toLowerCase().includes("S00".toLowerCase())
          : season.label === "Season 1"
          ? item.seasonFilter.toLowerCase().includes("S01".toLowerCase())
          : item.seasonFilter.toLowerCase().includes(season.label.toLowerCase())
      ),
    };
  }

  const seasonBtnIcon = (() => {
    if (season.label === "Season") {
      return <ArrowDropDownIcon style={{ marginTop: "-1px" }} />;
    } else if (season.label !== "Season") {
      return <CancelIcon className={styles.seasonClearIcon} />;
    }
  })();

  const [pass, setPass] = useState({ label: "Party Pass" });

  const [passPopper, setPassPopper] = useState(false);

  const closePassPopper = () => {
    setPassPopper(false);
  };

  const openPassPopper = () => {
    if (pass.label === "Party Pass") {
      setPassPopper(true);
      if (passPopper == true) {
        setPassPopper(false);
      }
    } else {
      setSeasonPopper(false);
      setPass({ label: "Party Pass" });
      sessionStorage.setItem("passBlanko", "Party Pass");
    }
  };

  const customPassPopper = useCallback((props) => {
    return (
      <Popper {...props} style={{ zIndex: 8 }} onClick={closePassPopper} />
    );
  }, []);

  const passChange = (e, value) => {
    setPass(value);
    sessionStorage.setItem("passBlanko", value.label);
    pagination.fns.onSetPage(0);
  };

  if (pass.label === "Party Pass") {
  } else {
    data = {
      nodes: data.nodes.filter((item) =>
        item.passFilter == null
          ? ""
          : item.passFilter.toLowerCase() === pass.label.toLowerCase()
      ),
    };
  }

  const passBtnIcon = (() => {
    if (pass.label === "Party Pass") {
      return <ArrowDropDownIcon className={styles.passDownIcon} />;
    } else if (pass.label !== "Party Pass") {
      return <CancelIcon className={styles.passClearIcon} />;
    }
  })();

  const [category, setCategory] = useState("All Categories");

  const categoryChange = (e) => {
    setCategory(e.target.value);
    pagination.fns.onSetPage(0);
  };

  if (category === "All Categories") {
  } else {
    data = {
      nodes: data.nodes.filter((item) =>
        item.category == null
          ? ""
          : item.category.toLowerCase() === category.toLowerCase()
      ),
    };
  }

  const [search, setSearch] = useState("");

  data = {
    nodes: data.nodes.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.artist.toLowerCase().includes(search.toLowerCase())
    ),
  };

  const blankoSearch = (e) => {
    setSearch(e.target.value);
    pagination.fns.onSetPage(0);
  };

  const sort = useSort(
    data,
    {
      state: {
        sortKey: "SUPPLY",
        reverse: false,
      },
      onChange: onSortChange,
    },
    {
      sortIcon: {
        position: SortIconPositions.Prefix,
        margin: "2px",
        iconDefault: <TiArrowUnsorted fill="#fff" fontSize="small" />,
        iconUp: <TiArrowSortedUp fill="#fff" fontSize="small" />,
        iconDown: <TiArrowSortedDown fill="#fff" fontSize="small" />,
      },
      sortFns: {
        SUPPLY: (array) => array.sort((a, b) => a.minted - b.minted),
        BURNED: (array) => array.sort((a, b) => a.burned - b.burned),
        MINTDATE: (array) =>
          array.sort((a, b) => a.mintDate.localeCompare(b.mintDate)),
        MINTPRICE: (array) => array.sort((a, b) => a.mintPrice - b.mintPrice),
        FLOORPRICE: (array) =>
          array.sort((a, b) => a.floorPrice - b.floorPrice),
        LISTINGS: (array) => array.sort((a, b) => a.listings - b.listings),
      },
    }
  );

  function onSortChange() {
    // pagination.fns.onSetPage(0);
  }

  const scrollReset = () => {
    window.scrollTo(0, 0);
  };

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const pagination = usePagination(data, {
    state: {
      page: parseInt(pageNumber) || 0,
      size: parseInt(pageSize) || 25,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(a, state) {
    sessionStorage.setItem("pageNumber", state.page);
    sessionStorage.setItem("pageSize", state.size);
    scrollReset();
  }

  const [renderDelay, setRenderDelay] = useState(true);

  useEffect(() => {
    removeFbclid();

    const timeoutID = setTimeout(() => {
      setRenderDelay(false);
    }, 25);

    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  useEffect(() => {
    setPass({ label: sessionStorage.getItem("passBlanko") || "Party Pass" });
    setSeason({ label: sessionStorage.getItem("seasonBlanko") || "Season" });
    setPageNumber(parseInt(sessionStorage.getItem("pageNumber")));
    setPageSize(parseInt(sessionStorage.getItem("pageSize")));
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>Blankos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="twitter:title"
          content="Browse all blankos from Blankos Block Party"
          key="twtitle"
        />
        <meta
          property="twitter:image"
          content="https://qeesig.github.io/blanko/blanko-card-img.jpg"
          key="twimage"
        />
        <meta name="twitter:creator" content="@qeesig" key="twhandle" />
        <meta name="twitter:card" content="summary_large_image" key="twcard" />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://qeesig.github.io/blanko/"
          key="ogurl"
        />
        <meta
          property="og:site_name"
          content="Browse all blankos from Blankos Block Party"
        />
        <meta
          property="og:title"
          content="Browse all blankos from Blankos Block Party"
          key="ogtitle"
        />
        <meta
          property="og:image"
          content="https://qeesig.github.io/blanko/blanko-card-img.jpg"
          key="ogimage"
        />
        <meta
          property="og:description"
          content="Love Blankos Block Party? Here you can find information of blankos in an engaging and easy to read manner."
          key="ogdescription"
        />
        <meta
          name="description"
          content="Love Blankos Block Party? Here you can find information of blankos in an engaging and easy to read manner."
        />
        <link rel="icon" href="https://qeesig.github.io/blanko/favicon.ico" />
      </Head>
      {!renderDelay && (
        <>
          <Navbar />

          <header className={styles.header}>
            <h1 className={styles.headerMaintext}>
              {data.nodes.length < 1 ? (
                `0 Blanko`
              ) : data.nodes.length == 1 ? (
                `${data.nodes.length} Blanko`
              ) : (
                <>
                  <NumberFormat
                    value={data.nodes.length}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix=" Blankos"
                  />
                </>
              )}
            </h1>
            <p className={styles.headerSubtext}>
              Explore all blankos from{" "}
              <Link
                href="https://blankos.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blankos Block Party.
              </Link>
            </p>
            <h2 className={styles.lastUpdatedText}>
              Last Updated on{" "}
              {new Date(lastUpdated).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })}
            </h2>
          </header>
        </>
      )}
      <div className={styles.filterContainer}>
        {!renderDelay && (
          <>
            <div className={styles.season}>
              <SeasonButton
                disableElevation
                disableRipple
                id="season-btn-filter"
                aria-haspopup="true"
                variant="contained"
                onClick={openSeasonPopper}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                initialvalue={season.label}
                endIcon={seasonBtnIcon}
              >
                <span>{season.label}</span>
              </SeasonButton>
              {seasonPopper ? (
                <div style={{ position: "absolute", marginTop: "5px" }}>
                  <div className={styles.seasonPopperArrowUp}></div>
                  <Autocomplete
                    open
                    disablePortal
                    options={seasons}
                    onChange={seasonChange}
                    onBlur={closeSeasonPopper}
                    popupIcon={false}
                    noOptionsText="No result"
                    className={styles.seasonAutoComplete}
                    ListboxProps={{
                      style: {
                        maxHeight: "11rem",
                      },
                    }}
                    PaperComponent={({ children }) => (
                      <Paper className={styles.seasonPaper}>{children}</Paper>
                    )}
                    PopperComponent={customSeasonPopper}
                    renderInput={(params) => (
                      <div className={styles.seasonTextField}>
                        <TextField
                          {...params}
                          size="small"
                          autoFocus
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              zIndex: 9,
                              color: "white",
                              backgroundColor: "#222531",
                              width: "198px",
                              margin: "5%",
                              padding: "6px !important",
                              borderRadius: "5px",

                              "& fieldset": {
                                borderColor: "transparent",
                                padding: "0px !important",
                              },

                              "&:hover fieldset": {
                                borderColor: "#353948",
                                borderWidth: 2,
                              },

                              "&.Mui-focused fieldset": {
                                borderColor: "#4a9ff4",
                              },
                            },
                          }}
                        />
                      </div>
                    )}
                  />
                </div>
              ) : null}
            </div>

            <div className={styles.pass}>
              <PartyPassButton
                disableElevation
                disableRipple
                id="pass-btn-filter"
                aria-haspopup="true"
                variant="contained"
                onClick={openPassPopper}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                initialvalue={pass.label}
                endIcon={passBtnIcon}
              >
                <span>{pass.label}</span>
              </PartyPassButton>
              {passPopper ? (
                <div style={{ position: "absolute", marginTop: "5px" }}>
                  <div className={styles.passPopperArrowUp}></div>
                  <Autocomplete
                    open
                    disablePortal
                    options={partyPass}
                    onChange={passChange}
                    onBlur={closePassPopper}
                    popupIcon={false}
                    noOptionsText="No result"
                    className={styles.passAutoComplete}
                    ListboxProps={{
                      style: {
                        maxHeight: "11rem",
                      },
                    }}
                    PaperComponent={({ children }) => (
                      <Paper className={styles.passPaper}>{children}</Paper>
                    )}
                    PopperComponent={customPassPopper}
                    renderInput={(params) => (
                      <div className={styles.passTextField}>
                        <TextField
                          {...params}
                          size="small"
                          autoFocus
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              zIndex: 9,
                              color: "white",
                              backgroundColor: "#222531",
                              width: "198px",
                              margin: "5%",
                              padding: "6px !important",
                              borderRadius: "5px",

                              "& fieldset": {
                                borderColor: "transparent",
                                padding: "0px !important",
                              },

                              "&:hover fieldset": {
                                borderColor: "#353948",
                                borderWidth: 2,
                              },

                              "&.Mui-focused fieldset": {
                                borderColor: "#4a9ff4",
                              },
                            },
                          }}
                        />
                      </div>
                    )}
                  />
                </div>
              ) : null}
            </div>

            <div className={styles.category}>
              <ToggleButtonGroup
                exclusive
                aria-label="categories"
                value={category}
                onChange={categoryChange}
                className={styles.categoryBtnGroup}
                sx={{
                  "& .MuiButtonBase-root": {
                    border: "none",
                    color: "#8e95ab",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    backgroundColor: "transparent",
                    height: "32px",

                    ".MuiTouchRipple-child": {
                      backgroundColor: "transparent",
                    },

                    "&.Mui-selected": {
                      color: "white",
                      textDecoration: "underline",
                      textDecorationColor: "white",
                      backgroundColor: "transparent",

                      "&:hover": {
                        color: "white",
                        textDecorationColor: "white",
                        backgroundColor: "transparent",
                      },
                    },

                    "&:hover": {
                      color: "#D8D8D8",
                      textDecoration: "underline",
                      textDecorationColor: "#D8D8D8",
                      backgroundColor: "transparent",
                    },
                  },
                }}
              >
                <ToggleButton
                  value="All Categories"
                  aria-label="all categories"
                >
                  All Categories
                </ToggleButton>
                <ToggleButton value="Premium Grade" aria-label="premium grade">
                  Premium Grade
                </ToggleButton>
                <ToggleButton
                  value="Community Crew"
                  aria-label="community crew"
                >
                  Community Crew
                </ToggleButton>
              </ToggleButtonGroup>
            </div>

            <Box
              className={styles.search}
              component="div"
              sx={{ display: "grid", alignItems: "flex-start" }}
            >
              <SearchIcon
                sx={{
                  color: "#8e95ab",
                  ml: 1.05,
                  my: 1,
                  position: "absolute",
                  zIndex: 2,
                }}
              />
              {search && (
                <IoClose
                  fill="#4a9ff4"
                  fontSize="medium"
                  style={{
                    position: "absolute",
                    zIndex: 2,
                    marginLeft: "290px",
                    marginTop: ".52rem",
                    width: "22px",
                    height: "22px",
                    padding: "2px",
                    cursor: "pointer",
                  }}
                  onClick={() => setSearch("")}
                />
              )}
              <TextField
                hiddenLabel
                placeholder="Search Blankos, Artists..."
                value={search}
                onChange={blankoSearch}
                size="small"
                sx={{
                  "& label.Mui-focused": {
                    color: "white",
                  },

                  ".MuiFormControl-root .MuiSelect-select": {
                    width: "100%",
                  },

                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    backgroundColor: "#222531",
                    borderRadius: "5px",
                    width: "317px",
                    paddingLeft: "22px",
                    paddingRight: "20px",

                    "&::placeholder": {
                      color: "white",
                      opacity: 0.7,
                    },

                    "& fieldset": {
                      borderColor: "transparent",
                    },

                    "&:hover fieldset": {
                      borderColor: "#353948",
                      borderWidth: 2,
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#4a9ff4",
                    },
                  },
                }}
              />
            </Box>
          </>
        )}
      </div>

      <div className={styles.table}>
        {!renderDelay && (
          <>
            {data.nodes.length === 0 ? (
              <div className={styles.result}>
                <Image
                  src={"/" + NoResult.src}
                  alt="No blanko found picture"
                  width={154}
                  height={154}
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                  placeholder="blur"
                />
                <div>No blanko found</div>
              </div>
            ) : (
              <>
                <div className={styles.legendContainer}>
                  <div>
                    <span className={styles.mintingIconLegend}>
                      <CircleIcon />
                    </span>
                    <span>Minting</span>
                  </div>
                  <div>
                    <span className={styles.withdrawableIconLegend}>
                      <FileUploadIcon />
                    </span>
                    <span>Withdrawable</span>
                  </div>
                </div>
                <Table
                  data={data}
                  theme={theme}
                  layout={{ custom: true }}
                  pagination={pagination}
                  sort={sort}
                >
                  {(blankoList) => (
                    <>
                      <Header>
                        <HeaderRow>
                          <HeaderCell pinLeft></HeaderCell>
                          <HeaderCell pinLeft></HeaderCell>
                          <HeaderCell className={styles.nameHeader}>
                            name
                          </HeaderCell>
                          <HeaderCellSort
                            className={styles.supplyHeader}
                            sortKey="SUPPLY"
                          >
                            supply
                          </HeaderCellSort>
                          <HeaderCellSort
                            className={styles.burnedHeader}
                            sortKey="BURNED"
                          >
                            burned
                          </HeaderCellSort>
                          <HeaderCellSort
                            className={styles.mintDateHeader}
                            sortKey="MINTDATE"
                          >
                            mint date
                          </HeaderCellSort>
                          <HeaderCellSort
                            className={styles.mintPriceHeader}
                            sortKey="MINTPRICE"
                          >
                            mint price
                          </HeaderCellSort>
                          <HeaderCellSort
                            className={styles.floorPriceHeader}
                            sortKey="FLOORPRICE"
                          >
                            floor price
                          </HeaderCellSort>
                          <HeaderCellSort
                            className={styles.listingsHeader}
                            sortKey="LISTINGS"
                          >
                            listings
                          </HeaderCellSort>
                          <HeaderCell className={styles.seasonHeader}>
                            season
                          </HeaderCell>
                          <HeaderCell className={styles.artistHeader}>
                            artist
                          </HeaderCell>
                        </HeaderRow>
                      </Header>
                      <Body>
                        {blankoList.map((item, rank) => (
                          <Row key={item.rank} item={item}>
                            <Cell
                              pinLeft
                              className={styles.tablePinnedCell}
                              style={{
                                paddingLeft: "0px",
                                paddingRight: "0px",
                              }}
                            >
                              {item.rank}
                            </Cell>
                            <Cell pinLeft className={styles.tablePinnedCell}>
                              <Image
                                src={item.imgPath}
                                alt={`Picture of ${item.name}`}
                                width={54}
                                height={54}
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                                placeholder="blur"
                              />
                            </Cell>
                            <Cell
                              className={styles.tableCell}
                              style={{ paddingLeft: "15px" }}
                            >
                              {item.minting == true ? (
                                <Minting
                                  className={
                                    item.minting == true
                                      ? styles.mintingIcon
                                      : ""
                                  }
                                  minting={item.minting}
                                  withdrawable={item.withdrawable}
                                >
                                  <CircleIcon />
                                </Minting>
                              ) : (
                                ""
                              )}
                              <span
                                className={
                                  item.withdrawable == true
                                    ? styles.withdrawableIcon
                                    : ""
                                }
                              >
                                {item.withdrawable == true ? (
                                  <FileUploadIcon />
                                ) : (
                                  ""
                                )}
                              </span>
                              <span className={styles.blankoName}>
                                {item.name}
                              </span>
                              <Tag className={styles.blankoTag} tag={item.tag}>
                                {item.tag}
                              </Tag>
                            </Cell>
                            <Cell
                              className={styles.tableCell}
                              style={{
                                textAlign: "right",
                              }}
                            >
                              <NumberFormat
                                value={item.minted}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                            </Cell>
                            <Cell
                              className={styles.tableCell}
                              style={{
                                textAlign: "right",
                              }}
                            >
                              <NumberFormat
                                value={item.burned}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                            </Cell>
                            <Cell
                              className={styles.tableCell}
                              style={{
                                textAlign: "right",
                              }}
                            >
                              {new Date(item.mintDate).toLocaleDateString(
                                "en-US",
                                {
                                  year: "2-digit",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              )}
                            </Cell>
                            <Cell
                              className={styles.tableCell}
                              style={{
                                textAlign: "right",
                              }}
                            >
                              <NumberFormat
                                value={item.mintPrice}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                              />
                            </Cell>
                            <Cell
                              className={styles.tableCell}
                              style={{
                                textAlign: "right",
                              }}
                            >
                              <NumberFormat
                                value={item.floorPrice}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                              />
                            </Cell>
                            <Cell
                              className={styles.tableCell}
                              style={{
                                textAlign: "right",
                              }}
                            >
                              <NumberFormat
                                value={item.listings}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                            </Cell>
                            <Cell
                              className={styles.tableCell}
                              style={{
                                textAlign: "center",
                              }}
                            >
                              {item.season}
                            </Cell>
                            <Cell className={styles.tableCell}>
                              {item.artist}
                            </Cell>
                          </Row>
                        ))}
                      </Body>
                    </>
                  )}
                </Table>
                <TablePagination
                  count={data.nodes.length}
                  page={pagination.state.page}
                  rowsPerPage={pagination.state.size}
                  rowsPerPageOptions={[10, 25, 50]}
                  onRowsPerPageChange={(event) =>
                    pagination.fns.onSetSize(parseInt(event.target.value, 10))
                  }
                  onPageChange={(event, page) =>
                    pagination.fns.onSetPage(parseInt(page))
                  }
                  as="div"
                  labelRowsPerPage="Rows"
                  sx={{
                    color: "white",

                    "& .MuiTablePagination-toolbar": {
                      marginTop: 3.5,
                    },

                    "& .MuiTablePagination-selectIcon": {
                      color: "white",
                    },

                    ".MuiTouchRipple-child": {
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                    },

                    ".MuiTablePagination-actions": {
                      color: "white",

                      "& button:hover": {
                        backgroundColor: "#20222d",
                      },
                    },

                    "& .MuiButtonBase-root.Mui-disabled": {
                      color: "rgba(255, 255, 255, 0.32);",
                    },
                  }}
                />
              </>
            )}
            <Footer />
          </>
        )}
      </div>
    </div>
  );
}
