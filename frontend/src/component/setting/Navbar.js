import React from "react";
import { SidebarData } from "./SidebarData";
import { Route, Routes, Link } from "react-router-dom";

import Profile from "./Profile";
import Personal from "./Personal";
import Friend from "./Friend";

import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Drawer,
} from "@mui/material";

const sideList = () => (
  <Box component="nav">
    {SidebarData.map((text, index) => (
      <ListItem
        key={text.title}
        component={Link}
        to={text.path}
        disablePadding
        style={{ color: "#555555" }}
      >
        <ListItemButton>
          <ListItemIcon>{text.icon}</ListItemIcon>
          <ListItemText primary={text.title} />
        </ListItemButton>
      </ListItem>
    ))}
  </Box>
);

export default class Navbar extends React.Component {
  state = {
    open: true,
  };
  render() {
    return (
      <div className="side">
        <Drawer
          open={this.state.open}
          PaperProps={{
            style: {
              position: "absolute",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <div className="profileImage" />
          {sideList()}
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
