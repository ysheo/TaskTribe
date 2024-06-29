import React, { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import Setting from "./setting";
import { useNavigate } from "react-router-dom";

const CustomModal = ({ open, handleClose, prevLocation }) => {
  const navigate = useNavigate();

  const handleCloseModal = () => {
    handleClose();
    // Go back to the previous path when modal is closed
    navigate(prevLocation);
  };
  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "85%",
          bgcolor: "background.paper",
          boxShadow: 24,
        }}
      >
        <Setting handleClose={handleCloseModal} />
      </Box>
    </Modal>
  );
};

export default CustomModal;
