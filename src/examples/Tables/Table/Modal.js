import React from "react";
import { Dialog, DialogContent, DialogTitle, Grid ,IconButton} from "@mui/material";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonTypography from "components/ArgonTypography";
import CloseIcon from '@mui/icons-material/Close';

import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


const Modal = ({ open, onClose, row }) => {
  if (!row) return null;



  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth >
      <DialogTitle>    
         <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton></DialogTitle>
      <DialogContent style={{backgroundColor:"aliceblue !important"}}>
        <Grid container spacing={2} display="flex" flexDirection="column" justifyContent="center">
        <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'center',width:"100%" }}>
        <ArgonAvatar src={row.Image_Name} name={name} variant="rounded" style={{ width: '90%', height: '400px',objectFit: 'none' }} />
        </Grid>

          <Grid item xs={12} md={12}>
            <TableContainer>
            <Table>
  <TableBody>
    <TableRow>
      <TableCell>Person ID</TableCell>
      <TableCell>Start Time</TableCell>
      <TableCell>End Time</TableCell>
      <TableCell>Cameras</TableCell>
    </TableRow>
    {row.details.map((rowData) => (
      <TableRow key={rowData.id}>
        <TableCell>{rowData.Person_Id}</TableCell>
        <TableCell>{rowData.Start_Time}</TableCell>
        <TableCell>{rowData.End_Time}</TableCell>
        <TableCell>{rowData.Cameras}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

  </TableContainer>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};


Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    row: PropTypes.shape({
      name: PropTypes.arrayOf(PropTypes.string).isRequired,
      id: PropTypes.number.isRequired,
      Start_Time: PropTypes.string.isRequired,
      Person_Id: PropTypes.string.isRequired,
      End_Time: PropTypes.string.isRequired,
      Cameras: PropTypes.string.isRequired,
      Image_Name:PropTypes.string.isRequired,
      details: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        Person_Id: PropTypes.string.isRequired,
        Start_Time: PropTypes.string.isRequired,
        End_Time: PropTypes.string.isRequired,
        Cameras: PropTypes.string.isRequired,
      })).isRequired,
      // Add other props as needed
    }).isRequired,
  };
export default Modal;
