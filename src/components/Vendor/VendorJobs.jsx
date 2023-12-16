import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  tooltipClasses,
  styled,
  Button,
  Pagination,
} from "@mui/material";
import {
  DeleteRounded,
  AddRounded,
  OpenInNewRounded,
  LocationOnRounded,
  AttachMoneyRounded,
  CalendarMonthRounded,
  FormatListBulletedRounded,
} from "@mui/icons-material";
import VendorAddJobModal from "./VendorAddJobModal";
import { useCallback, useEffect, useState } from "react";
import Chip from "@mui/material-next/Chip";
import { apiText } from "../../global/API";
import { toast } from "react-toastify";
import VendorSingleJobModal from "./VendorSingleJobModal";

const ITEMS_PER_PAGE = 6;

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

const VendorJobs = () => {
  const [jobsData, setJobsData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSingleModalOpen, setIsSingleModalOpen] = useState(false);
  const [myCategory, setMyCategory] = useState([]);
  const [singleJobId, setSingleJobId] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useCallback(async () => {
    try {
      const response = await apiText.get("vendor/jobs");
      setJobsData(response.data.jobs);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }, []);

  console.log(jobsData, "jobs data");
  const fetchCategory = useCallback(async () => {
    try {
      const response = await apiText.get("admin/category");
      setMyCategory(response.data.categories);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }, []);

  const filteredJobs = jobsData.map((job) => {
    const category = myCategory.find(
      (category) => category._id === job.category
    );
    if (category) {
      return {
        ...job,
        categoryName: category.category,
      };
    }
    return job;
  });

  // Now, filteredJobs contains the category title for each job
  console.log(filteredJobs, "filtered jobs");

  useEffect(() => {
    fetchData();
    fetchCategory();
  }, [fetchCategory, fetchData]);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openSingleModal = (id) => {
    setSingleJobId(id);
    console.log(singleJobId, "job ID");
    setIsSingleModalOpen(true);
  };

  const closeSingleModal = () => {
    setIsSingleModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await apiText.delete(`vendor/jobs/${id}`);
      console.log(`Deleted Job with ID ${id}.`);
      toast.success("Successfully deleted Job");
      fetchData();
    } catch (error) {
      console.error(`Error deleting Job with ID ${id}.`, error);
    }
  };

  const totalItems = filteredJobs.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const visibleJobs = filteredJobs.slice(startIndex, endIndex);

  return (
    <>
      <Divider variant="inset" textAlign="left">
        <Typography
          sx={{
            color: "black",
            fontFamily: "nunito",
            letterSpacing: "6px",
            marginBottom: "5px",
            fontWeight: "bold",
            textAlign: "center",
          }}
          variant="h4"
        >
          Jobs Available Today
        </Typography>
      </Divider>
      <Box
        sx={{
          pl: 0,
          pb: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxHeight: "100%",
          gap: 4,
        }}
      >
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
          {visibleJobs?.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "65vh",
              }}
            >
              <Typography variant="h4">No Jobs Found</Typography>
            </Box>
          ) : visibleJobs === null ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "65vh",
              }}
            >
              <Typography variant="h4">No Jobs Found</Typography>
            </Box>
          ) : (
            visibleJobs?.map((jobs, i) => (
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
                          {jobs.title}
                        </Typography>
                        <Divider sx={{ bgcolor: "#1976d2" }} />
                        <Divider sx={{ bgcolor: "#1976d2" }} />
                        <Divider sx={{ bgcolor: "#1976d2" }} />
                        <Box sx={{ pt: 1 }}>
                          <Typography variant="body2">
                            {limitLength(jobs.description, 23)}
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
                            label={jobs.location}
                          />
                          <Chip
                            icon={<AttachMoneyRounded />}
                            color="success"
                            disabled={false}
                            size="small"
                            variant="filled"
                            label={jobs.salary}
                          />
                          <Chip
                            icon={<CalendarMonthRounded />}
                            color="warning"
                            disabled={false}
                            size="small"
                            variant="filled"
                            label={jobs.deadline.slice(0, 10)}
                          />

                          <Chip
                            icon={<FormatListBulletedRounded />}
                            color="tertiary"
                            disabled={false}
                            size="small"
                            variant="filled"
                            label={jobs.categoryName}
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <IconButton
                          sx={{
                            borderRadius: "50%",
                            color: "red",
                            "&:hover": { bgcolor: "#ffd8e4" },
                          }}
                          onClick={() => handleDelete(jobs._id)}
                        >
                          <CustomToolTip title="Delete" placement="right">
                            <DeleteRounded />
                          </CustomToolTip>
                        </IconButton>
                        <IconButton
                          onClick={() => openSingleModal(jobs._id)}
                          sx={{
                            borderRadius: "50%",
                            color: "#1976d2",
                            "&:hover": { bgcolor: "#a7d3ff" },
                          }}
                        >
                          <CustomToolTip title="Visit" placement="right">
                            <OpenInNewRounded />
                          </CustomToolTip>
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            color="primary"
          />
        </Box>
        <Button
          variant="outlined"
          color="success"
          sx={{
            color: "green",
            "&:hover": { bgcolor: "#a0f5d1" },
          }}
          onClick={openAddModal}
          startIcon={<AddRounded />}
        >
          Add a Job
        </Button>
      </Box>
      <VendorAddJobModal
        modalOpen={isAddModalOpen}
        modalClose={closeAddModal}
        fetchJobs={fetchData}
      />
      <VendorSingleJobModal
        modalOpen={isSingleModalOpen}
        modalClose={closeSingleModal}
        singleJobId={singleJobId}
        fetchJobs={fetchData}
      />
    </>
  );
};

export default VendorJobs;
