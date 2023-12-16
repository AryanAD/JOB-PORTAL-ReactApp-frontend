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
import AdminCategoryModal from "./AdminCategoryModal";
import { apiText } from "../../global/API";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";

const ITEMS_PER_PAGE = 8;

const AdminCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myData, setMyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMyData = useCallback(async () => {
    try {
      let res = await apiText.get("/admin/category");
      setMyData(res.data.categories);
      console.log(res.data.categories, "inside admin category");
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
      await apiText.delete(`/admin/category/${id}`);
      console.log(`Deleted category with ID ${id}.`);
      toast.success("Successfully deleted category");
      fetchMyData();
    } catch (err) {
      console.error(`Error deletung category with ID ${id}.`, err);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const totalItems = myData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const visibleCategories = myData.slice(startIndex, endIndex);

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
          Categories
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
          {visibleCategories?.length === 0 ? (
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
            visibleCategories?.map((category, i) => {
              return (
                <Grid item key={i} xs={3} sm={5} md={3}>
                  <Card
                    key={category._id}
                    sx={{
                      margin: "20px",
                      maxWidth: 350,
                      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                      borderRadius: "12px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={category.category}
                      height="140"
                      image={category.image}
                    />
                    <CardContent>
                      <Typography
                        sx={{ fontFamily: "monospace" }}
                        variant="h5"
                        component="h2"
                      >
                        {category.category}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "90%",
                        mb: 2,
                        mx: "auto",
                      }}
                    >
                      <Button
                        startIcon={<DeleteRoundedIcon />}
                        color="error"
                        fullWidth
                        variant="contained"
                        size="small"
                        onClick={() => handleDelete(category._id)}
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
            onClick={handleOpenModal}
          >
            Add Category
          </Button>
        </Box>
      </Box>
      <AdminCategoryModal
        modalOpen={isModalOpen}
        modalClose={handleCloseModal}
        fetchMyData={fetchMyData}
      />
    </>
  );
};

export default AdminCategories;
