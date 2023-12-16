/* eslint-disable react/prop-types */
import * as React from "react";
import PropTypes from "prop-types";
import {
  Backdrop,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useSpring, animated } from "@react-spring/web";
import { toast } from "react-toastify";
import { apiText } from "../../global/API";
import { useEffect } from "react";
import { useState } from "react";

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
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "11px",
  p: 4,
  display: "flex",
  flexDirection: "column",
};
const VendorAddJobModal = ({ modalOpen, modalClose, fetchJobs }) => {
  const [myCategory, setMyCategory] = useState([]);

  const fetchCategory = async () => {
    console.log("fetchCategory");
    try {
      const response = await apiText.get("admin/category");
      setMyCategory(response.data.categories);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData(e.currentTarget);
      let formData = {
        title: data.get("title"),
        description: data.get("description"),
        location: data.get("location"),
        salary: data.get("salary"),
        deadline: data.get("deadline"),
        postedBy: data.get("postedBy"),
        categoryId: data.get("category"),
      };

      const response = await apiText.post("vendor/jobs", formData);
      console.log(formData, "vendormodal");
      console.log(response, "re");
      fetchJobs();
      toast.success("Successfully created a job!");
    } catch (error) {
      console.error("API request failed: ", error);
    }
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
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                margin="normal"
                fullWidth
                label="Job Title"
                name="title"
              />
              <TextField
                type="text"
                minRows={3}
                maxRows={6}
                multiline
                margin="normal"
                fullWidth
                label="Job Description"
                name="description"
              />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Location"
                    type="text"
                    name="location"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Salary"
                    type="number"
                    name="salary"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Deadline"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="deadline"
                  />
                </Grid>
                {/* <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Posted By"
                    type="text"
                    name="postedBy"
                  />
                </Grid> */}
                <Grid item xs={6}>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select label="Category" name="category">
                      {myCategory?.map((data, i) => {
                        return (
                          <MenuItem key={i} value={data._id}>
                            {data.category}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Button
                color="success"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={modalClose}
              >
                <AddRoundedIcon />
                Add Job
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default VendorAddJobModal;
