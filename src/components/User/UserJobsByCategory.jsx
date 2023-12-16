import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiText } from "../../global/API";
import Footer from "../../layout/Footer";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Rating,
  Tooltip,
  Typography,
  styled,
  tooltipClasses,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  AddRounded,
  AttachMoneyRounded,
  CalendarMonthRounded,
  HomeRounded,
  InventoryRounded,
  LocationOnRounded,
  OpenInNewRounded,
  PersonRounded,
  StarRounded,
} from "@mui/icons-material";
import UserRateVendorModal from "./UserRateVendorModal";
import UserApplyJobModal from "./UserApplyJobModal";
import Chip from "@mui/material-next/Chip";
import Image from "../User/assets/page-not-found.png";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";

const limitLength = (text, maxLength) => {
  const words = text.split(" ");
  if (words.length <= maxLength) {
    return text;
  }
  const truncatedText = words.slice(0, maxLength).join(" ");
  return `${truncatedText}...`;
};

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

const UserJobsByCategory = () => {
  const { id } = useParams();
  const [rateModalId, setRateModalId] = useState("");
  const [applyJobId, setApplyJobId] = useState("");
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [jobsData, setJobsData] = useState([]);

  const fetchJobs = useCallback(async () => {
    try {
      const response = await apiText.get(`/user/jobs/category/${id}`);
      setJobsData(response.data.jobs);
      console.log(response.data.jobs, "single job Data");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }, [id]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const openApplyModal = (Id) => {
    setApplyJobId(Id);
    console.log(applyJobId, "apply job ID");
    setIsApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
  };

  const openRateModal = (Id) => {
    setRateModalId(Id);
    console.log(rateModalId, "view job ID");
    setIsRateModalOpen(true);
  };

  const closeRateModal = () => {
    setIsRateModalOpen(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate the start and end index of the jobs to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Extract the jobs to display for the current page
  const displayedJobs = jobsData.slice(startIndex, endIndex);

  return (
    <>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "7%",
              height: "100%",
              mx: 10,
            }}
          >
            <Link to="/user">
              <Button
                fullWidth
                startIcon={<HomeRounded />}
                // variant="outlined"
                sx={{
                  "&:hover": { color: "1976d2", bgcolor: "#c2d7fe" },
                }}
              >
                Home
              </Button>
            </Link>
          </Box>
        </Box>
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "85vw",
            margin: 5,
          }}
          container
          spacing={4}
        >
          {displayedJobs.length === 0 ? (
            <>
              <Box
                sx={{
                  backgroundImage: `url(${Image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  width: "100vw",
                  height: "60vh",
                }}
              />
              <Link
                to="/user"
                style={{
                  textDecoration: "none",
                  color: "#1976D2",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "22px",
                    textDecoration: "underline",
                    "&:hover": {
                      textDecoration: "none",
                      color: "black",
                      scale: "1.04",
                      transition: "all 300ms",
                    },
                  }}
                >
                  Back to Home
                </Typography>
              </Link>
            </>
          ) : (
            displayedJobs?.map((data, i) => {
              console.log(data);
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
                          <Box sx={{ pt: 1 }}>
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
                        >
                          <Link to={`/user/single-job/${data._id}`}>
                            <IconButton
                              sx={{
                                "&:hover": {
                                  bgcolor: "#1976d2",
                                  color: "white",
                                },
                              }}
                              color="primary"
                            >
                              <CustomToolTip title="View" placement="top">
                                <OpenInNewRounded />
                              </CustomToolTip>
                            </IconButton>
                          </Link>
                          <IconButton
                            onClick={() => openApplyModal(data._id)}
                            sx={{
                              "&:hover": { bgcolor: "#2e7d32", color: "white" },
                            }}
                            color="success"
                          >
                            <CustomToolTip title="Apply" placement="right">
                              <AddRounded />
                            </CustomToolTip>
                          </IconButton>
                          <IconButton
                            onClick={() => openRateModal(data.postedBy._id)}
                            sx={{
                              "&:hover": { bgcolor: "#ec7a1c", color: "white" },
                            }}
                            color="warning"
                          >
                            <CustomToolTip title="Rate" placement="bottom">
                              <StarRounded />
                            </CustomToolTip>
                          </IconButton>
                        </Box>
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
            disabled={endIndex >= jobsData.length}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <GrFormNextLink />
          </IconButton>
        </Box>

        <UserRateVendorModal
          modalOpen={isRateModalOpen}
          modalClose={closeRateModal}
          fetchJobs={fetchJobs}
          rateModalId={rateModalId}
        />
        <UserApplyJobModal
          modalOpen={isApplyModalOpen}
          modalClose={closeApplyModal}
          jobId={applyJobId}
          updatedJobs={fetchJobs}
        />
      </Box>
      <Footer />
    </>
  );
};

export default UserJobsByCategory;
