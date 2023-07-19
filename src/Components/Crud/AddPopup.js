import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";

const AddPopup = ({ open, setOpen, setData, isLoading, setIsLoading }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handlePostItem = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://usman-fake-api.herokuapp.com/api/recipes",
        { title, body }
      );
      const newItem = response.data;
      setData((prevData) => [...prevData, newItem]);

      setTitle("");
      setBody("");
      setOpen(false);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  return (
    <>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              zIndex: "99",
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <CircularProgress />
          </Box>
        )}
        <DialogTitle id="alert-dialog-title">Add Item</DialogTitle>
        <DialogContent>
          <Box sx={{ my: 2 }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Add"
              fullWidth
              multiline
              value={title}
              onChange={handleTitleChange}
            />
          </Box>
          <Box
            sx={{
              py: 2,
              display: "grid",
              gap: 2,
              alignItems: "center",
              flexWrap: "wrap",
            }}>
            <textarea
              name="Outlined"
              placeholder="Type in here…"
              variant="outlined"
              style={{ minHeight: "100px", padding: "10px" }}
              value={body}
              onChange={handleBodyChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePostItem} autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddPopup;
