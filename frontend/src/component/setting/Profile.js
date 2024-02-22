import React from "react";
import { Button, Input } from "@mui/material";

export default class Profile extends React.Component {
  render() {
    return (
      <div className="settingDefault">
        <div className="settingPicture">
          <div className="settingSub">사진</div>
          <div>
            <Button
              variant="outlined"
              size="small"
              sx={{
                minHeight: 0,
                minWidth: 0,
                marginRight: 1,
                color: "#CB91F8",
                borderColor: "#CB91F8",
                "&:hover": {
                  borderColor: "#CB91F8",
                  backgroundColor: "#CB91F826",
                },
              }}
            >
              사진 올리기
            </Button>
            <Button variant="outlined" size="small" color="error">
              사진 삭제
            </Button>
          </div>
        </div>
        <div style={{ height: "10vh" }}></div>
        <div className="settingPicture">
          <div className="settingSub">닉네임</div>
          <Input placeholder="닉네임" />
        </div>
      </div>
    );
  }
}
