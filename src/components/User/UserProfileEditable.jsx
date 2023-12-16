import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Chip from "@mui/material-next/Chip";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { apiImage } from "../../global/API";
import { toast } from "react-toastify";
import { IoSave } from "react-icons/io5";
import { RiArrowGoBackFill } from "react-icons/ri";

const UserProfileEditable = () => {
  const [image, setImage] = useState();
  const [fileData, setFileData] = useState();
  const [profileData, setProfileData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchProfileData = useCallback(async () => {
    try {
      let res = await apiImage.get("user/profile");
      setProfileData(res.data.user);
      console.log(res.data.user, "inside Profile");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("image", fileData);
      const res = await apiImage.patch(`user/profile`, formData);
      console.log(res);
      fetchProfileData();
      toast.success("Successfully Updated Profile!");
    } catch (error) {
      console.error(error);
    }
  };

  const imagePreview = (e) => {
    console.log(e.target.files);
    setFileData(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

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
            Edit Profile
          </Typography>
          <Link to="/user/profile">
            <Button
              sx={{
                "&:hover": {
                  bgcolor: "#1976D2",
                  color: "white",
                },
              }}
              variant="outlined"
              size="large"
              startIcon={<RiArrowGoBackFill />}
            >
              Back
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
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid sx={{ mt: 4 }} container spacing={3}>
              <Grid item sm={6}>
                <Card>
                  <Typography
                    variant="body2"
                    color={"gray"}
                    fontFamily={"monospace"}
                    sx={{
                      margin: "16px auto 0 16px",
                    }}
                  >
                    Full Name:
                  </Typography>
                  <input
                    type="text"
                    placeholder={profileData?.name}
                    style={{
                      fontFamily: "monospace",
                      fontSize: "22px",
                      letterSpacing: 2,
                      width: "100%",
                      height: "100%",
                      padding: "5px 10px 24px 16px",
                      border: "none",
                      outline: "none",
                    }}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Card>
              </Grid>

              <Grid item sm={6}>
                <Card>
                  <Typography
                    variant="body2"
                    color={"gray"}
                    fontFamily={"monospace"}
                    sx={{
                      margin: "16px auto 0 16px",
                    }}
                  >
                    Email:
                  </Typography>
                  <input
                    placeholder={profileData?.email}
                    type="email"
                    style={{
                      fontFamily: "monospace",
                      fontSize: "22px",
                      letterSpacing: 2,
                      width: "100%",
                      height: "100%",
                      padding: "5px 10px 24px 16px",
                      border: "none",
                      outline: "none",
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Card>
              </Grid>
              <Grid item sm={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexGrow: 2,
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    pt: 5,
                    pb: 2,
                  }}
                >
                  <input type="file" accept="image/*" onChange={imagePreview} />
                  {!image ? null : (
                    <Avatar
                      variant="rounded"
                      sx={{ width: 80, height: 80, mt: 4 }}
                      src={image}
                    />
                  )}
                </Box>
              </Grid>
              <Grid
                sx={{ display: "flex", justifyContent: "center" }}
                item
                sm={12}
              >
                <Button
                  type="submit"
                  color="success"
                  variant="contained"
                  startIcon={<IoSave />}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default UserProfileEditable;
