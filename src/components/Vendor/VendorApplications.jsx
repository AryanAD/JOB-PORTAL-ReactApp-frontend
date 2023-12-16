import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  styled,
  tooltipClasses,
  TablePagination,
} from "@mui/material";
import { CloseRounded, DoneRounded } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import { apiText } from "../../global/API";
import Chip from "@mui/material-next/Chip";
import { toast } from "react-toastify";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

const VendorApplications = () => {
  const [myData, setMyData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const fetchData = useCallback(async () => {
    try {
      let res = await apiText.get("vendor/applicants");
      setMyData(res.data.applicants);
      console.log(res.data.applicants, "inside ");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAccept = async (applicantId) => {
    console.log(applicantId, "handleAcceptApplication");
    try {
      const response = await apiText.post("vendor/applicants/action", {
        applicantId,
        status: "accepted",
      });
      console.log(response, "re");
      toast.success("Successfully Approved Application");
      fetchData();
    } catch (error) {
      console.error("API request failed: ", error);
    }
  };

  const handleReject = async (applicantId) => {
    console.log(applicantId, "handleRejectApplication");
    try {
      const response = await apiText.post("vendor/applicants/action", {
        applicantId,
        status: "rejected",
      });
      console.log(response, "re");
      toast.success("Successfully Rejected Application");
      fetchData();
    } catch (error) {
      console.error("API request failed: ", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          Applicants
        </Typography>
      </Divider>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px auto",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "50%",
          }}
        >
          <TableContainer component={Paper}>
            <Table
              size="small"
              sx={{ minWidth: 600 }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      padding: "10px",
                      fontSize: "20px",
                      fontFamily: "monospace",
                      bgcolor: "#29a2f3",
                      borderRadius: "11px 0 0 0",
                    }}
                    align="left"
                  >
                    Applicant
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      padding: "10px",
                      fontSize: "20px",
                      fontFamily: "monospace",
                      bgcolor: "#29a2f3",
                    }}
                    align="right"
                  >
                    Status
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      padding: "10px",
                      fontSize: "20px",
                      fontFamily: "monospace",
                      bgcolor: "#29a2f3",
                    }}
                    align="right"
                  >
                    Location
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      padding: "10px",
                      fontSize: "20px",
                      fontFamily: "monospace",
                      bgcolor: "#29a2f3",
                    }}
                    align="right"
                  >
                    Contact
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      padding: "10px",
                      fontSize: "20px",
                      fontFamily: "monospace",
                      bgcolor: "#29a2f3",
                    }}
                    align="right"
                  >
                    CV
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      padding: "20px auto",
                      fontSize: "20px",
                      fontFamily: "monospace",
                      bgcolor: "#29a2f3",
                      borderRadius: "0 11px 0 0",
                    }}
                    align="right"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} height={500} align="center">
                      <CircularProgress color="primary" size={60} />
                    </TableCell>
                  </TableRow>
                ) : myData === null ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "20vh",
                    }}
                  >
                    <CircularProgress
                      color="primary"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 80,
                        height: 80,
                      }}
                    />
                  </Box>
                ) : (
                  myData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((applicant, i) => {
                      return (
                        <StyledTableRow key={i}>
                          <TableCell component="th" align="left">
                            {applicant.userId.name}
                          </TableCell>
                          <TableCell align="right">
                            <Chip
                              color={
                                applicant.status === "accepted"
                                  ? "success"
                                  : applicant.status === "rejected"
                                  ? "error"
                                  : "warning"
                              }
                              disabled={false}
                              size="small"
                              variant="filled"
                              label={applicant.status}
                            />
                          </TableCell>
                          <TableCell align="right">
                            {applicant.location}
                          </TableCell>
                          <TableCell align="right">
                            {applicant.contact}
                          </TableCell>
                          <TableCell align="right">
                            <a download>{applicant.cv}</a>
                          </TableCell>
                          <TableCell
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                            align="right"
                          >
                            <CustomToolTip title="Approve" placement="left">
                              <IconButton
                                onClick={() => handleAccept(applicant._id)}
                                sx={{
                                  "&:hover": {
                                    bgcolor: "#2e7d32",
                                    color: "white",
                                  },
                                }}
                                color="success"
                              >
                                <DoneRounded />
                              </IconButton>
                            </CustomToolTip>
                            <CustomToolTip title="Reject" placement="right">
                              <IconButton
                                onClick={() => handleReject(applicant._id)}
                                sx={{
                                  "&:hover": {
                                    bgcolor: "#d74747",
                                    color: "white",
                                  },
                                }}
                                color="error"
                              >
                                <CloseRounded />
                              </IconButton>
                            </CustomToolTip>
                          </TableCell>
                        </StyledTableRow>
                      );
                    })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={10} // Customize as needed
            component="div"
            count={myData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </>
  );
};

export default VendorApplications;
