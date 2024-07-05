import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Grid, Icon, IconButton } from "@mui/material";
import ArgonAvatar from "components/ArgonAvatar";
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

const Modal = ({ open, onClose, row }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  if (!row) return null;

  const convertDateFormat = (inputDateString) => {
    const date = new Date(inputDateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setImageDialogOpen(true);
  };

  const handleImageDialogClose = () => {
    setImageDialogOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
        <DialogTitle>
          <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "aliceblue !important" }}>
          <Grid container spacing={2} display="flex" flexDirection="column" justifyContent="center">
            <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'center', width: "100%" }}>
              <ArgonAvatar src={row.Image_Name}  variant="rounded" style={{ width: '90%', height: '100%', objectFit: 'cover' }} />
            </Grid>

            <Grid item xs={12} md={12}>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Person ID</TableCell>
                      <TableCell>Start Time</TableCell>
                      <TableCell>End Time</TableCell>
                      <TableCell>Camera</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    {row.detailsOfPerson.map((rowData) => (
                      <TableRow key={rowData.id}>
                        <TableCell>{rowData.Person_Id}</TableCell>
                        <TableCell>{convertDateFormat(rowData.Start_Time)}</TableCell>
                        <TableCell>{convertDateFormat(rowData.End_Time)}</TableCell>
                        <TableCell>{rowData.Cameras}</TableCell>
                        <TableCell >
                          {/* <Icon className="ni ni-image"></Icon> */}
                          <img src={rowData.Image} alt="Person Image"  onClick={() => handleImageClick(rowData.Image)} style={{maxWidth:"100px",maxHeight:"100px",cursor:"pointer"}}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      <Dialog open={imageDialogOpen} onClose={handleImageDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <IconButton aria-label="close" onClick={handleImageDialogClose} sx={{ position: 'absolute', right: 8, top: 0 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ textAlign: 'center' }}>
          {selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '80vh' }} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  row: PropTypes.shape({
    Image_Name: PropTypes.string.isRequired,
    detailsOfPerson: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      Person_Id: PropTypes.string.isRequired,
      Start_Time: PropTypes.string.isRequired,
      End_Time: PropTypes.string.isRequired,
      Cameras: PropTypes.string.isRequired,
      Image: PropTypes.string,
    })).isRequired,
  }).isRequired,
};

export default Modal;
