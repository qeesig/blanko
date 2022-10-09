import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const router = useRouter();
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

  const clearSessionStorage = (e) => {
    sessionStorage.removeItem("passBlanko");
    sessionStorage.removeItem("passAccessory");
    sessionStorage.removeItem("seasonBlanko");
    sessionStorage.removeItem("seasonAccessory");
    sessionStorage.removeItem("pageNumber");
  };

  const drawer = (
    <Box className={styles.drawerContainer} sx={{ textAlign: "left" }}>
      <Typography variant="h6">
        <IconButton
          color="inherit"
          aria-label="close drawer"
          edge="start"
          onClick={handleDrawerToggle}
        >
          <CloseIcon />
        </IconButton>
        <Link href="/" passHref>
          <a onClick={clearSessionStorage}>
            <Logo />
          </a>
        </Link>
      </Typography>
      <Divider sx={{ borderColor: "transparent" }} />
      <List>
        <Link href="/" passHref>
          <a>
            <ListItem disablePadding>
              <ListItemButton onClick={clearSessionStorage}>
                <ListItemText
                  className={
                    router.pathname == "/"
                      ? styles.drawerActiveLink
                      : styles.drawerInActiveLink
                  }
                >
                  Blankos
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </a>
        </Link>
        <Link href="/accessories" passHref>
          <a>
            <ListItem disablePadding>
              <ListItemButton onClick={clearSessionStorage}>
                <ListItemText
                  className={
                    router.pathname == "/accessories"
                      ? styles.drawerActiveLink
                      : styles.drawerInActiveLink
                  }
                >
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
    <Box className={styles.navbar}>
      <AppBar component="nav">
        <Toolbar className={styles.navContainer}>
          <div className={styles.openDrawer}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Link href="/" passHref>
              <a onClick={clearSessionStorage}>
                <Logo />
              </a>
            </Link>
          </div>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link href="/" passHref>
              <a
                className={
                  router.pathname == "/"
                    ? styles.activeLink
                    : styles.inActiveLink
                }
              >
                <Button disableRipple onClick={clearSessionStorage}>
                  Blankos
                </Button>
              </a>
            </Link>
            <Link href="/accessories" passHref>
              <a
                className={
                  router.pathname == "/accessories"
                    ? styles.activeLink
                    : styles.inActiveLink
                }
              >
                <Button disableRipple onClick={clearSessionStorage}>
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
