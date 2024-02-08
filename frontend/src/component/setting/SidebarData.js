import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export const SidebarData = [
  {
    title: "프로필 관리",
    path: "/setting/profile",
    icon: <PersonOutlineIcon />,
  },
  {
    title: "개인 정보 관리",
    path: "/setting/personal",
    icon: <PersonIcon />,
  },
  {
    title: "친구 관리",
    path: "/setting/friend",
    icon: <GroupIcon />,
  },
];
