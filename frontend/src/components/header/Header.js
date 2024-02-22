import React, { useState } from "react";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
import { Dialog, IconButton } from "@mui/material";
import Login from "../login/Login";
import Register from "../register/Register";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
const drawerWidth = 300;

function Header(props) {
  const navigate = useNavigate();
  const { window: screen } = props;
  const container =
    screen !== undefined ? () => screen().document.body : undefined;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const token = localStorage.getItem("token");
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleClickOpen = (buttonType) => {
    if (buttonType === "login") {
      setLoginOpen(true);
    } else {
      setRegisterOpen(true);
    }
  };
  const handleClose = () => {
    setLoginOpen(false);
    setRegisterOpen(false);
  };

  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        height: "100%",
        padding: "2rem",
        // color: theme.palette.primary.dark,
      }}
    >
      <Box
        component="div"
        sx={{
          // flexGrow: 1,
          display: { xs: "block", sm: "none" },
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        <h2 onClick={() => navigate("/")} className={styles.hero}>
          Events Manager
        </h2>
      </Box>
      <Divider />
      <List>
        <div className={styles.headerButtonsMobile}>
          {token ? (
            <>
              <h3 onClick={() => navigate("/profile")}>Profile</h3>
              <h3 onClick={() => navigate("/myEvents")}>My Events</h3>
              <h3 onClick={() => handleLogOut()}>LogOut</h3>
            </>
          ) : (
            <>
              <h3 onClick={() => handleClickOpen("login")}>Login</h3>
              <h3 onClick={() => handleClickOpen("register")}>Register</h3>
            </>
          )}
        </div>
      </List>
    </Box>
  );

  return (
    <>
      <nav className={styles.header}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <div>
          <h1 onClick={() => navigate("/")} className={styles.hero}>
            Events Manager
          </h1>
        </div>

        <div className={styles.headerButtons}>
          {token ? (
            <>
              <h1 onClick={() => navigate("/profile")}>Profile</h1>
              <h1 onClick={() => navigate("/myEvents")}>My Events</h1>
              <h1 onClick={() => handleLogOut()}>LogOut</h1>
            </>
          ) : (
            <>
              <h1 onClick={() => handleClickOpen("login")}>Login</h1>
              <h1 onClick={() => handleClickOpen("register")}>Register</h1>
            </>
          )}
        </div>
      </nav>
      <nav>
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
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      <Dialog open={loginOpen} onClose={handleClose}>
        <Login handleClose={handleClose} />
      </Dialog>
      <Dialog open={registerOpen} onClose={handleClose}>
        <Register handleClose={handleClose} />
      </Dialog>
    </>
  );
}

export default Header;
