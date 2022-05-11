import * as React from 'react';
import MuiModal from '@mui/material/Modal';
import { CloseModalBox, ModalBox, ModalContent } from './modal';
import CloseIcon from '@mui/icons-material/Close';


export default function Modal({ children, open, handleClose, fullScreenForMobile }) {

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox fullScreen={fullScreenForMobile}>
        <ModalContent fullScreen={fullScreenForMobile}>
          <CloseModalBox onClick={handleClose}>
            <CloseIcon fontSize="large" />
          </CloseModalBox>

          { children }

        </ModalContent>
      </ModalBox>
    </MuiModal>
  );
}
