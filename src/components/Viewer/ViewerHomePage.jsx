import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Image from "./assets/job_banner.jpg";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { useCallback, useEffect, useState } from "react";
import { apiText } from "../../global/API";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import {
  AttachMoneyRounded,
  CalendarMonthRounded,
  InventoryRounded,
  LocationOnRounded,
  PersonRounded,
} from "@mui/icons-material";
import Chip from "@mui/material-next/Chip";

const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const limitLength = (text, maxLength) => {
  const words = text.split(" ");
  if (words.length <= maxLength) {
    return text;
  }
  const truncatedText = words.slice(0, maxLength).join(" ");
  return `${truncatedText}...`;
};

const ViewerHomePage = () => {
  const [jobData, setJobData] = useState([]);
  // const [bannerData, setBannerData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // const fetchBanner = useCallback(async () => {
  //   try {
  //     const res = await apiText.get("/admin/banner");
  //     setBannerData(res.data.banners);
  //     console.log(res.data.banners);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  const fetchData = useCallback(async () => {
    try {
      const response = await apiText.get(`/user/jobs`);
      setJobData(response.data.jobs);
      console.log(response.data.jobs, "job data");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }, []);

  useEffect(() => {
    // fetchBanner();
    fetchData();
  }, [
    // fetchBanner,
    fetchData,
  ]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate the start and end index of the jobs to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Extract the jobs to display for the current page
  const displayedJobs = jobData.slice(startIndex, endIndex);

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          margin: 0,
          padding: "80px 0 60px 0",
          // pt: 8,
          // pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            fontFamily="monospace"
            fontWeight="bolder"
            fontSize="60px"
            component="h1"
            variant="h2"
            align="center"
            gutterBottom
          >
            React Job Portal
          </Typography>
          <Typography
            variant="h5"
            align="center"
            fontFamily="monospace"
            color="black"
            paragraph
          >
            Apply for a Job through our Job Portal. We provide a variety of
            feeelance options for all the freelancers. Our main job categories
            include Tech, Photography, Music Production and many more...
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={4}
            justifyContent="center"
          >
            <Link to="/login">
              <Button color="primary" size="large" variant="contained">
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button color="primary" size="large" variant="contained">
                Sign Up
              </Button>
            </Link>
          </Stack>
        </Container>
      </Box>
      <Box
        sx={{
          pb: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxHeight: "100%",
        }}
      >
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
            Jobs Available Today
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
            maxWidth: "85vw",
            margin: 5,
            mb: 0,
          }}
          container
          spacing={4}
        >
          {displayedJobs.length === 0 ? (
            <Box
              sx={{
                height: "63vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress size={50} />
              <Typography variant="h4">Loading...</Typography>
            </Box>
          ) : (
            displayedJobs?.map((data, i) => {
              let rating = data.postedBy.reviews.reduce((total, data) => {
                const avgRating = parseInt(data.rating);
                console.log(total);
                if (!isNaN(avgRating)) return total + avgRating;
              }, 0);

              console.log(rating);
              rating = rating / data?.postedBy?.reviews?.length;
              console.log(rating);

              return (
                <Grid item key={i} xs={7} sm={3} md={6}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      boxShadow: "20px 20px 20px rgba(150, 150, 150, 0.1)",
                      border: "1px solid whitesmoke",
                      borderRadius: 3,
                    }}
                  >
                    <CardContent
                      sx={{
                        gap: 2,
                        flexGrow: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexGrow: 1,
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "space-between",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <Typography
                              gutterBottom={false}
                              variant="h4"
                              sx={{
                                mb: 0,
                                pb: 0,
                                fontWeight: "bolder",
                                color: "#444",
                                fontFamily: "monospace",
                              }}
                              component="h2"
                            >
                              {data.title}
                            </Typography>
                            <Rating
                              precision={0.5}
                              key={i}
                              name="simple-controlled"
                              value={rating}
                              readOnly
                              size="small"
                            />
                          </Box>
                          <Divider sx={{ bgcolor: "#1976d2" }} />
                          <Divider sx={{ bgcolor: "#1976d2" }} />
                          <Divider sx={{ bgcolor: "#1976d2" }} />
                          <Box
                            sx={{
                              pt: 1,
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="body2">
                              {limitLength(data.description, 23)}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              gap: 2,
                              pt: 1,
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-evenly",
                              alignItems: "center",
                            }}
                          >
                            <Chip
                              icon={<LocationOnRounded />}
                              color="tertiary"
                              disabled={false}
                              size="small"
                              variant="filled"
                              label={data.location}
                            />
                            <Chip
                              icon={<AttachMoneyRounded />}
                              color="success"
                              disabled={false}
                              size="small"
                              variant="filled"
                              label={data.salary}
                            />
                            <Chip
                              icon={<CalendarMonthRounded />}
                              color="error"
                              disabled={false}
                              size="small"
                              variant="filled"
                              label={data.deadline.slice(0, 10)}
                            />
                            <Chip
                              icon={<PersonRounded />}
                              color="warning"
                              disabled={false}
                              size="small"
                              variant="filled"
                              label={data.postedBy.name}
                            />
                            <Chip
                              icon={<InventoryRounded />}
                              color="info"
                              disabled={false}
                              size="small"
                              variant="filled"
                              label={data.category.category}
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        ></Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          )}
        </Grid>

        {/* PAGINATION */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
          }}
        >
          <IconButton
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <GrFormPreviousLink />
          </IconButton>
          <IconButton disabled sx={{ marginX: 2, width: 50, height: 50 }}>
            {currentPage}
          </IconButton>
          <IconButton
            disabled={endIndex >= jobData.length}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <GrFormNextLink />
          </IconButton>
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
    </>
  );
};
export default ViewerHomePage;
