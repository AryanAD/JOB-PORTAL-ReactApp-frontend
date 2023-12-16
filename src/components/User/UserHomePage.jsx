import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Card, AspectRatio } from "@mui/joy";
import { Link } from "react-router-dom";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import VendorImg from "./assets/vendor.png";
import Banner from "./assets/Advertising.png";
import Footer from "../../layout/Footer.jsx";
import { useCallback, useEffect, useState } from "react";
import { apiText } from "../../global/API.jsx";

const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const UserHomePage = () => {
  const [categoryData, setCategoryData] = useState([]);

  const fetchCategory = useCallback(async () => {
    try {
      const response = await apiText.get(`admin/category`);
      setCategoryData(response.data.categories);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }, []);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return (
    <>
      <Box
        sx={{
          bgcolor: "#fafafa",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: "1040px",
            width: "1920px",
            flexGrow: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundImage: `url(${Banner})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Box
            sx={{
              height: "400px",
              width: "1120px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Link to="/user/jobs">
              <Button
                fullwidth
                sx={{
                  "&:hover": { bgcolor: "#277aff", color: "white" },
                  scale: "2",
                }}
                size="large"
                variant="outlined"
              >
                Find a Job
              </Button>
            </Link>
          </Box>
          <Box
            sx={{
              height: "1040px",
              width: "800px",
            }}
          ></Box>
        </Box>
        <Divider
          sx={{
            mt: 4,
            mb: 8,
          }}
          variant="inset"
          textAlign="left"
        >
          <Typography
            sx={{
              color: "black",
              fontFamily: "nunito",
              letterSpacing: "6px",
              marginBottom: "5px",
              fontWeight: "bold",
              textAlign: "left",
            }}
            variant="h4"
          >
            Jobs By Catergories
          </Typography>
          <Divider variant="middle" />
          <Divider variant="middle" />
          <Divider variant="middle" />
          <Divider variant="middle" />
        </Divider>
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "80vw",
            margin: 5,
          }}
          container
          spacing={4}
        >
          {categoryData?.map((category, i) => (
            <Grid item key={i} xs={7} sm={7} md={2}>
              <Link
                to={`/user/jobs/category/${category?._id}`}
                style={{
                  textDecoration: "none",
                }}
              >
                {/* {console.log(category._id)} */}
                <Card
                  variant="outlined"
                  orientation="vertical"
                  sx={{
                    maxWidth: 225,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    "&:hover": {
                      cursor: "pointer",
                      bgcolor: "#7DB5E7",
                      boxShadow: "md",
                      borderColor: "neutral.outlinedHoverBorder",
                    },
                  }}
                >
                  <AspectRatio
                    ratio="1"
                    sx={{ width: 90, border: "1px solid #7DB5E7" }}
                  >
                    <img
                      src={category?.image}
                      loading="lazy"
                      alt={category?.category}
                    />
                  </AspectRatio>

                  <Typography
                    variant="h5"
                    component="h1"
                    color="gray"
                    fontFamily="monospace"
                  >
                    {category?.category}
                  </Typography>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
        <Link to="/user/jobs">
          <Button
            sx={{
              mt: 10,
              scale: "2",
              bgcolor: "#7ed957",
              "&:hover": { bgcolor: "#00bf63" },
            }}
            size="small"
            variant="contained"
          >
            More Jobs
          </Button>
        </Link>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 10,
            width: "1920px",
            height: "620px",
            backgroundImage: `url(${VendorImg})`,
          }}
        >
          <Box sx={{ width: "900px", height: "620px" }} />
          <Box
            sx={{
              height: "500px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  color: "orangered",
                  fontFamily: "nunito",
                  letterSpacing: "6px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                variant="h1"
              >
                Need a Freelancer?
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="h4"
                sx={{
                  color: "black",
                  fontFamily: "nunito",
                  letterSpacing: "6px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Become a Vendor Today!
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link to="/user/new-vendor">
                <Button
                  sx={{ fontSize: 28 }}
                  color="secondary"
                  variant="contained"
                >
                  Apply for Vendor
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
        <Link to="#" onClick={goToTop}>
          <IconButton
            sx={{
              width: 40,
              height: 40,
              right: 30,
              bottom: 30,
              position: "fixed",
              zIndex: 1000,
              bgcolor: "transparent",
            }}
          >
            <ArrowUpwardRoundedIcon
              sx={{
                color: "black",
              }}
            />
          </IconButton>
        </Link>
        <Footer />
      </Box>
    </>
  );
};

export default UserHomePage;
