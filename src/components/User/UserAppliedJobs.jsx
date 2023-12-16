import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { apiText } from "../../global/API";
import Chip from "@mui/material-next/Chip";
import { FaLocationDot, FaDollarSign } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { BiCalendar } from "react-icons/bi";
import UserAppliedJobsModal from "./UserAppliedJobsModal";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";

const UserAppliedJobs = () => {
  const [jobsData, setJobsData] = useState([]);
  const [isAppliedJobModalOpen, setIsAppliedJobModalOpen] = useState(false);
  const [appliedJobId, setAppliedJobId] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const fetchJobsData = useCallback(async () => {
    try {
      let res = await apiText.get("user/appliedJobs");
      setJobsData(res.data.jobs);
      console.log(res.data.jobs, "applied Jobs");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }, []);

  useEffect(() => {
    fetchJobsData();
  }, [fetchJobsData]);

  const openAppliedJobModal = (Id) => {
    setAppliedJobId(Id);
    console.log(appliedJobId, "view job ID");
    setIsAppliedJobModalOpen(true);
  };

  const closeAppliedJobModal = () => {
    setIsAppliedJobModalOpen(false);
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          overflow: "hidden",
          flexGrow: 2,
          gap: 3,
        }}
      >
        <Box width={"100%"}>
          <Divider>
            <Divider>
              <Divider>
                <Typography
                  position={"relative"}
                  sx={{
                    fontFamily: "monospace",
                    color: "#1976d2",
                    fontWeight: "bold",
                  }}
                  variant="h3"
                >
                  Applied Jobs
                </Typography>
              </Divider>
            </Divider>
          </Divider>
        </Box>

        {displayedJobs?.length === 0 ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <CircularProgress size={65} />
            <Typography variant="h4" fontFamily={"monospace"} color={"gray"}>
              Loading...
            </Typography>
          </Box>
        ) : (
          displayedJobs?.map((data, i) => {
            return (
              <Card
                key={i}
                elevation="false"
                sx={{
                  width: "100%",
                  borderRadius: "15px",
                  borderLeft: "6px solid #44a4e0",
                  borderRight: "6px solid #44a4e0",
                  "&:hover": {
                    cursor: "pointer",
                    borderColor: "transparent",
                    borderRadius: "23px",
                    boxShadow: "2.5px 2.5px 5px rgba(0, 0, 0, 0.1)",
                    scale: "1.01",
                    transition: "all 0.2s",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    sx={{ fontFamily: "monospace" }}
                  >
                    {data?.jobId?.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "monospace", color: "gray", mb: 2 }}
                  >
                    {data?.jobId?.description?.slice(0, 455).concat("...")}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        width: "75%",
                        justifyContent: "space-around",
                      }}
                    >
                      <Chip
                        color="info"
                        icon={<FaLocationDot />}
                        label={data?.jobId?.location}
                      />
                      <Chip
                        color="success"
                        icon={<FaDollarSign />}
                        label={data?.jobId?.salary}
                      />
                      <Chip
                        color="error"
                        icon={<BiCalendar />}
                        label={data?.jobId?.deadline?.slice(0, 10)}
                      />
                      <Chip
                        color="primary"
                        icon={<BsFillPersonFill />}
                        label={data?.jobId?.postedBy?.name}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        width: "10%",
                        justifyContent: "space-around",
                      }}
                    >
                      <Button
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          "&:hover": {
                            bgcolor: "#44a4e0",
                            color: "white",
                          },
                        }}
                        size="small"
                        color="info"
                        variant="outlined"
                        endIcon={<FaExternalLinkAlt />}
                        onClick={() => openAppliedJobModal(data._id)}
                      >
                        View
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 2,
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
      </Box>
      <UserAppliedJobsModal
        modalOpen={isAppliedJobModalOpen}
        modalClose={closeAppliedJobModal}
        updatedJobs={fetchJobsData}
        appliedJobId={appliedJobId}
      />
    </>
  );
};

export default UserAppliedJobs;
