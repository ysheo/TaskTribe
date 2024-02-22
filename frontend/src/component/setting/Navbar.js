import React from "react";
import { SidebarData } from "./SidebarData";
import { Route, Routes, Link } from "react-router-dom";

import Profile from "./Profile";
import Personal from "./Personal";
import Friend from "./Friend";
import { ProfilePost, Get } from "./fetch";

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

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    open: true,
    uploadedImage: "",
    test: "",
  };

  componentDidMount = async () => {
    let result = await Get("/api/user/test2");
    this.setState({
      uploadedImage: `data:image/png;base64,${result["profile"]}`,
    });
  };

  sideList = () => (
    <Box component="nav" style={{ marginTop: "5vh" }}>
      {SidebarData.map((item, index) => (
        <ListItem
          key={item.title}
          component={Link}
          to={item.path}
          disablePadding
          style={{ color: "#555555", paddingLeft: "20px" }}
          onClick={() => this.handleClick(item)}
        >
          <ListItemButton>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </Box>
  );

  handleClick(item) {
    this.props.titleChange(item.title);
  }

  handleUploadClick = async (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userid", "test2");

    await ProfilePost("/api/user/profile", formData);

    this.setState({ uploadedImage: imageUrl });
  };

  render() {
    return (
      <div className="settingMain">
        <div className="profile">
          <img
            className="profileImage"
            width="100%"
            src={this.state.uploadedImage}
          />
          <div className="profilebtn">
            <Button
              variant="contained"
              component="label"
              sx={{
                color: "white",
                borderRadius: "50%",
                minWidth: "40px",
                minHeight: "40px",
                padding: "0px",
                backgroundColor: "rgb(170,170,170,0.5)",
                "&:hover": {
                  backgroundColor: "rgb(125,125,125,0.5)",
                  boxShadow: "none",
                },
                "&:active": {
                  boxShadow: "none",
                  backgroundColor: "rgb(30,30,30,0.5)",
                },
              }}
            >
              <BorderColorOutlinedIcon />
              <input
                accept="image/*"
                type="file"
                hidden
                onChange={this.handleUploadClick}
              />
            </Button>
          </div>
        </div>
        <Drawer
          open={this.state.open}
          PaperProps={{
            style: {
              position: "absolute",
              width: "300px",
              marginTop: "12vh",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          {this.sideList()}
        </Drawer>

        <Routes>
          <Route path="/setting/profile" element={<Profile />} />
          <Route path="/setting/personal" element={<Personal />} />
          <Route path="/setting/friend" element={<Friend />} />
        </Routes>
      </div>
    );
  }
}
