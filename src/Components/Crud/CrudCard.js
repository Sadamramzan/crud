import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  ListItem,
  Typography,
} from "@mui/material";
import AddPopup from "./AddPopup";
import EditPopup from "./EditPopup";

const CrudCard = () => {
  // get all item
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [btnLoading, setbtnLoading] = useState({});

  // open Popup state Edit & add
  const [AddOpen, setAddOpen] = useState(false);
  const [EditOpen, setEditOpen] = useState(false);
  // get Edit item iD
  const [editID, setEditID] = useState();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // this Get item API
  const handleGetData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        "https://usman-fake-api.herokuapp.com/api/recipes"
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleGetData();
  }, []);

  // this Delete item API
  const handleDeleteItem = async (id) => {
    setbtnLoading((prevLoading) => ({
      ...prevLoading,
      [id]: true,
    }));

    try {
      await axios.delete(
        `https://usman-fake-api.herokuapp.com/api/recipes/${id}`
      );
      setData((prevData) => {
        const updatedData = prevData.filter((item) => item._id !== id);
        return updatedData;
      });
      setbtnLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // this Edit item function
  const handleEditItem = (id) => {
    setIsLoading(true);
    try {
      const arryEdit = data.find((EditItem) => EditItem._id === id);
      setTitle(arryEdit.title);
      setBody(arryEdit.body);
      setEditID(id);
      setEditOpen(true);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  // this Update item API
  const handleUpdata = async () => {
    setIsLoading(true);

    try {
      await axios.put(
        `https://usman-fake-api.herokuapp.com/api/recipes/${editID}`,
        { title, body }
      );

      setData((prevData) => {
        const updatedData = [...prevData];
        const updatedIndex = data.findIndex((item) => item._id === editID);
        updatedData[updatedIndex].title = title;
        updatedData[updatedIndex].body = body;
        return updatedData;
      });

      setIsLoading(false);
      setEditOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handdleAddPopup = () => {
    setAddOpen(true);
  };

  return (
    <>
      <AddPopup
        open={AddOpen}
        setOpen={setAddOpen}
        setData={setData}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
      <EditPopup
        open={EditOpen}
        setOpen={setEditOpen}
        dataTitle={title}
        setTitle={setTitle}
        setBody={setBody}
        dataBody={body}
        handleUpdata={handleUpdata}
        isLoading={isLoading}
      />
      <Box
        sx={{ background: "blue", color: "white", p: 2, textAlign: "right" }}>
        <Button
          variant="outlined"
          sx={{ color: "#fff" }}
          onClick={handdleAddPopup}>
          Add Item
        </Button>
      </Box>
      <Box sx={{ p: 2 }}>
        {isLoading ? (
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
        ) : (
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3, height: "200px" }}>
            {data.map((item) => (
              <Grid key={item._id} item xs={12} sm={6} lg={4}>
                <ListItem
                  sx={{
                    background: "gray",
                    borderRadius: 2,
                    color: "#fff",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "start",
                    height: "100%",
                  }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.id}
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.body}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ width: "100%", justifyContent: "end" }}>
                    <Button
                      variant="outlined"
                      sx={{ color: "#fff" }}
                      onClick={() => handleEditItem(item._id)}>
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ color: "#fff" }}
                      onClick={() => handleDeleteItem(item._id)}>
                      {btnLoading[item._id] ? (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "red",
                          }}>
                          <CircularProgress size={24} color={"primary"} />
                        </Box>
                      ) : (
                        "Delete"
                      )}
                    </Button>
                  </CardActions>
                </ListItem>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default CrudCard;
