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
    const newItem = {
      id: Date.now(),
      title: data.title,
    };
    setData((oldData) => ({
      ...oldData,
      items: [...oldData.items, newItem],
      title: "",
    }));
  };

  //   const handleEdit = () => {};

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
          <Button onClick={handleClick}>Add</Button>
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
                {/* <Button onClick={() => handleEdit(item.id)}>edit</Button> */}
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
