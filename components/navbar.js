import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";

import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../public/blankodrops.svg";
import styles from "../styles/navbar.module.css";

function DrawerAppBar(props) {
  const [drawerWidth, setDrawerWidth] = useState(0);

  const handleWindowResize = () => {
    setDrawerWidth(window.innerWidth);
  };

  useEffect(() => {
    // component is mounted and window is available
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    // unsubscribe from the event on component unmount
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const { windowViewPort } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const clearSessionStorage = (event) => {
    sessionStorage.removeItem("primaryFilter");
    sessionStorage.removeItem("pageNumber");
  };

  const drawer = (
    <Box className={styles.drawerContainer} sx={{ textAlign: "left" }}>
      <Typography
        variant="h6"
        sx={{
          padding: "14px 20px 12px 18px",
          backgroundColor: "#1976d2",
          display: "grid",
          gridTemplateColumns: "40px 1fr",
          columnGap: "20px",

          span: {
            marginTop: "2px !important",
          },
        }}
      >
        <IconButton
          color="inherit"
          aria-label="close drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            padding: "4px 0",
            marginLeft: 0,
            border: "2px solid rgba(255,255,255, .15)",
            borderRadius: "6px",
          }}
        >
          <CloseIcon />
        </IconButton>
        {/* <Image
          src={`/${logo.src}`}
          layout="fixed"
          width="126px"
          height="26px"
          alt="Logo of BlankosDrop"
        /> */}
        <Logo style={{ width: "126px", height: "26px", marginTop: "2px" }} />
      </Typography>
      <Divider sx={{ borderColor: "transparent" }} />
      <List>
        <Link href="/">
          <a>
            <ListItem disablePadding>
              <ListItemButton
                onClick={clearSessionStorage}
                sx={{
                  textAlign: "left",
                  margin: "0 20px",
                  padding: "8px 0 14px 0",
                  borderBottom: "1px solid #222531",
                }}
              >
                <ListItemText className={styles.drawerItem}>
                  Blankos
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </a>
        </Link>
        <Link href="/accessories">
          <a>
            <ListItem disablePadding>
              <ListItemButton
                onClick={clearSessionStorage}
                sx={{
                  textAlign: "left",
                  margin: "0 20px",
                  padding: "14px 0",
                  borderBottom: "1px solid #222531",
                }}
              >
                <ListItemText className={styles.drawerItem}>
                  Accessories
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </a>
        </Link>
      </List>
    </Box>
  );

  const container =
    windowViewPort !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar className={styles.navContainer}>
          <div className={styles.openDrawer}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                padding: "4px 0",
                marginLeft: 0,
                border: "2px solid rgba(255,255,255, .15)",
                borderRadius: "6px",
                display: { sm: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
            {/* <Image
              src={`/${logo.src}`}
              layout="fixed"
              width="126px"
              height="26px"
              alt="Logo of BlankosDrop"
            /> */}
            <Logo
              style={{ width: "126px", height: "26px", marginTop: "2px" }}
            />
          </div>

          <Box
            sx={{
              // flexGrow: 1,
              display: { xs: "none", sm: "block" },
              marginLeft: "110px",
            }}
          >
            <Link href="/">
              <a>
                <Button
                  onClick={clearSessionStorage}
                  sx={{
                    color: "#fff",
                    fontSize: "14px",
                    textTransform: "capitalize",
                    paddingTop: "10px",
                  }}
                >
                  Blankos
                </Button>
              </a>
            </Link>
            <Link href="/accessories">
              <a>
                <Button
                  onClick={clearSessionStorage}
                  sx={{
                    color: "#fff",
                    fontSize: "14px",
                    textTransform: "capitalize",
                    paddingTop: "10px",
                  }}
                >
                  Accessories
                </Button>
              </a>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#17171a",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  windowViewPort: PropTypes.func,
};

export default DrawerAppBar;
