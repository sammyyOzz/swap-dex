import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { CirclesWithBar } from  'react-loader-spinner'


export default function SimpleBackdrop({ isOpen }) {
  const open = useSelector(state => state.backdrop.open)

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open || isOpen}
      // onClick={handleClose}
    >
      {/* <CircularProgress color="inherit" /> */}
      <CirclesWithBar
        height="100"
        width="100"
        color='white'
        ariaLabel='loading'
      />
    </Backdrop>
  );
}
