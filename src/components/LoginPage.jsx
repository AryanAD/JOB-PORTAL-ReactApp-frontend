import {
  LockPersonRounded,
  EmailRounded,
  LockRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Image from "./assets/job.png";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        style={{
          textDecoration: "none",
          color: "#555",
        }}
        to="/"
      >
        React Job Portal
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const defaultTheme = createTheme();

const LoginPage = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/api/user/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        const token = response.data.token;
        const role = response.data.role;

        localStorage.setItem("role", role);
        localStorage.setItem("token", token);

        if (role === "admin") {
          nav("/admin");
          toast.success(`Logged in as ${response.data.emailExists.name}`);
        } else if (role === "vendor") {
          nav("/vendor");
          toast.success(`Logged in as ${response.data.emailExists.name}`);
        } else if (role === "user") {
          nav("/user");
          toast.success(`Logged in as ${response.data.emailExists.name}`);
        } else {
          nav("/login");
          toast.error(`Email or Password incorrect`);
        }

        nav(`/${role.toLowerCase()}`);
      })
      .catch((error) => {
        console.error("Login failed: ", error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              variant="rounded"
              sx={{ m: 1, bgcolor: "#17e717", width: 50, height: 50 }}
            >
              <LockPersonRounded />
            </Avatar>
            <Typography component="h1" variant="h4">
              Log In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRounded />
                    </InputAdornment>
                  ),
                }}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRounded />
                    </InputAdornment>
                  ),
                }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "indianred",
                      fontWeight: "bold",
                    }}
                    to="/signup"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginPage;
