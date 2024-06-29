import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import CustomModal from "./setting/Modal";

const Body = () => {
  const [open, setOpen] = useState(false);
  const [prevLocation, setPrevLocation] = useState("/");
  const location = useLocation();

  const handleOpen = () => {
    setPrevLocation(location.pathname); // 모달 열리기 전에 이전 위치를 설정
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button component={Link} to="/setting/personal" onClick={handleOpen}>
        Setting
      </Button>

      <CustomModal
        open={open}
        handleClose={handleClose}
        prevLocation={prevLocation}
      />
    </div>
  );
};

export default Body;
