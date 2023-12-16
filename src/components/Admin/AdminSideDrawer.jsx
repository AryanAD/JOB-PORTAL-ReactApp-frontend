/* eslint-disable react/prop-types */
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HailRoundedIcon from "@mui/icons-material/HailRounded";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TableChartRoundedIcon from "@mui/icons-material/TableChartRounded";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import React from "react";
import { Button, Tooltip, tooltipClasses } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HomeRounded } from "@mui/icons-material";

const CustomToolTip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "gray",
    color: "white",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(18),
    border: "1px solid #dadde9",
    borderRadius: "7px",
  },
}));

const LogoutTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "crimson",
    color: "white",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(18),
    border: "1px solid #dadde9",
    borderRadius: "7px",
  },
}));

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AdminSideDrawer = ({ anotherItem }) => {
  const nav = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    nav("/");
    toast.error("Logged out Successfully");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Link style={{ textDecoration: "none", color: "white" }} to="/admin">
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                fontSize: "28px",
                fontWeight: "bold",
              }}
              variant="h6"
              noWrap
              component="div"
            >
              <HailRoundedIcon />
              React Job Portal
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <Link
              style={{
                color: "#272727	",
                textDecoration: "none",
              }}
              to={"/admin"}
            >
              <ListItemButton>
                <CustomToolTip title="HomePage" placement="right">
                  <ListItemIcon>
                    <HomeRounded />
                  </ListItemIcon>
                </CustomToolTip>
                <ListItemText primary="HomePage" />
              </ListItemButton>
            </Link>
            <Link
              style={{
                color: "#272727	",
                textDecoration: "none",
              }}
              to={"/admin/categories"}
            >
              <ListItemButton>
                <CustomToolTip title="Categories" placement="right">
                  <ListItemIcon>
                    <TableChartRoundedIcon />
                  </ListItemIcon>
                </CustomToolTip>
                <ListItemText primary="Categories" />
              </ListItemButton>
            </Link>
            <Link
              style={{
                color: "#272727	",
                textDecoration: "none",
              }}
              to={"/admin/banners"}
            >
              <ListItemButton>
                <CustomToolTip title="Banners" placement="right">
                  <ListItemIcon>
                    <InsertPhotoRoundedIcon />
                  </ListItemIcon>
                </CustomToolTip>
                <ListItemText primary="Banners" />
              </ListItemButton>
            </Link>
          </ListItem>
          <Divider />
        </List>

        {open === false ? (
          <ListItem
            disablePadding
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              alignItems: "flex-start",
            }}
          >
            <ListItemButton
              sx={{
                "&:hover": {
                  backgroundColor: "#fff",
                  cursor: "default",
                },
              }}
              onClick={handleLogout}
            >
              <LogoutTooltip title="Log Out" placement="right">
                <ListItemIcon>
                  <LogoutRoundedIcon
                    sx={{
                      fontSize: "30px",
                      color: "red",
                      "&:hover": {
                        color: "black",
                        cursor: "pointer",
                      },
                    }}
                  />
                </ListItemIcon>
              </LogoutTooltip>
            </ListItemButton>
          </ListItem>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "end",
              height: "100%",
              width: "100%",
              padding: "20px auto",
            }}
          >
            <Button
              size="large"
              fullWidth
              color="error"
              variant="contained"
              onClick={handleLogout}
            >
              LOG OUT
            </Button>
          </Box>
        )}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {anotherItem}
      </Box>
    </Box>
  );
};

export default AdminSideDrawer;
