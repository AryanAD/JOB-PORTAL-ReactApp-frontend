import {
  CheckRounded,
  CloseRounded,
  DeleteRounded,
  LocalPhoneRounded,
  LocationOnRounded,
  MoreHorizRounded,
  SupportAgentRounded,
  WorkRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Chip from "@mui/material-next/Chip";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiText } from "../../global/API";

const AdminHomepage = () => {
  const [myData, setMyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Function to fetch the Vendor Data
  const fetchData = async () => {
    try {
      const response = await apiText.get("admin/vendors");
      setMyData(response.data.vendors);
      setFilteredData(response.data.vendors);
      console.log(response.data);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  // Function to Acceot vendor application
  const acceptRequest = async (userId) => {
    console.log(userId);
    try {
      const response = await apiText.post("admin/changeToVendor", {
        userId,
      });
      console.log(response, "re");
      toast.success("Successfully Approved Application");
      setFilteredData((prevData) =>
        prevData.filter((data) => data.userId !== userId)
      );
      fetchData();
    } catch (error) {
      console.error("API request failed: ", error);
    }
  };

  // Function to Reject vendor application
  const rejectRequest = async (userId) => {
    console.log(userId);
    try {
      const response = await apiText.post("admin/rejectVendor", {
        userId,
      });
      console.log(response, "re");
      toast.success("Successfully Rejected Application");
      setFilteredData((prevData) =>
        prevData.filter((data) => data.userId !== userId)
      );
      fetchData();
    } catch (error) {
      console.error("API request failed: ", error);
    }
  };

  // Function to Delete rejected vendor applications
  const handleDelete = async (id) => {
    try {
      console.log(id);
      await apiText.delete(`admin/vendors/${id}`);
      console.log(`Deleted Vendor with ID ${id}.`);
      toast.success("Successfully deleted Vendor");
      fetchData();
    } catch (error) {
      console.error(`Error deleting Vendor with ID ${id}.`, error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(myData.filter((vendor) => vendor.status === "pending"));
  }, [myData]);

  const approvedVendors = myData.filter(
    (vendor) => vendor.status === "approved"
  );
  const rejectedVendors = myData.filter(
    (vendor) => vendor.status === "rejected"
  );

  return (
    <>
      <Box
        sx={{
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "84vw",
            gap: 5,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "space-between",
          }}
        >
          <>
            {/* Pending Vendors */}
            <Divider sx={{ pt: 5 }} variant="inset" textAlign="left">
              <Typography
                sx={{
                  color: "black",
                  fontFamily: "monospace",
                  letterSpacing: "6px",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                variant="h4"
              >
                Vendor Applicants
              </Typography>
            </Divider>
            <Box
              sx={{
                pl: 0,
                pb: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxHeight: "100%",
              }}
            >
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  maxWidth: "63vw",
                  margin: 5,
                }}
                container
                spacing={4}
              >
                {filteredData.length === 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "20vh",
                    }}
                  >
                    <Typography variant="h4">
                      No Pending Applicants Found
                    </Typography>
                  </Box>
                ) : (
                  myData.map((data, i) => {
                    return (
                      <Grid item key={i} xs={7} sm={3} md={6}>
                        <Card
                          sx={{
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            boxShadow:
                              "10px 20px 20px rgba(150, 150, 150, 0.2)",
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
                                //   width: "100%",
                                height: "100%",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 2,
                              }}
                            >
                              <Box
                                sx={{
                                  height: "100%",
                                  width: "100%",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "space-evenly",
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
                                  {data.name}
                                </Typography>
                                <Divider sx={{ bgcolor: "#1976d2" }} />
                                <Divider sx={{ bgcolor: "#1976d2" }} />
                                <Divider sx={{ bgcolor: "#1976d2" }} />
                                <Box
                                  sx={{
                                    py: 2,
                                    color: "gray",
                                    fontFamily: "monospace",
                                    width: "400px",
                                  }}
                                >
                                  <Typography variant="body">
                                    {data.email} | {data.contact} |{" "}
                                    {data.address}
                                  </Typography>
                                </Box>

                                <Box
                                  sx={{
                                    gap: 2,
                                    pt: 1,
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                  }}
                                >
                                  <Chip
                                    icon={<WorkRounded />}
                                    disabled={false}
                                    size="small"
                                    variant="outlined"
                                    label={data.designation}
                                  />
                                  <Chip
                                    icon={<SupportAgentRounded />}
                                    disabled={false}
                                    size="small"
                                    variant="outlined"
                                    label={data.service}
                                  />

                                  <Chip
                                    icon={<MoreHorizRounded />}
                                    color={
                                      data.status === "approved"
                                        ? "success"
                                        : data.status === "rejected"
                                        ? "error"
                                        : "warning"
                                    }
                                    disabled={false}
                                    size="small"
                                    variant="elevated"
                                    label={data.status}
                                  />
                                </Box>
                              </Box>
                              <Box
                                sx={{
                                  gap: 2,
                                  pt: 5,
                                  width: "100%",
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <Button
                                  variant="text"
                                  fullWidth
                                  sx={{
                                    color: "green",
                                    "&:hover": { bgcolor: "#a0f5d1" },
                                  }}
                                  startIcon={<CheckRounded />}
                                  onClick={() => {
                                    acceptRequest(data.userId);
                                  }}
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="text"
                                  fullWidth
                                  sx={{
                                    color: "red",
                                    "&:hover": { bgcolor: "#ffd8e4" },
                                  }}
                                  startIcon={<CloseRounded />}
                                  onClick={() => rejectRequest(data.userId)}
                                >
                                  Reject
                                </Button>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })
                )}
              </Grid>
            </Box>
          </>

          <>
            {/* Approved Vendors */}
            <Divider variant="inset" textAlign="left">
              <Typography
                sx={{
                  color: "black",
                  fontFamily: "monospace",
                  letterSpacing: "6px",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                variant="h4"
              >
                Approved Vendors
              </Typography>
            </Divider>

            <Box
              sx={{
                pl: 0,
                pb: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxHeight: "100%",
              }}
            >
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  maxWidth: "63vw",
                  margin: 5,
                }}
                container
                spacing={4}
              >
                {approvedVendors.length === 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "20vh",
                    }}
                  >
                    <Typography variant="h4">
                      No Approved Applicants Found
                    </Typography>
                  </Box>
                ) : (
                  myData
                    .filter((vendor) => vendor.status === "approved")
                    .map((vendor, i) => {
                      return (
                        <Grid item key={i} xs={7} sm={5} md={4}>
                          <Card
                            sx={{
                              height: "100%",
                              width: "100%",
                              display: "flex",
                              boxShadow: "0 5px 30px rgba(150, 150, 150, 0.3)",
                              border: "1px solid whitesmoke",
                              borderRadius: 3,
                            }}
                          >
                            <CardContent
                              sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "space-around",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  height: "100%",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  gap: 2,
                                }}
                              >
                                <Box
                                  sx={{
                                    height: "100%",
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "space-evenly",
                                  }}
                                >
                                  <Typography
                                    gutterBottom={false}
                                    variant="h4"
                                    sx={{
                                      mb: 0,
                                      pb: 0,
                                      fontWeight: "bolder",
                                      color: "#555",
                                      fontFamily: "monospace",
                                      textAlign: "center",
                                    }}
                                    component="h3"
                                  >
                                    {vendor.name}
                                  </Typography>

                                  <Box
                                    sx={{
                                      color: "gray",
                                      fontFamily: "monospace",
                                      textAlign: "center",
                                    }}
                                  >
                                    <Typography variant="body">
                                      {vendor.email}
                                    </Typography>
                                    <Divider
                                      sx={{ bgcolor: "#1976d2" }}
                                      variant="middle"
                                    />
                                    <Divider
                                      sx={{ bgcolor: "#1976d2" }}
                                      variant="middle"
                                    />
                                    <Divider
                                      sx={{ bgcolor: "#1976d2" }}
                                      variant="middle"
                                    />
                                  </Box>

                                  <Box
                                    sx={{
                                      gap: 1,
                                      pt: 2.5,
                                      width: "100%",
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      mb: 1.2,
                                    }}
                                  >
                                    <Chip
                                      icon={<WorkRounded />}
                                      disabled={false}
                                      size="small"
                                      variant="filled"
                                      label="Designation"
                                      color="info"
                                    />
                                    <Chip
                                      icon={<SupportAgentRounded />}
                                      disabled={false}
                                      size="small"
                                      variant="filled"
                                      label="Service"
                                      color="info"
                                    />
                                  </Box>
                                  <Box
                                    sx={{
                                      mt: -1,
                                      width: "100%",
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Typography>
                                      {vendor.designation}
                                    </Typography>
                                    <Typography>{vendor.service}</Typography>
                                  </Box>
                                </Box>
                                <Box
                                  sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    color: "gray",
                                    mb: "-5px",
                                  }}
                                >
                                  <Chip
                                    icon={<LocationOnRounded />}
                                    disabled={false}
                                    size="small"
                                    variant="filled"
                                    label="Address"
                                    color="tertiary"
                                  />
                                  <Chip
                                    icon={<LocalPhoneRounded />}
                                    disabled={false}
                                    size="small"
                                    variant="filled"
                                    label="Contact"
                                    color="tertiary"
                                  />
                                </Box>
                                <Box
                                  sx={{
                                    mt: -1,
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Typography>Address - 1, Address</Typography>
                                  <Typography>9873629109</Typography>
                                </Box>
                                <Box>
                                  <Chip
                                    sx={{ mt: 1 }}
                                    icon={<CheckRounded />}
                                    color="success"
                                    disabled={false}
                                    size="small"
                                    variant="elevated"
                                    label={vendor.status}
                                  />
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })
                )}
              </Grid>
            </Box>
          </>

          <>
            {/* REjected Vendors */}
            <Divider variant="inset" textAlign="left">
              <Typography
                sx={{
                  color: "black",
                  fontFamily: "monospace",
                  letterSpacing: "6px",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                variant="h4"
              >
                Rejected Vendors
              </Typography>
            </Divider>

            <Box
              sx={{
                pl: 0,
                pb: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxHeight: "100%",
              }}
            >
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  maxWidth: "63vw",
                  margin: 5,
                }}
                container
                spacing={4}
              >
                {rejectedVendors.length === 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "20vh",
                    }}
                  >
                    <Typography variant="h4">
                      No Rejected Applicants Found
                    </Typography>
                  </Box>
                ) : (
                  myData
                    .filter((vendor) => vendor.status === "rejected")
                    .map((vendor, i) => {
                      return (
                        <Grid item key={i} xs={7} sm={5} md={4}>
                          <Card
                            sx={{
                              height: "100%",
                              width: "100%",
                              display: "flex",
                              boxShadow: "0 5px 30px rgba(150, 150, 150, 0.3)",
                              border: "1px solid whitesmoke",
                              borderRadius: 3,
                            }}
                          >
                            <CardContent
                              sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "space-around",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  height: "100%",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  gap: 2,
                                }}
                              >
                                <Box
                                  sx={{
                                    height: "100%",
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "space-evenly",
                                  }}
                                >
                                  <Typography
                                    gutterBottom={false}
                                    variant="h4"
                                    sx={{
                                      mb: 0,
                                      pb: 0,
                                      fontWeight: "bolder",
                                      color: "#555",
                                      fontFamily: "monospace",
                                      textAlign: "center",
                                    }}
                                    component="h3"
                                  >
                                    {vendor.name}
                                  </Typography>

                                  <Box
                                    sx={{
                                      color: "gray",
                                      fontFamily: "monospace",
                                      textAlign: "center",
                                    }}
                                  >
                                    <Typography variant="body">
                                      {vendor.email}
                                    </Typography>
                                    <Divider
                                      sx={{ bgcolor: "#1976d2" }}
                                      variant="middle"
                                    />
                                    <Divider
                                      sx={{ bgcolor: "#1976d2" }}
                                      variant="middle"
                                    />
                                    <Divider
                                      sx={{ bgcolor: "#1976d2" }}
                                      variant="middle"
                                    />
                                  </Box>

                                  <Box
                                    sx={{
                                      gap: 1,
                                      pt: 2.5,
                                      width: "100%",
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      mb: 1.2,
                                    }}
                                  >
                                    <Chip
                                      icon={<WorkRounded />}
                                      disabled={false}
                                      size="small"
                                      variant="filled"
                                      label="Designation"
                                      color="tertiary"
                                    />
                                    <Chip
                                      icon={<SupportAgentRounded />}
                                      disabled={false}
                                      size="small"
                                      variant="filled"
                                      label="Service"
                                      color="tertiary"
                                    />
                                  </Box>
                                  <Box
                                    sx={{
                                      mt: -1,
                                      width: "100%",
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Typography>
                                      {vendor.designation}
                                    </Typography>
                                    <Typography>{vendor.service}</Typography>
                                  </Box>
                                </Box>
                                <Box
                                  sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    color: "gray",
                                    mb: "-5px",
                                  }}
                                >
                                  <Chip
                                    icon={<LocationOnRounded />}
                                    disabled={false}
                                    size="small"
                                    variant="filled"
                                    label="Address"
                                    color="info"
                                  />
                                  <Chip
                                    icon={<LocalPhoneRounded />}
                                    disabled={false}
                                    size="small"
                                    variant="filled"
                                    label="Contact"
                                    color="info"
                                  />
                                </Box>
                                <Box
                                  sx={{
                                    mt: -1,
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Typography>Address - 1, Address</Typography>
                                  <Typography>9873629109</Typography>
                                </Box>
                                <Box>
                                  <Chip
                                    sx={{
                                      mt: 1,
                                      color: "#d32f2f",
                                      bgcolor: "#f9dedc",
                                    }}
                                    icon={<CloseRounded />}
                                    disabled={false}
                                    size="small"
                                    variant="elevated"
                                    label={vendor.status}
                                  />
                                </Box>
                                <Box
                                  sx={{
                                    gap: 2,
                                    pt: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "85%",
                                  }}
                                >
                                  <Button
                                    variant="outlined"
                                    fullWidth
                                    color="error"
                                    sx={{
                                      color: "#ff0000",
                                      "&:hover": { bgcolor: "#f9dedc" },
                                    }}
                                    startIcon={<DeleteRounded />}
                                    onClick={() => handleDelete(vendor._id)}
                                  >
                                    Delete Vendor
                                  </Button>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })
                )}
              </Grid>
            </Box>
          </>
        </Box>
      </Box>
    </>
  );
};

export default AdminHomepage;
