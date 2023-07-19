import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const ToDoList = () => {
  const [data, setData] = useState({
    title: "",
    isComplete: false,
    items: [],
    editingItemId: null,
  });
  //   console.log(data, "datadata");

  const handleChange = (e) => {
    setData((oldData) => ({
      ...oldData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (data.title !== "") {
      const newItem = {
        id: Date.now(),
        title: data.title,
      };
      setData((oldData) => ({
        ...oldData,
        items: [...oldData.items, newItem],
        title: "",
        isComplete: false,
      }));
    } else {
      setData((oldData) => ({
        ...oldData,
        title: "",
      }));
    }
  };

  const handleEdit = (itemId) => {
    const editedItem = data.items.find((item) => item.id === itemId);
    if (editedItem) {
      setData((oldData) => ({
        ...oldData,
        title: editedItem.title,
        editingItemId: itemId,
      }));
    }
  };

  const handleCheckboxChange = (itemId) => {
    setData((oldData) => ({
      ...oldData,
      items: oldData.items.map((item) =>
        item.id === itemId ? { ...item, isComplete: !item.isComplete } : item
      ),
    }));
  };

  return (
    <>
      <Box
        sx={{
          width: "30%",
          m: "auto",
          border: "1px solid gray",
        }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h2" color="initial">
            To Do List
          </Typography>
        </Box>

        <Box sx={{ my: 2 }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Outlined"
            name="title"
            value={data.title}
            variant="outlined"
            onChange={handleChange}
          />
          <Button onClick={handleClick}>
            {data.editingItemId !== null ? "Update" : "Add"}
          </Button>
        </Box>
        <Box>
          {data.items.map((item) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                textDecoration: item.isComplete ? "line-through" : "none",
              }}>
              <Box>
                <ListItem key={item.id}>{item.title}</ListItem>
              </Box>
              <Box>
                <Button onClick={() => handleEdit(item.id)}>edit</Button>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={item.isComplete}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  }
                  label="Label"
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ToDoList;
