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

const EditPopup = ({
  open,
  setOpen,
  dataTitle,
  dataBody,
  setTitle,
  setBody,
  handleUpdata,
  isLoading,
}) => {
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
        <DialogTitle id="alert-dialog-title">Edit Item</DialogTitle>
        <DialogContent>
          <Box sx={{ my: 2 }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Edit"
              name="title"
              value={dataTitle}
              fullWidth
              multiline
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
              name="body"
              value={dataBody}
              placeholder="Type in here…"
              variant="outlined"
              style={{ minHeight: "100px", padding: "10px" }}
              onChange={handleBodyChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdata}>Update</Button>
        </DialogActions>
        )
      </Dialog>
    </>
  );
};

export default EditPopup;
