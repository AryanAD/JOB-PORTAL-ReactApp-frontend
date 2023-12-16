import { Box, Link } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const footerStyles = {
  left: 0,
  bottom: 0,
  width: "100vw",
  background: "whitesmoke",
};
const footerContainer = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
  margin: "0px 10px 0 10px",
};

const divider = {
  borderLeft: "6px solid #1976D2",
  borderRadius: "3px",
  height: "200px",
  position: "absolute",
  left: "65%",
  marginLeft: "-3px",
};
const left = { width: "40vw" };

const right = {
  display: "flex",
  flexFlow: "column",
  height: "25vh",
  justifyContent: "space-evenly",
  alignItems: "center",
  width: "25vw",
  paddingLeft: "20px",
};

const contactInfo = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  height: "25vh",
  width: "25vw",
};

const link = {
  textDecoration: "none",
  color: "black",
};

const Footer = () => {
  return (
    <footer style={footerStyles}>
      <Box sx={footerContainer}>
        <Box sx={divider} />
        <Box sx={left}>
          <h1
            style={{
              color: "#1976D2",
              padding: "10px",
              margin: "20px",
              fontSize: "2rem",
              fontFamily: "monospace",
            }}
          >
            <EditNoteIcon />
            React Job Portal
          </h1>
          <p
            style={{
              borderLeft: "3px solid #1976D2",
              borderRadius: "2px",
              paddingLeft: "10px",
              fontFamily: "monospace",
              fontSize: "14px",
              color: "#333",
              margin: "0 30px 20px",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            officiis, amet laudantium delectus consequatur ex quaerat optio non
            at iste veritatis pariatur iure cupiditate natus quo in maxime omnis
            repellendus?
          </p>
        </Box>
        <Box sx={right}>
          <Box sx={contactInfo}>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FacebookIcon />
              <Link sx={link} href="https://www.facebook.com" target="_blank">
                Facebook
              </Link>
            </p>
          </Box>
          <Box sx={contactInfo}>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <InstagramIcon />
              <Link sx={link} href="https://www.instagram.com" target="_blank">
                Instagram
              </Link>
            </p>
          </Box>
          <Box sx={contactInfo}>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <TwitterIcon />
              <Link sx={link} href="https://www.twitter.com">
                Twitter
              </Link>
            </p>
          </Box>
          <Box sx={contactInfo}>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <LinkedInIcon />
              <Link sx={link} href="https://www.linkedin.com" target="_blank">
                LinkedIn
              </Link>
            </p>
          </Box>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
