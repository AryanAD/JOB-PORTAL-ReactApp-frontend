import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useSpring, animated } from "@react-spring/web";
import { Avatar, TextField } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

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

const AdminCategoryModal = ({ modalOpen, modalClose, fetchMyData }) => {
  const token = localStorage.getItem("token");
  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState();
  const [file, setFile] = React.useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append("category", category);
      formData.append("image", file);

      const response = await axios.post(
        "http://localhost:3000/api/admin/category",
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
      toast.success("Successfully created a category!");
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
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Category Title"
                color="info"
                onChange={(e) => setCategory(e.target.value)}
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
                fullWidth
                type="submit"
                color="success"
                variant="outlined"
                sx={{
                  mt: 2,
                  "&:hover": { bgcolor: "#bfd7c0", color: "green" },
                }}
                onClick={modalClose}
              >
                Add
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AdminCategoryModal;
