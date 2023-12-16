import { HomeRounded } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Chip from "@mui/material-next/Chip";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiText } from "../../global/API";

const UserUserProfileViewable = () => {
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
  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
            mx: 3,
            mb: 1,
            flexGrow: 2,
          }}
        >
          <Typography sx={{ fontFamily: "monospace" }} variant="h3">
            Profile Details
          </Typography>
          <Link to="/user">
            <Button
              sx={{
                "&:hover": {
                  bgcolor: "#1976D2",
                  color: "white",
                },
              }}
              variant="outlined"
              size="large"
              startIcon={<HomeRounded />}
            >
              Home
            </Button>
          </Link>
        </Box>
        <Divider variant="inset" sx={{ bgcolor: "#1976D2" }} />
        <Divider variant="inset" sx={{ bgcolor: "#1976D2" }} />
        <Divider variant="inset" sx={{ bgcolor: "#1976D2" }} />
        <Divider variant="inset" sx={{ bgcolor: "#1976D2" }} />
        <Box
          sx={{
            width: "100%",
            py: 5,
            px: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            variant="circular"
            alt={profileData?.name}
            src={profileData?.image}
            sx={{
              width: 200,
              height: 200,
              border: "2px solid gray",
              mb: 3,
            }}
          />
          <Typography variant="body2" color={"gray"} fontFamily={"monospace"}>
            Status:
          </Typography>
          <Chip
            size="medium"
            color="success"
            sx={{
              fontFamily: "monospace",
              letterSpacing: 4,
              fontSize: 20,
              width: 100,
            }}
            label={profileData?.role}
          />
          <Grid sx={{ mt: 4 }} container spacing={3}>
            <Grid item sm={6}>
              <Card>
                <CardContent>
                  <Typography
                    variant="body2"
                    color={"gray"}
                    fontFamily={"monospace"}
                  >
                    Full Name:
                  </Typography>
                  <Typography
                    variant="h5"
                    maxWidth={200}
                    sx={{
                      fontFamily: "monospace",
                      fontSize: "22px",
                      letterSpacing: 2,
                    }}
                  >
                    {profileData?.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item sm={6}>
              <Card>
                <CardContent>
                  <Typography
                    variant="body2"
                    color={"gray"}
                    fontFamily={"monospace"}
                  >
                    Email:
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "monospace",
                      fontSize: "22px",
                      letterSpacing: 2,
                    }}
                  >
                    {profileData?.email}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default UserUserProfileViewable;
