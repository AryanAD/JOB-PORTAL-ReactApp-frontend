import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Rating,
  Tooltip,
  Typography,
  styled,
  tooltipClasses,
} from "@mui/material";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import { Link } from "react-router-dom";
import Footer from "../../layout/Footer";
import Chip from "@mui/material-next/Chip";
import {
  AddRounded,
  AttachMoneyRounded,
  CalendarMonthRounded,
  HomeRounded,
  InventoryRounded,
  LocationOnRounded,
  PersonRounded,
  StarRounded,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import UserApplyJobModal from "./UserApplyJobModal";
import { apiText } from "../../global/API";
import UserRateVendorModal from "./UserRateVendorModal";
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

const UserJobs = () => {
  const [jobData, setJobData] = useState([]);
  const [rateModalId, setRateModalId] = useState("");
  const [applyJobId, setApplyJobId] = useState("");
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchData = async () => {
    try {
      const response = await apiText.get(`/user/jobs`);
      setJobData(response.data.jobs);
      console.log(response.data.jobs, "job data");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(jobData[1].postedBy.reviews[0].rating);

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
  const displayedJobs = jobData.slice(startIndex, endIndex);

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
            disabled={endIndex >= jobData.length}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <GrFormNextLink />
          </IconButton>
        </Box>

        <UserRateVendorModal
          modalOpen={isRateModalOpen}
          modalClose={closeRateModal}
          fetchJobs={fetchData}
          rateModalId={rateModalId}
        />
        <UserApplyJobModal
          modalOpen={isApplyModalOpen}
          modalClose={closeApplyModal}
          jobId={applyJobId}
          updatedJobs={fetchData}
        />
      </Box>
      <Footer />
    </>
  );
};

export default UserJobs;
