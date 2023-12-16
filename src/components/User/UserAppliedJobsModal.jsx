/* eslint-disable react/prop-types */
import * as React from "react";
import PropTypes from "prop-types";
import { Backdrop, Box, Modal, Typography } from "@mui/material";
import Divider from "@mui/material-next/Divider";

import { useSpring, animated } from "@react-spring/web";
import { apiText } from "../../global/API";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import {
  AttachMoneyRounded,
  CalendarMonthRounded,
  InventoryRounded,
  LocationOnRounded,
} from "@mui/icons-material";
import { BsFillPersonFill } from "react-icons/bs";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    // eslint-disable-next-line no-unused-vars
    ownerState,
    ...other
  } = props;
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
  width: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "11px",
  p: 4,
  display: "flex",
  flexDirection: "column",
};
const UserAppliedJobsModal = ({ modalOpen, modalClose, appliedJobId }) => {
  console.log(appliedJobId, "modal ID");
  const [appliedJob, setAppliedJob] = useState([]);
  const fetchAppliedJob = useCallback(async () => {
    if (appliedJobId !== null) {
      try {
        const res = await apiText.get(`user/appliedJobs/${appliedJobId}`);
        setAppliedJob(res.data.jobs);
        console.log(res.data.jobs, "appliedJobModal");
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }
  }, [appliedJobId]);

  useEffect(() => {
    fetchAppliedJob(appliedJobId);
  }, [fetchAppliedJob, appliedJobId]);

  return (
    <>
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
            <Typography
              sx={{
                fontFamily: "monospace",
                fontWeight: "bold",
                color: "black",
              }}
              variant="h4"
              component="h1"
            >
              {appliedJob?.jobId?.title}
            </Typography>

            <Divider sx={{ bgcolor: "#1976d2" }} />
            <Divider sx={{ bgcolor: "#1976d2" }} />
            <Divider variant="middle" sx={{ bgcolor: "#1976d2" }} />

            <Typography
              sx={{ mt: 2, display: "flex", flexGrow: 2, color: "black" }}
              variant="body2"
              component="body"
            >
              {appliedJob?.jobId?.description}
            </Typography>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                border: "1px solid whitesmoke",
                bgcolor: "whitesmoke",
                borderRadius: "12px",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                  gap: "4px",
                }}
              >
                <LocationOnRounded />
                {appliedJob?.jobId?.location}
              </Typography>

              <Divider sx={{ bgcolor: "gray", width: 2 }} />

              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                  gap: "4px",
                }}
              >
                <AttachMoneyRounded />
                {appliedJob?.jobId?.salary}
              </Typography>

              <Divider sx={{ bgcolor: "gray", width: 2 }} />

              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                  gap: "4px",
                }}
              >
                <CalendarMonthRounded />
                {appliedJob?.jobId?.deadline?.slice(0, 10)}
              </Typography>

              <Divider sx={{ bgcolor: "gray", width: 2 }} />

              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                  gap: "4px",
                }}
              >
                <InventoryRounded />
                {appliedJob?.jobId?.category?.category}
              </Typography>

              <Divider sx={{ bgcolor: "gray", width: 2 }} />

              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                  gap: "4px",
                }}
              >
                <BsFillPersonFill />
                {appliedJob?.jobId?.postedBy?.name}
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default UserAppliedJobsModal;
