import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Get, ProfilePost } from "./fetch";
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Drawer,
  Button,
} from "@mui/material";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Personal from "./Personal";
import Friend from "./Friend";
import { SidebarData } from "./SidebarData";

const Navbar = ({ titleChange, handleClose }) => {
  const [open, setOpen] = useState(true);
  const [uploadedImage, setUploadedImage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await Get("/api/user/test2");
        setUploadedImage(`data:image/png;base64,${result["profile"]}`);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleUploadClick = async (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userid", "test2");

    try {
      await ProfilePost("/api/user/profile", formData);
      setUploadedImage(imageUrl);
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  };

  const sideList = (
    <Box component="nav" style={{ marginTop: "5vh" }}>
      {SidebarData.map((item, index) => (
        <ListItem
          key={item.title}
          component={Link}
          to={item.path}
          disablePadding
          style={{ color: "#555555", paddingLeft: "20px" }}
          onClick={() => titleChange(item.title)}
        >
          <ListItemButton>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </Box>
  );

  const buttonStyles = {
    color: "white",
    borderRadius: "50%",
    minWidth: "40px",
    minHeight: "40px",
    padding: "0px",
    backgroundColor: "rgba(170, 170, 170, 0.5)",
    "&:hover": {
      backgroundColor: "rgba(125, 125, 125, 0.5)",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "rgba(30, 30, 30, 0.5)",
    },
  };

  return (
    <div className="settingMain">
      <div className="profile">
        <img className="profileImage" width="100%" src={uploadedImage} alt="" />
        <div className="profilebtn">
          <Button variant="contained" component="label" sx={buttonStyles}>
            <BorderColorOutlinedIcon />
            <input
              accept="image/*"
              type="file"
              hidden
              onChange={handleUploadClick}
            />
          </Button>
        </div>
      </div>
      <Drawer
        open={open}
        PaperProps={{
          style: {
            position: "absolute",
            width: "300px",
            marginTop: "12vh",
            border: "none",
            padding: "0",
            height: "50%",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {sideList}
      </Drawer>

      <Routes>
        <Route
          path="/setting/personal"
          element={<Personal handleClose={handleClose} />}
        />
        <Route path="/setting/friend" element={<Friend />} />
      </Routes>
    </div>
  );
};

export default Navbar;
