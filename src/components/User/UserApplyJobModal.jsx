/* eslint-disable react/prop-types */
import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useSpring, animated } from "@react-spring/web";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { apiImage } from "../../global/API";

const Fade = React.forwardRef(function Fade(props, ref) {
  const { children, in: open, onClick, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "11px",
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const UserApplyJobModal = ({ modalOpen, modalClose, jobId, updatedJobs }) => {
  const userId = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(e.currentTarget);
      let formData = {
        jobId,
        userId,
        cv: data.get("cv"),
        location: data.get("location"),
        contact: data.get("contact"),
      };

      const response = await apiImage.post("user/jobs/apply", formData);
      console.log(formData, "inside .post");
      console.log(response, "re");
      updatedJobs();
      toast.success("Successfully Applied Application");
    } catch (error) {
      console.error("API request failed: ", error);
    }
  };
  return (
    <Box>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={modalOpen}
        onClose={modalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <TextField
                type=""
                margin="normal"
                fullWidth
                label="Your Location"
                name="location"
              />
              <TextField
                type="number"
                margin="normal"
                fullWidth
                label="Your Contact Number"
                name="contact"
              />

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  mt: 2,
                  mx: "auto",
                  gap: 1,
                }}
              >
                <label
                  style={{
                    padding: 2,
                    fontFamily: "monospace",
                    color: "#555",
                    borderBottom: "2px solid #333",
                  }}
                >
                  Upload CV:
                </label>
                <input
                  style={{
                    marginTop: 2,
                    textDecoration: "none",
                    color: "gray",
                    fontFamily: "monospace",
                  }}
                  type="file"
                  accept="file/*"
                  name="cv"
                />
              </Box>

              <Button
                color="success"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                onClick={modalClose}
              >
                Apply for Job
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default UserApplyJobModal;
