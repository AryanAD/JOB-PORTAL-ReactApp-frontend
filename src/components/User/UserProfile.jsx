/* eslint-disable react/prop-types */
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const UserProfile = ({ childItem }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          bgcolor: "whitesmoke",
        }}
      >
        <Box
          sx={{
            margin: 2,
            display: "flex",
            width: "80%",
            height: "100%",
          }}
        >
          {/* left */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "20vw",
              height: "100%",
              gap: 4,
              padding: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "18vw",
                height: "100%",
                borderRadius: "11px",
                boxShadow: "11",
              }}
            >
              <Box
                sx={{
                  pt: 3,
                  pb: 2,
                  width: "100%",
                  bgcolor: "#44a4e0",
                  borderRadius: "11px 11px 0 0",
                }}
              >
                <Divider>
                  <Divider>
                    <Divider>
                      <Typography
                        variant="h5"
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          fontFamily: "monospace",
                          fontWeight: "bolder",
                          color: "white",
                        }}
                      >
                        Profile Actions
                      </Typography>
                    </Divider>
                  </Divider>
                </Divider>
              </Box>

              <List>
                <ListItem>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#000",
                      width: "100%",
                    }}
                    to="/user/profile"
                  >
                    <ListItemButton
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "18px",
                        py: 2,
                      }}
                    >
                      View Profile
                    </ListItemButton>
                  </Link>
                </ListItem>

                <ListItem>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#000",
                      width: "100%",
                    }}
                    to="/user/profile/edit-profile"
                  >
                    <ListItemButton
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "18px",
                        py: 2,
                      }}
                    >
                      Edit Profile
                    </ListItemButton>
                  </Link>
                </ListItem>

                <ListItem>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#000",
                      width: "100%",
                    }}
                    to="/user/profile/applied-jobs"
                  >
                    <ListItemButton
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "18px",
                        py: 2,
                        // "&:hover": {},
                      }}
                    >
                      Applied Jobs
                    </ListItemButton>
                  </Link>
                </ListItem>
              </List>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "18vw",
                height: "100%",
                borderRadius: "11px",
                boxShadow: "11",
              }}
            >
              <Box
                sx={{
                  pt: 3,
                  pb: 2,
                  width: "100%",
                  bgcolor: "#44a4e0",
                  borderRadius: "11px 11px 0 0",
                }}
              >
                <Divider>
                  <Divider>
                    <Divider>
                      <Typography
                        variant="h5"
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          fontFamily: "monospace",
                          fontWeight: "bolder",
                          color: "white",
                        }}
                      >
                        Quick Links
                      </Typography>
                    </Divider>
                  </Divider>
                </Divider>
              </Box>

              <List>
                <ListItem>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#000",
                      width: "100%",
                    }}
                    to="/user/jobs"
                  >
                    <ListItemButton
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "18px",
                        pb: 2,
                      }}
                    >
                      Apply For Job
                    </ListItemButton>
                  </Link>
                </ListItem>

                <ListItem>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#000",
                      width: "100%",
                    }}
                    to="/user/new-vendor"
                  >
                    <ListItemButton
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "18px",
                        py: 2,
                      }}
                    >
                      Apply For Vendor
                    </ListItemButton>
                  </Link>
                </ListItem>

                <ListItem>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#000",
                      width: "100%",
                    }}
                    to="/user/jobs"
                  >
                    <ListItemButton
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "18px",
                        py: 2,
                      }}
                    >
                      Rate A Vendor
                    </ListItemButton>
                  </Link>
                </ListItem>
              </List>
            </Box>
          </Box>

          {/* right */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "60vw",
              height: "100vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                margin: 4,
                borderRadius: "11px",
                width: "57vw",
                padding: 2,
                boxShadow: 11,
                height: "100vh",
              }}
            >
              {childItem}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default UserProfile;
