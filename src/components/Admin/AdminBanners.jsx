import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { AddRounded } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import AdminBannerModal from "./AdminBannerModal";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import { apiText } from "../../global/API";

const ITEMS_PER_PAGE = 8;

const AdminBanners = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [myData, setMyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMyData = useCallback(async () => {
    try {
      let res = await apiText.get("/admin/banner");
      setMyData(res.data.banners);
      console.log(res.data.banners, "inside admin category");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }, []);

  useEffect(() => {
    fetchMyData();
  }, [fetchMyData]);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await apiText.delete(`/admin/banner/${id}`);
      console.log(`Deleted banner with ID ${id}.`);
      toast.success("Successfully deleted banner");
      fetchMyData();
    } catch (err) {
      console.error(`Error deletung banner with ID ${id}.`, err);
    }
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const totalItems = myData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const visibleBanners = myData.slice(startIndex, endIndex);

  return (
    <>
      <Box>
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
            Banners
          </Typography>
        </Divider>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
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
            spacing={2}
          >
            {visibleBanners.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "70vh",
                }}
              >
                <CircularProgress size={80} color="info" />
              </Box>
            ) : (
              visibleBanners.map((banner, i) => {
                return (
                  <Grid item key={i} xs={3} sm={5} md={3}>
                    <Card
                      key={banner._id}
                      sx={{
                        margin: "20px",
                        maxWidth: 345,
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                        borderRadius: "12px",
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt={banner.title}
                        height="140"
                        image={banner.image}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {banner.title}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button
                          startIcon={<DeleteRoundedIcon />}
                          color="error"
                          fullWidth
                          variant="contained"
                          size="small"
                          onClick={() => handleDelete(banner._id)}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })
            )}
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
          color="primary"
        />
      </Box>
      <Box
        sx={{
          mt: 6,
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="success"
          startIcon={<AddRounded />}
          onClick={openAddModal}
        >
          Add Banners
        </Button>
      </Box>

      <AdminBannerModal
        modalOpen={addModalOpen}
        modalClose={closeAddModal}
        fetchMyData={fetchMyData}
      />
    </>
  );
};

export default AdminBanners;
