import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  Paper,
  createTheme,
  InputAdornment,
} from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import { PersonRounded } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import Image from "./assets/job.png";
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
      <Link style={{ textDecoration: "none", color: "#555" }} to="/">
        React Job Portal
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const SignupPage = () => {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/api/user/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        const token = response.data.token;

        localStorage.setItem("token", token);
        toast.success("Registered as New User");
        nav("/login");
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
              <LockPersonIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Sign Up
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
                      <PersonRounded />
                    </InputAdornment>
                  ),
                }}
                type="text"
                margin="normal"
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="off"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                type="email"
                margin="normal"
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
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
                margin="normal"
                fullWidth
                name="password"
                label="Confirm Password"
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
                Sign Up
              </Button>

              <Grid container>
                <Grid item>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "indianred",
                      fontWeight: "bold",
                    }}
                    to="/login"
                  >
                    {"↼ Back to Log In"}
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

export default SignupPage;
