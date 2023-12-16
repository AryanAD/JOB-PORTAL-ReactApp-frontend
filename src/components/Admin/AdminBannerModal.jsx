import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useSpring, animated } from "@react-spring/web";
import { Avatar, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
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
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "11px",
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const AdminBannerModal = ({ modalOpen, modalClose, fetchMyData }) => {
  const token = localStorage.getItem("token");
  const [banner, setBanner] = useState("");
  const [image, setImage] = useState();
  const [file, setFile] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", banner);
      formData.append("image", file);

      const response = await axios.post(
        "http://localhost:3000/api/admin/banner",
        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(formData);
      console.log(response, "re");
      fetchMyData();
      setImage(null);
      toast.success("Successfully created a banner!");
    } catch (error) {
      console.error("API request failed: ", error);
    }
  };

  const imagePreview = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
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
                variant="outlined"
                type="text"
                label="Banner Title"
                color="info"
                onChange={(e) => setBanner(e.target.value)}
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
                  Upload Image:
                </label>
                <input
                  style={{ paddingTop: 1 }}
                  type="file"
                  accept="image/*"
                  onChange={imagePreview}
                />
                {!image ? null : (
                  <Avatar
                    variant="rounded"
                    sx={{ width: 80, height: 80 }}
                    src={image}
                  />
                )}
              </Box>
              <Button
                color="success"
                variant="outlined"
                sx={{
                  mt: 2,
                  "&:hover": { bgcolor: "#bfd7c0", color: "green" },
                }}
                onClick={modalClose}
                type="submit"
              >
                Add
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default AdminBannerModal;
