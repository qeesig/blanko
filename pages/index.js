import { useEffect, useState } from "react";
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
import { useTheme } from "@table-library/react-table-library/theme";
import {
  DEFAULT_OPTIONS,
  getTheme,
} from "@table-library/react-table-library/material-ui";
import { usePagination } from "@table-library/react-table-library/pagination";
import {
  Box,
  FormControl,
  Link,
  MenuItem,
  Select,
  TablePagination,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import {
  HeaderCellSort,
  SortIconPositions,
  useSort,
} from "@table-library/react-table-library/sort";
import NumberFormat from "react-number-format";
import removeFbclid from "remove-fbclid";

import {
  TiArrowUnsorted,
  TiArrowSortedUp,
  TiArrowSortedDown,
} from "react-icons/ti";
import SearchIcon from "@mui/icons-material/Search";
import { IoClose } from "react-icons/io5";

import nodes from "../database/blankos.json";

import styles from "../styles/index.module.css";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Blankos() {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
      },
    },
  };

  const styledCell = css`
    padding: 10px;
    height: 54px;
    background-color: #17171a;
    color: white;

    @media screen and (max-width: 620px) {
      font-size: 12px;
    }
  `;

  const styledHeader = css`
    @media screen and (max-width: 620px) {
      padding-left: 0px;
    }
  `;

  const styledMintedHeader = css`
    padding-right: 0px;
    padding-left: 25px;

    @media screen and (max-width: 620px) {
      padding-left: 15px;
    }
  `;

  const styledBurnedHeader = css`
    padding-right: 0px;
    padding-left: 30px;

    @media screen and (max-width: 620px) {
      padding-left: 15px;
    }
  `;

  const styledMintDateHeader = css`
    padding-right: 0px;
    padding-left: 55px;

    @media screen and (max-width: 620px) {
      padding-left: 10px;
    }
  `;

  const styledMintPriceHeader = css`
    padding-right: 0px;
    padding-left: 55px;

    @media screen and (max-width: 1024px) {
      padding-left: 50px;
    }

    @media screen and (max-width: 780px) {
      padding-left: 70px;
    }

    @media screen and (max-width: 620px) {
      padding-left: 10px;
    }
  `;

  const Name = styled.div`
    color: white;
    font-size: 14px;
    font-weight: bold;

    @media screen and (max-width: 620px) {
      font-size: 12px;
    }
  `;

  const Minting = styled.span`
    margin-right: ${(props) =>
      props.minting == true && props.withdrawable == false
        ? "10px"
        : props.minting == true && props.withdrawable == true
        ? "4px"
        : "0px"};
  `;

  const Tag = styled.div`
    margin-top: ${(props) => (props.tag == null ? "0" : "4px")};
    color: #8e95ab;
    font-size: 12px;
  `;

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const [customTable, setCustomTable] = useState(
    "--data-table-library_grid-template-columns:  50px 54px 180px 95px 100px 130px 130px 80px 185px;"
  );

  const customTheme = {
    Table: `
      ${customTable}
    `,
    Row: `
      &:hover {
        .td:nth-of-type(n) {
          background-color: #191a26;
        }
      }
    `,
  };

  const theme = useTheme([materialTheme, customTheme]);

  const [primaryFilter, setPrimaryFilter] = useState("All");

  const primaryFilterValue = (event) => {
    setPrimaryFilter(event.target.value);
    sessionStorage.setItem("blankoPrimaryFilter", event.target.value);
    pagination.fns.onSetPage(0);
  };

  let data = { nodes };

  if (primaryFilter === "All") {
  } else {
    data = {
      nodes: data.nodes.filter((item) =>
        item.tagFilter == null
          ? ""
          : item.tagFilter.toLowerCase() === primaryFilter.toLowerCase()
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
  const blankoSearch = (event) => {
    setSearch(event.target.value);
    pagination.fns.onSetPage(0);
  };

  const [season, setSeason] = useState("");
  const seasonChange = (event) => {
    setSeason(event.target.value);
    pagination.fns.onSetPage(0);
  };
  data = {
    nodes: data.nodes.filter((item) =>
      item.seasonFilter.toLowerCase().includes(season.toLowerCase())
    ),
  };

  const sort = useSort(
    data,
    {
      state: {
        sortKey: "MINTED",
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
        MINTED: (array) => array.sort((a, b) => a.minted - b.minted),
        BURNED: (array) => array.sort((a, b) => a.burned - b.burned),
        MINTDATE: (array) =>
          array.sort((a, b) => a.mintDate.localeCompare(b.mintDate)),
        MINTPRICE: (array) => array.sort((a, b) => a.mintPrice - b.mintPrice),
      },
    }
  );

  function onSortChange() {
    pagination.fns.onSetPage(0);
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

  function onPaginationChange(action, state) {
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

  const [viewPort, setViewPort] = useState(0);

  const handleWindowResize = () => {
    setViewPort(window.innerWidth);
  };

  useEffect(() => {
    // component is mounted and window is available
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    // unsubscribe from the event on component unmount
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    if (viewPort <= 620) {
      setCustomTable(
        "--data-table-library_grid-template-columns:  35px 49px 148px 85px !important;"
      );
      // minted, mt price
    } else if (viewPort <= 780) {
      setCustomTable(
        "--data-table-library_grid-template-columns:  50px 54px 180px 95px 150px !important;"
      );
      // minted, burned, mt price, season
    } else if (viewPort <= 1024) {
      setCustomTable(
        "--data-table-library_grid-template-columns:  50px 54px 200px 95px 100px 130px 80px !important;"
      );
      // minted, burned, mt date, mt price, season
    } else if (viewPort <= 1300) {
      setCustomTable(
        "--data-table-library_grid-template-columns:  50px 54px 280px 95px 100px 130px 130px 80px !important;"
      );
      // default
    } else {
      setCustomTable(
        "--data-table-library_grid-template-columns:  50px 54px 280px 95px 100px 130px 130px 80px 185px !important;"
      );
    }
  }, [viewPort]);

  const [hiddenColumns, setHiddenColumns] = useState(["MINTED"]);

  const toggleColumn = (column) => {
    setHiddenColumns(
      hiddenColumns.splice(column, 1) && hiddenColumns.concat(column)
    );
    pagination.fns.onSetPage(0);
  };

  useEffect(() => {
    setPrimaryFilter(sessionStorage.getItem("blankoPrimaryFilter") || "All");
    setPageNumber(parseInt(sessionStorage.getItem("pageNumber")));
    setPageSize(parseInt(sessionStorage.getItem("pageSize")));
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>blankos / Blankodrops</title>
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
        <header>
          <Navbar />
          <p className={styles.headerMaintext}>Blankos</p>
          <p className={styles.headerSubtext}>
            Explore all blankos from{" "}
            <Link
              href="https://blankos.com/"
              target="_blank"
              sx={{
                color: "#4a9ff4",
                fontWeight: "bold",
                textDecoration: "none",
                "&:hover": { color: "#81c0ff" },
              }}
            >
              Blankos Block Party.
            </Link>
          </p>
        </header>
      )}
      <div className={styles.filterContainer}>
        {!renderDelay && (
          <>
            <div className={styles.primaryFilter}>
              <ToggleButtonGroup
                value={primaryFilter}
                onChange={primaryFilterValue}
                color="standard"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  overflowX: "scroll",
                  overflowY: "hidden",
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                  borderRadius: 0,

                  "::-webkit-scrollbar": {
                    display: "none",
                  },

                  "& > button": {
                    padding: "16px 4px !important",
                  },

                  "& .MuiButtonBase-root": {
                    border: "none",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    backgroundColor: "transparent",
                    height: 14,
                    padding: 2,
                    marginBottom: "10px",
                    marginTop: "10px",

                    "&:nth-of-type(1)": {
                      marginRight: 0.8,
                      borderRadius: 6,
                      minWidth: "44px",
                    },

                    "&:nth-of-type(2)": {
                      marginRight: 0.8,
                      borderRadius: 6,
                      minWidth: "88px",
                    },

                    "&:nth-of-type(3)": {
                      marginRight: 0.8,
                      borderRadius: 6,
                      minWidth: "82px",
                    },

                    "&:nth-of-type(4)": {
                      marginRight: 0.8,
                      borderRadius: 6,
                      minWidth: "82px",
                    },

                    ".MuiTouchRipple-child": {
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                    },

                    "&.Mui-selected": {
                      backgroundColor: "#1976d2",
                      color: "white",
                      textDecorationColor: "white",

                      "&:hover": {
                        backgroundColor: "#1976d2",
                        textDecorationColor: "white",
                      },
                    },

                    "&:hover": {
                      backgroundColor: "#20222d",
                      textDecorationColor: "white",
                      color: "white",
                    },
                  },
                }}
                exclusive
                aria-label="text formatting"
              >
                <ToggleButton sx={{ color: "white" }} value="All">
                  All
                </ToggleButton>
                <ToggleButton sx={{ color: "white" }} value="Party Pass">
                  Party Pass
                </ToggleButton>
                <ToggleButton sx={{ color: "white" }} value="GM Grade">
                  GM Grade
                </ToggleButton>
                <ToggleButton sx={{ color: "white" }} value="MT Grade">
                  MT Grade
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className={styles.secondaryFilter}>
              <Box
                className={styles.searchField}
                component="div"
                sx={{ display: "grid", alignItems: "flex-start" }}
              >
                <SearchIcon
                  fill="white"
                  sx={{
                    color: "white",
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
                      marginTop: ".72rem",
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
                    input: {
                      color: "white",
                      backgroundColor: "#222531",
                      borderRadius: "5px",
                      paddingLeft: "36px",
                      paddingRight: "34px",

                      "&::placeholder": {
                        color: "white",
                        opacity: 0.7,
                      },
                    },

                    label: { color: "white" },
                    width: "317px",

                    "& label.Mui-focused": {
                      color: "white",
                    },

                    "& .MuiOutlinedInput-root": {
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
              <FormControl
                className={styles.seasonFilter}
                sx={{
                  width: "160px",
                  label: { color: "white" },

                  "& label.Mui-focused": {
                    color: "white",
                  },

                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },

                  "& .MuiInputBase-formControl": {
                    backgroundColor: "#222531",
                  },

                  "& .MuiSelect-select": {
                    color: "white",
                    width: 130,
                  },

                  "& .MuiOutlinedInput-root": {
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
                size="small"
              >
                <Select
                  displayEmpty
                  value={season}
                  onChange={seasonChange}
                  MenuProps={MenuProps}
                >
                  <MenuItem value="">All Season</MenuItem>
                  <MenuItem value="00 Pre-launch">00 Pre-launch</MenuItem>
                  <MenuItem value="00 SXSW 2019">00 SXSW 2019</MenuItem>
                  <MenuItem value="00 Alpha">00 Alpha</MenuItem>
                  <MenuItem value="00 Private Beta">00 Private Beta</MenuItem>
                  <MenuItem value="00 Open Beta">00 Open Beta</MenuItem>
                  <MenuItem value="00 Early Access">00 Early Access</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                className={styles.sortByFilter}
                sx={{
                  label: { color: "white" },

                  "& label.Mui-focused": {
                    color: "white",
                  },

                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },

                  "& .MuiInputBase-formControl": {
                    backgroundColor: "#222531",
                  },

                  "& .MuiSelect-select": {
                    color: "white",
                    width: 100,
                  },

                  "& .MuiOutlinedInput-root": {
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
                size="small"
              >
                <Select
                  value={hiddenColumns}
                  displayEmpty
                  onChange={(e) => toggleColumn(e.target.value)}
                >
                  <MenuItem value="MINTED">Sort by Minted</MenuItem>
                  <MenuItem value="BURNED">Sort by Burned</MenuItem>
                  <MenuItem value="MINTDATE">Sort by MT Date</MenuItem>
                  <MenuItem value="MINTPRICE">Sort by MT Price</MenuItem>
                </Select>
              </FormControl>
            </div>
          </>
        )}
      </div>

      <div className={styles.table}>
        {!renderDelay && (
          <>
            <div className={styles.blankoResult}>
              {data.nodes.length < 1 ? (
                `No Result`
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
            </div>
            <div className={styles.legendContainer}>
              <div>
                <span className={styles.mintingIconLegend}></span>
                <span>Minting</span>
              </div>
              <div>
                <span className={styles.withdrawableIconLegend}>⬘</span>
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
                      <HeaderCell css={styledHeader}></HeaderCell>
                      <HeaderCell css={styledHeader}></HeaderCell>
                      <HeaderCell css={styledHeader}></HeaderCell>
                      <HeaderCellSort
                        hide={
                          viewPort <= 620
                            ? !hiddenColumns.includes("MINTED")
                            : ""
                        }
                        css={styledMintedHeader}
                        sortKey="MINTED"
                      >
                        MINTED
                      </HeaderCellSort>
                      <HeaderCellSort
                        hide={
                          viewPort <= 780
                            ? !hiddenColumns.includes("BURNED")
                            : ""
                        }
                        css={styledBurnedHeader}
                        sortKey="BURNED"
                      >
                        BURNED
                      </HeaderCellSort>
                      <HeaderCellSort
                        hide={
                          viewPort <= 1024
                            ? !hiddenColumns.includes("MINTDATE")
                            : ""
                        }
                        css={styledMintDateHeader}
                        sortKey="MINTDATE"
                      >
                        MT DATE
                      </HeaderCellSort>
                      <HeaderCellSort
                        hide={
                          viewPort <= 620
                            ? !hiddenColumns.includes("MINTPRICE")
                            : ""
                        }
                        css={styledMintPriceHeader}
                        sortKey="MINTPRICE"
                      >
                        MT PRICE
                      </HeaderCellSort>
                      <HeaderCell
                        hide={
                          viewPort <= 780
                            ? !hiddenColumns.includes("SEASON")
                            : ""
                        }
                        css={styledHeader}
                        style={{
                          textAlign: "center",
                        }}
                      >
                        SEASON
                      </HeaderCell>
                      <HeaderCell
                        hide={
                          viewPort <= 1300
                            ? !hiddenColumns.includes("ARTIST")
                            : ""
                        }
                        css={styledHeader}
                        style={{
                          paddingLeft: 10,
                        }}
                      >
                        ARTIST
                      </HeaderCell>
                    </HeaderRow>
                  </Header>
                  <Body>
                    {blankoList.map((item, rank) => (
                      <Row key={item.rank} item={item}>
                        <Cell
                          css={styledCell}
                          style={{
                            paddingRight: 0,
                            height: 54,
                            color: "#666b7c",
                            textAlign: "center",
                          }}
                        >
                          {item.rank}
                        </Cell>
                        <Cell
                          css={styledCell}
                          style={{
                            height: 54,
                            textAlign: "center",
                          }}
                        >
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
                          css={styledCell}
                          style={{
                            paddingLeft: 0,
                          }}
                        >
                          <Name className={styles.blankoName}>{item.name}</Name>
                          <Minting
                            className={
                              item.minting == true ? styles.mintingIcon : ""
                            }
                            minting={item.minting}
                            withdrawable={item.withdrawable}
                          ></Minting>
                          <span
                            className={
                              item.withdrawable == true
                                ? styles.withdrawableIcon
                                : ""
                            }
                          >
                            {item.withdrawable == true ? "⬘" : ""}
                          </span>
                          <Tag className={styles.blankoTag} tag={item.tag}>
                            {item.tag}
                          </Tag>
                        </Cell>
                        <Cell
                          hide={
                            viewPort <= 620
                              ? !hiddenColumns.includes("MINTED")
                              : ""
                          }
                          css={styledCell}
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
                          hide={
                            viewPort <= 780
                              ? !hiddenColumns.includes("BURNED")
                              : ""
                          }
                          css={styledCell}
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
                          hide={
                            viewPort <= 1024
                              ? !hiddenColumns.includes("MINTDATE")
                              : ""
                          }
                          css={styledCell}
                          style={{
                            textAlign: "right",
                          }}
                        >
                          {new Date(item.mintDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </Cell>
                        <Cell
                          hide={
                            viewPort <= 620
                              ? !hiddenColumns.includes("MINTPRICE")
                              : ""
                          }
                          css={styledCell}
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
                          hide={
                            viewPort <= 780
                              ? !hiddenColumns.includes("SEASON")
                              : ""
                          }
                          css={styledCell}
                          style={{
                            textAlign: "center",
                          }}
                        >
                          {item.season}
                        </Cell>
                        <Cell
                          hide={
                            viewPort <= 1300
                              ? !hiddenColumns.includes("ARTIST")
                              : ""
                          }
                          css={styledCell}
                        >
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
            <Footer />
          </>
        )}
      </div>
    </div>
  );
}
