/* eslint-disable react/prop-types */
import * as React from "react";
import PropTypes from "prop-types";
import {
  Backdrop,
  Box,
  Button,
  Modal,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import Divider from "@mui/material-next/Divider";

import { useSpring, animated } from "@react-spring/web";

import { apiText } from "../../global/API";
import { toast } from "react-toastify";
import { useState } from "react";

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
};

const UserRateVendorModal = ({
  modalOpen,
  modalClose,
  rateModalId,
  fetchJobs,
}) => {
  console.log(rateModalId, "modal ID");

  const [value, setValue] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData(e.currentTarget);
      let formData = {
        message: data.get("message"),
        rating: value,
      };
      if (formData.message.length !== 0 && formData.rating.length !== 0) {
        const response = await apiText.post(
          `user/rate/${rateModalId}`,
          formData
        );
        console.log(formData, "rateUser");
        console.log(response, "re");
        fetchJobs();
        toast.success("Successfully Rated a Vendor!");
      } else {
        toast.error("Rating cannot be empty!");
      }
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
            <form onSubmit={handleSubmit}>
              <Divider>
                <Typography
                  gutterBottom
                  variant="h4"
                  sx={{
                    color: "#000",
                    fontFamily: "monospace",
                  }}
                >
                  Rate Vendor
                </Typography>
              </Divider>
              <TextField
                sx={{ my: 2 }}
                fullWidth
                multiline
                minRows={4}
                maxRows={4}
                label="Message to the Vendor"
                name="message"
              />
              <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <Rating
                  precision={0.5}
                  size="large"
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Box>
              <Button
                fullWidth
                variant="outlined"
                type="submit"
                onClick={modalClose}
                sx={{
                  "&:hover": {
                    bgcolor: "#c2d7fe",
                  },
                }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default UserRateVendorModal;
