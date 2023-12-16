/* eslint-disable react/prop-types */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import HailRoundedIcon from "@mui/icons-material/HailRounded";
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { LogoutRounded, MenuRounded } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiText } from "../../global/API";

const UserNavBar = ({ anotherItem }) => {
  const nav = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [profileData, setProfileData] = useState([]);

  const fetchProfileData = useCallback(async () => {
    try {
      let res = await apiText.get("user/profile");
      setProfileData(res.data.user);
      console.log(res.data.user, "inside Profile");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    nav("/");
    toast.error("Logged out Successfully");
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <HailRoundedIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1, fontSize: 40 }}
            />
            <Link to="/user" style={{ textDecoration: "none", color: "white" }}>
              <Typography
                variant="h4"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "poppins",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                React Job Portal
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuRounded />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              ></Menu>
            </Box>
            <HailRoundedIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Link to="/user" style={{ textDecoration: "none", color: "white" }}>
              <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                React Job Portal
              </Typography>
            </Link>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={profileData?.name} src={profileData?.image} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px", padding: 0 }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <Link
                    to="/user/profile"
                    onClick={handleCloseUserMenu}
                    style={{
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    <Typography textAlign="center">My Profile</Typography>
                  </Link>
                </MenuItem>

                <MenuItem
                  sx={{
                    bgcolor: "red",
                    color: "white",
                    fontWeight: "bolder",
                    gap: 1,
                    "&:hover": { color: "red", bgcolor: "#f5f5f5" },
                  }}
                  onClick={handleLogout}
                >
                  <LogoutRounded />
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        style={{
          fontFamily: "tr_larabiefont",
          color: "black",
        }}
        component="main"
        sx={{ flexGrow: 1 }}
      >
        {anotherItem}
      </Box>
    </>
  );
};

export default UserNavBar;
