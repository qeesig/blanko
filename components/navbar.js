import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

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

import styles from "../styles/navbar.module.css";

import Image from "next/image";
import logo from "../public/blankodrops.png";

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
        <Image src={logo} layout="fixed" alt="Logo of BlankosDrop" />
      </Typography>
      <Divider sx={{ borderColor: "transparent" }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "left", paddingTop: "8px", paddingBottom: 0 }}
          >
            <ListItemText className={styles.drawerItem}>Blankos</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "left", paddingTop: "8px", paddingBottom: 0 }}
          >
            <ListItemText className={styles.drawerItem}>
              Accessories
            </ListItemText>
          </ListItemButton>
        </ListItem>
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
            <Image src={logo} layout="fixed" alt="Logo of BlankosDrop" />
          </div>

          <Box
            sx={{
              flexGrow: 2,
              display: { xs: "none", sm: "block" },
              marginLeft: "110px",
            }}
          >
            <Button
              sx={{
                color: "#fff",
                fontSize: "14px",
                textTransform: "capitalize",
                paddingTop: "10px",
              }}
            >
              Blankos
            </Button>
            <Button
              sx={{
                color: "#fff",
                fontSize: "14px",
                textTransform: "capitalize",
                paddingTop: "10px",
              }}
            >
              Accessories
            </Button>
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
